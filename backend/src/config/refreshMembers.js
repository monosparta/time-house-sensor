require("dotenv").config();
const db = require("../models/index");
const https = require("https");

var membersStr = "";

const getLocation = () => {
  const req = https.request(
    `https://script.google.com/macros/s/AKfycby-ihROmlQHLMymSvIaoYwBJ27cHty5DZccYKMYAG7TJA8ersq-5w0o3yVD90HtIJF0ew/exec?_token=${process.env.MSC_API_TOKEN}`,
    (res) => {
      const location = res.headers.location;
      getMembers(location);
    }
  );
  req.on("error", (error) => {
    console.error(error);
  });
  req.end();
};

const getMembers = (location) => {
  const memberReq = https.request(location, (memberRes) => {
    memberRes.on("data", (data) => {
      membersStr += data;
    });
    memberRes.on("end", async () => {
      // console.log(membersStr);
      const htmlIndex = membersStr.indexOf("<HTML>");
      const substr = membersStr.substring(
        0,
        htmlIndex === -1 ? membersStr.length : htmlIndex
      );
      // console.log(substr)
      const members = JSON.parse(substr).users;
      // console.log(members)
      if (members[0].uuid.indexOf("#") !== -1) {
        membersStr = "";
        getMembers(location);
        return;
      }
      refreshDBMembers(members);
    });
  });
  memberReq.end();
};

const refreshDBMembers = async (members) => {
  for (let member of members) {
    const dbMember = await db["Members"].findOne({
      where: { id: member.uuid },
    });

    if (dbMember) {
      try {
        await db["Members"].update(
          {
            name: member.name,
            phone: member.phone,
            mail: member.mail,
            cardId: member.cardId,
          },
          { where: { id: member.uuid } }
        );
      } catch (err) {}
      continue;
    }
    try {
      await db["Members"].create({
        id: member.uuid,
        name: member.name,
        phone: member.phone,
        mail: member.email,
        cardId: member.cardId,
        level: 1,
      });
    } catch (err) {}
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
};

getLocation();
