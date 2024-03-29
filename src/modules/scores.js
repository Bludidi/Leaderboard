const form = document.querySelector('form');
const refreshBtn = document.getElementById('refresh');
const scoreTable = document.getElementById('table');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/01GGA5WW9AJVD4Z51B3X28GNJR/scores';

const getScores = async () => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};

const refreshScores = () => {
  scoreTable.innerHTML = '';
  const players = [];
  getScores().then((entry) => {
    Object.entries(entry.result).forEach(([, value]) => {
      players.push(JSON.stringify(value));
      const player = document.createElement('ul');
      player.innerHTML = `
      <li>${value.user}</li>
      <li>:&nbsp; </li>
      <li>${value.score}</li>`;
      scoreTable.appendChild(player);
    });
  });
};

const add = async (newScore) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  refreshScores();
  return data;
};

const createObj = () => {
  const newScore = {
    user: document.getElementById('userName').value,
    score: document.getElementById('userScore').value,
  };
  document.getElementById('userName').value = '';
  document.getElementById('userScore').value = '';
  add(newScore);
};

refreshScores();

refreshBtn.addEventListener('click', () => {
  refreshScores();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createObj();
});