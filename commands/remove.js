const schema = require("../models/Schema");
module.exports = {
  name: "remove",
  aliases: ["مسح"],
  description: "مسح شخص من القائمة السوداء.",
  category: null,
  callback: async ({ message, client, args }) => {
    let targeted;
    let data;
    try {
      targeted =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      data = await schema.findOne({
        User: targeted.id,
      });
      if (data) {
        await schema.findOneAndDelete({ User: targeted.id });
      }
      message.channel.send("تم مسح الشخص من قائمة النصابين.").then((msg) => {
        msg.delete({ timeout: 4000 });
      });
    } catch {}
  },
};
