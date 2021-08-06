const schema = require("../models/Schema");
module.exports = {
  name: "add",
  aliases: ["أضافة"],
  description: "أضافة شخص الى القائمة السوداء.",
  category: null,
  callback: async ({ message, client, args }) => {
    let targeted;
    let data;
    let reason;
    try {
      targeted =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      reason = args.slice(1).join(" ");
      data = await schema.findOne({
        User: targeted.id,
      });
      if (!data) {
        let nData = await schema.create({
          User: targeted.id,
          Date: new Date(),
          Reason: reason,
        });
        nData.save;
      } else {
        await schema.findOneAndUpdate({
          User: targeted.id,
          Date: new Date(),
          Reason: reason,
        });
      }
      message.channel
        .send("تم إضافة الشخص الى قائمة النصابين .")
        .then((msg) => {
          msg.delete({ timeout: 4000 });
        });
    } catch {}
  },
};
