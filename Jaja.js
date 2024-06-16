const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const cookie = "1QS1EPmPfcMwQlspNL3C28ReDZdupLKh8MqR4aadbE6NlD0maSPQ43fV5Gl0KyTxMa_110FhacvgufhNGKcFNh2VQFqJq2-6FPxyroD7wXNQwGmD1LEvIaOXZRnRl0b1i_0hkJCaceK0ZvIdR0N3OjIt5GBWzFbYTSYqeuG-6L8Lg9AkjR1sRFsQ-rOOK1g1dGz9ABbkHrBxxD7jcINUsag"; // Enter _U value.
const auth = "FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACAUoqtob6S/5IASJQnUrBN/RYD28ac4hI+7EtPvqYTwYjdkNMoDOQsHy6RKzXbxVGAB5z0QvMiCPshqJMJILAAmLG/M5LLVOJSpa5OBqc1slZGo/n24j/3Lh3yHFy1YOtujhU6eMAhXQAAoCIk8ves5dFNaTq9gbRSqRJ10/wzmj2wJmwymnVxVL4Yxgb5SblvRbS4G+FTPC6gqRYfNKxqZwRAo0ukSSe374QGVDSpXYdvZWBFHUAw6Sc9mfT9YLWGX9pMrn4oPGzNjZQgWYg+xSzzyTJTwKoJkl4HT8mW+KJV77onOZQ9ooq5kRaou/tWlQVUM7JQMmptF8WxZB7StsekMkBaNRcdfn1kM94pSRm0avmYXydlMmIRL6wg13mgUeuE8EzJSqbtz1Bq8BbV/vFjuBdDT9nRU4RhT4IX/3PdMK2YVMDWdMPoO6kHdPXbT8cmcINW7zDaNV+vZ6ug4Xtj/ClD7/VINDbzjBvjt43zkIWekafSDiff8sd2PTiGcie7aPxnqrCW9PXRpYS21/6I/BTtfm8adS0sgqnkY7a+A/blCVXGG4fE4BXQu9O/LNuMo7TJ9C5D6Ve9KIp4TX38KtLrHWvvTr4KsPWa88nagDMFZRbExHy+3T7Oeo6NfvCXso6YHXYYFnySUzHo7NDT1LASmTyfwaiMLkmcVXQCVrnSF6KSMP6sUXSf5jzhhGXDFwDZnWfHl/+v3wDvLc8Mv0QCLpQX4f+05d+csCcdGy509uDGjYGpaoWgHpciQXPIWOHCkzz1llBXbFaVcAhWD47kmYghB/1ByhPpuhYftdteBNKT3OyCeSyZaZgGqqngKjnL1dHCKPKvC8E6xjrsNJo1+zOFCrpWuRQ44VlfAve3FlFWnmz9MlGCz1dbJdCteLW53NJSRVp2H9ZQMiMUaz72cOpwIrEiZRkJztetHRuDydq/COx/OTWiju01BEHcWQcx1tFKiWSn52AFTdMDh0aDepvRZzz8ZYajtZD9WEOY6gg5/O210GMZtjg7GWp4ZbrdBa3h2rwf+3zWyecNGSq1FFENhU9HtzbRVtrqh1EzBckUd9Oa4A4TpTWghyE5tpaJolmimBgE+Ka2zj0FSrF+tuxGCxy9+kR0roq3ddCCWwB/xIw/zl+vtWi75ZQiTGFHzrkxhM9/kSJCFypn9YlOUh2VZ7nbHdiH9gaeBD9edNPW4wXk9HBlpkr00C2PanU9FiFFEHtJTIbWlvA1R7B/eFPJJaBQDFtBy2HYQ/WVgUwq2YMiIRN+6OBVORL57Etth9AzglrZqQEtHSax9A05QQ3lp/J8rrhNCQFJQL4jdn2oD4r5Bg15tpvGzuKTb0Nq4lBNDJ+xPSr1dgNOWHGoHdx0pYseDQE/9iY7ddgLVPwNF0xUgE4f7hANlnnXHDM3XTZCQUAI0IP29i31dHOnxsWxa0txEglCmP"; // Enter KievRPSSecAuth value.

module.exports = {
  config: {
    name: "dalle",
    version: "1.0",
    author: "rehat--",
    role: 0,
    countDown: 0,
    longDescription: {
      en: "Generate unique and captivating images using DALL-E 3"
    },
    category: "ai",
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply("Add something baka.");
      return;
    }
    message.reply("Please wait...⏳");

    try {
      const res = await axios.post(`https://rehatdesu.xyz/api/imagine/dalle?cookie=${cookie}&auth=${auth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        message.reply("Redirect failed! Most probably bad prompt.");
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      message.reply("Redirect failed! Most probably bad prompt.");
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
}
