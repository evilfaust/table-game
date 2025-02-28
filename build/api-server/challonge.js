import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import the cors middleware
const app = express();

const API_KEY = 'id5kogyfYPWDBPoabxjhwR83sXTwjOFNc0sSRcfM';
const TOURNAMENT_ID = '14185026';
// const TOURNAMENT_ID = '13914446';


// Enable CORS for all routes
app.use(cors());
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.challonge.com/v1/tournaments/${TOURNAMENT_ID}/matches.json?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.get('/api/participants', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.challonge.com/v1/tournaments/${TOURNAMENT_ID}/participants.json?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on port 5000');
});