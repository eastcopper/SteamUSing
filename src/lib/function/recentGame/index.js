const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed");

module.exports = {
  recentGame: function (msg) {
    steam
      .resolve("https://steamcommunity.com/id/" + `${msg.content.slice(7)}`)
      .then((id) => {
        steam
          .getUserRecentGames(`${id}`)
          .then((item) => {
            const recentEmbed = embed.resentEmbed(item);
            msg.channel.send({ embeds: [recentEmbed] });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        msg.reply("맞는 유저정보가 없습니다..");
      });
  },
};
