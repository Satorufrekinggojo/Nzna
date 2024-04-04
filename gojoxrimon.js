const express = require('express');
const app = express();
const port = 3000;


const animeData = {
  shonen: [
    { anime: "onepiece", videoLink: "http://tinyurl.com/28hsjzz4" },
// add more like this


  ],
  isekai: [
    { anime: "Re:Zero - Starting Life in Another World", videoLink: "http://tinyurl.com/2ahvq8os" },
//add more like this


  ],
  seinen: [
    { anime: "Master Keaton", videoLink: "http://tinyurl.com/25mcjqry" },
//add more like this abdul bhai


  ]
};


const sentRecommendations = {
  shonen: [],
  isekai: [],
  seinen: []
};


app.get('/anime', (req, res) => {
  const { genre } = req.query;

  if (!genre || !animeData[genre]) {
    return res.status(400).json({ error: 'Invalid or missing genre' });
  }


  const unsentRecommendations = animeData[genre].filter(
    anime => !sentRecommendations[genre].includes(anime)
  );

  if (unsentRecommendations.length === 0) {

    sentRecommendations[genre] = [];
  }


  const recommendation = unsentRecommendations[Math.floor(Math.random() * unsentRecommendations.length)];


  sentRecommendations[genre].push(recommendation);

  res.json(recommendation);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
