const axios = require('axios');
const fs = require('fs-extra');
const { createCanvas, loadImage, registerFont } = require('canvas');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: 'ut',
    aliases: [],
    version: '1.0',
    role: 0,
    countDown: 5,
    author: 'YourName',
    shortDescription: 'example',
    longDescription: 'example',
    category: 'command',
    guide: { en: '' }
  },

  byte2mb: function (bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  },
  onStart: async ({ api, event, args }) => {
    const timeStart = Date.now();
    const time = process.uptime();
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const z_1 = (hours < 10) ? '0' + hours : hours;
    const x_1 = (minutes < 10) ? '0' + minutes : minutes;
    const y_1 = (seconds < 10) ? '0' + seconds : seconds;
    const timeNow = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");
    const pidusage = await require('pidusage')(process.pid);

    if (!fs.existsSync(__dirname + `/nayan/UTM-Avo.ttf`)) {
      let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/UTM%20Avo.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/nayan/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
    }

    if (!fs.existsSync(__dirname + `/nayan/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/nayan/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    }

    if (!fs.existsSync(__dirname + `/nayan/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/nayan/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    }

    let k = args[0];

    if (args[0] === "list") {
      const alime = (await axios.get('https://raw.githubusercontent.com/mraikero-01/saikidesu_data/main/anilist2.json')).data;
      const count = alime.listAnime.length;
      const data = alime.listAnime;
      let page = parseInt(args[1]) || 1;
      page = page < 1 ? 1 : page;
      const limit = 20;
      const numPage = Math.ceil(count / limit);
      let msg = ``;
      for (let i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= count) break;
        msg += `[ ${i + 1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `Trang ( ${page}/${numPage} )\nDùng ${global.config.PREFIX}${this.config.name} list < số trang >`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }

    if (!k) {
      k = Math.floor(Math.random() * 883) + 1;
    }

    const loz = ["https://i.imgur.com/9jbBPIM.jpg", "https://i.imgur.com/cPvDTd9.jpg", "https://i.imgur.com/ZT8CgR1.jpg", "https://i.imgur.com/WhOaTx7.jpg", "https://i.imgur.com/BIcgJOA.jpg", "https://i.imgur.com/EcJt1yq.jpg", "https://i.imgur.com/0dtnQ2m.jpg"];
    const lengthchar = (await axios.get('https://raw.githubusercontent.com/mraikero-01/saikidesu_data/main/imgs_data2.json')).data;
    console.log(lengthchar.length);

    const pathImg = __dirname + `/nayan/avatar_1111231.png`;
    const pathAva = __dirname + `/nayan/avatar_3dsc11.png`;
    const background = (await axios.get(encodeURI(loz[Math.floor(Math.random() * loz.length)]), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    const ava = (await axios.get(encodeURI(`${lengthchar[k - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));

    const l1 = await loadImage(pathAva);
    const a = await loadImage(pathImg);
    const canvas = createCanvas(a.width, a.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[k - 1].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(l1, 800, -160, 1100, 1100);

    registerFont(__dirname + `/nayan/phenomicon.ttf`, {
      family: "phenomicon"
    });
    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[k - 1].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "130px phenomicon";
    ctx.fillStyle = lengthchar[k - 1].colorBg;
    ctx.fillText("UPTIME ROBOT", 95, 340);
    ctx.beginPath();

    registerFont(__dirname + `/nayan/UTM-Avo.ttf`, {
      family: "UTM"
    });
    ctx.textAlign = "start";
    ctx.font = "70px UTM";
    ctx.fillStyle = "#fdfdfd";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1} `, 180, 440);
    ctx.restore();
    ctx.save();

    registerFont(__dirname + `/nayan/CaviarDreams.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "45px time";
    ctx.fillText("@" + "www.xnxx.com169", 250, 515)
    ctx.fillText("@" + "MOHAMMAD-NAYAN", 250, 575)
    ctx.restore();
    ctx.save();
    ctx.beginPath();

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);

    api.sendMessage({
      body: `┃======{ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 }======┃\n\n→ Bot worked  ${hours} hours ${minutes} minutes ${seconds} seconds \n•━━━━━━━━━━━━━━━━━━━━━━━━•\n➠ 𝗠𝗢𝗛𝗔𝗠𝗠𝗔𝗗 𝗡𝗔𝗬𝗔𝗡\n➠ Bo𝐭 Name: ${global.config.BOTNAME}\n➠ Bot Prefix: ${global.config.PREFIX}\n➠ Commands count: ${commands.size}\n➠ Total Users: ${global.data.allUserID.length}\n➠ Total thread: ${global.data.allThreadID.length}\n➠ CPU in use:: ${pidusage.cpu.toFixed(1)}%\n➠ RAM: ${this.byte2mb(pidusage.memory)}\n➠ Ping: ${Date.now() - timeStart}ms\n➠ Character ID: ${k}\n•━━━━━━━━━━━━━━━━━━━━━━━━•\n[ ${timeNow} ]`,
      attachment: fs.createReadStream(pathImg)
    }, event.threadID, () => {
      fs.unlinkSync(pathImg);
      fs.unlinkSync(pathAva);
    });
  }
};
