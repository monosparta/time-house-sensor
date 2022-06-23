require("dotenv").config();
const db = require("../models/index");
const https = require("https");

var membersStr = "";

const req = https.request(
  `https://script.google.com/macros/s/AKfycby-ihROmlQHLMymSvIaoYwBJ27cHty5DZccYKMYAG7TJA8ersq-5w0o3yVD90HtIJF0ew/exec?_token=${process.env.MSC_API_TOKEN}`,
  (res) => {
    const dataLocation = res.headers.location;

    const memberReq = https.request(dataLocation, (memberRes) => {
      memberRes.on("data", (data) => {
        // process.stdout.write(data)
        membersStr += data;
      });
      memberRes.on("end", () => {
        // console.log(members)
        refreshDBMembers();
      });
    });

    memberReq.end();
  }
);

req.on("error", (error) => {
  console.error(error);
});

req.end();

const refreshDBMembers = async () => {
  // console.log(membersStr);
  const members = JSON.parse(membersStr).users;

  for (let member of members) {
    const dbMember = await db["Members"].findOne({
      where: { id: member.uuid },
    });

    if (dbMember) {
      await dbMember.set({
        name: member.name,
        phone: member.phone,
        mail: member.mail,
        cardId: member.cardId,
      });
      await dbMember.save();
      continue;
    }
    await db["Members"].create({
      id: member.uuid,
      name: member.name,
      phone: member.phone,
      mail: member.email,
      cardId: member.cardId,
      level: 1,
    });
  }

  const allDBMembers = await db["Members"].findAll({ where: { level: 1 } });
  for (let dbMember of allDBMembers) {
    if (
      new Date().getTime() - dbMember.dataValues.updatedAt.getTime() >
      1000 * 60
    ) {
      await dbMember.destroy();
    }
  }

  process.exit();
};
