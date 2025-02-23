import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

const TOKEN = '30f306b730f306b730f306b77133d9a24b330f330f306b7574a494babdcc21eca852617';

app.get('/fetch-news', async (req, res) => {
  const { groupId, count } = req.query;
  const url = `https://api.vk.com/method/wall.get?owner_id=-${groupId}&count=${count}&access_token=${TOKEN}&v=5.131`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

app.listen(3050, () => console.log('Proxy server running on port 3050'));
