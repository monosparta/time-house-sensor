require("dotenv").config();
const db = require("../models/index");
const https = require("https");

let membersStr = "";

/**
 * get the location url in header to jump to get the data of members
 */
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

/**
 *
 * @param { * } location the location from previous function
 * Get all members data
 * 1. combine the response data
 * 2. exclude <HTML> tag
 * 3. check users.uuid is uuid format instead of other values
 * 4. if uuid is other values, then request again
 * 5. if uuid is correct format then call the refreshDBMembers function
 */
const getMembers = (location) => {
  const memberReq = https.request(location, (memberRes) => {
    memberRes.on("data", (data) => {
      membersStr += data;
    });
    memberRes.on("end", async () => {
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

/**
 *
 * @param { * } members the data of members from the previous function
 * According to his/her uuid, get each member, and create or update the member's data
 */
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

  // const allDBMembers = await db["Members"].findAll({ where: { level: 1 } });
  // for (let dbMember of allDBMembers) {
  //   if (
  //     new Date().getTime() - dbMember.dataValues.updatedAt.getTime() >
  //     1000 * 60
  //   ) {
  //     await dbMember.destroy();
  //   }
  // }
};

// getLocation();

const requestHandler = (req, res) => {
  getLocation();
  return res.status(200).json({ detail: "成功更新會員資料" });
};

module.exports = requestHandler;
