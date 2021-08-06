const { MessageEmbed } = require("discord.js");
const schema = require("../models/Schema");
module.exports = {
  name: "check",
  aliases: ["فحص"],
  description: "فحص اذا الشخص موجود فالقائمة السوداء",
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
        let embed = new MessageEmbed()
          .setColor("RED")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle("User Check")
          .setDescription("الشخص موجود في قائمة النصابين ، أحذر منه.")
          .addField("السبب : ", data.Reason)
          .addField("تمت أضافته في : ", data.Date);
        message.channel.send(embed);
      }
      if (!data) {
        let embed2 = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle("User Check")
          .setDescription(
            "الشخص غير موجود بقائمة النصابين ، \n `هذا لا يعني أنه مظمون ,`"
          );
        message.channel.send(embed);
      }
    } catch {
      /**/
    }
  },
};
