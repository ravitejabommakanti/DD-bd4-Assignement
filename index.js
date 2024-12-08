const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  console.log('Database connected!');
})();

// Exercise 1: Get All Games
// http://localhost:3000/games

async function getAllGames() {
  const query = 'SELECT * FROM GAMES';
  const games = await db.all(query, []);
  return games;
}

app.get('/games', async (req, res) => {
  try {
    const games = await getAllGames();
    if (games.length === 0) {
      return res.status(404).json({ message: 'No Games found!' });
    } else {
      return res.status(200).json({ games });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching Games!' });
  }
});

async function getGameById(gameId) {
  const query = 'SELECT * FROM GAMES WHERE id=?';
  const game = await db.get(query, [gameId]);
  return game;
}

// Exercise 2: Get Game by ID
// http://localhost:3000/games/details/1

app.get('/games/details/:id', async (req, res) => {
  let gameId = parseFloat(req.params.id);
  try {
    const game = await getGameById(gameId);
    if (game.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Games found with id' + gameId + '!' });
    } else {
      return res.status(200).json({ game });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching Geme by Id!' });
  }
});

// Exercise 3: Get Games by Genre
// http://localhost:3000/games/genre/FPS
async function getGamesByGenre(genre) {
  const query = 'SELECT * FROM GAMES where genre = ?';
  const games = await db.all(query, [genre]);
  return games;
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    const games = await getGamesByGenre(genre);
    if (games.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Games found with genere' + genre + '!' });
    } else {
      return res.status(200).json({ games });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching Geme by games!' });
  }
});

// Exercise 4: Get Games by Platform
// http://localhost:3000/games/platform/PC

async function getGamesByPlatform(platform) {
  const query = 'SELECT * FROM GAMES where platform = ?';
  const games = await db.all(query, [platform]);
  return games;
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    const games = await getGamesByPlatform(platform);
    if (games.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Games found with genere' + platform + '!' });
    } else {
      return res.status(200).json({ games });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching Games by platform!' });
  }
});

// Exercise 5: Get Games Sorted by Rating
// http://localhost:3000/games/sort-by-rating

async function getAllGamesBySorting() {
  const query = 'SELECT * FROM GAMES ORDER BY rating DESC';
  const game = await db.all(query, []);
  return game;
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    const games = await getAllGamesBySorting();
    if (games.length === 0) {
      return res.status(404).json({ message: 'No Games found!' });
    } else {
      return res.status(200).json({ games });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching Games!' });
  }
});

// Exercise 6: Get All Players
// http://localhost:3000/players

async function getAllPlayers() {
  const query = 'SELECT * FROM PLAYERS';
  const players = await db.all(query, []);
  return players;
}

app.get('/players', async (req, res) => {
  try {
    const players = await getAllPlayers();
    if (players.length === 0) {
      return res.status(404).json({ message: 'No players found!' });
    } else {
      return res.status(200).json({ players });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching players!' });
  }
});

// Exercise 7: Get Player by ID
// http://localhost:3000/players/details/1

async function getPlayerById(id) {
  const query = 'SELECT * FROM PLAYERS WHERE id=?';
  const player = await db.get(query, [id]);
  return player;
}

app.get('/players/details/:id', async (req, res) => {
  let playerId = parseFloat(req.params.id);
  try {
    const player = await getPlayerById(playerId);
    if (player.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Player found with id' + playerId + '!' });
    } else {
      return res.status(200).json({ player });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching Player by Id!' + playerId });
  }
});

// Exercise 8: Get Players by Platform
// http://localhost:3000/players/platform/PC

async function getPlayerByPlatform(platform) {
  const query = 'SELECT * FROM PLAYERS where platform = ?';
  const players = await db.all(query, [platform]);
  return players;
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    const players = await getPlayerByPlatform(platform);
    if (players.length === 0) {
      return res
        .status(404)
        .json({ message: 'No players found with genere' + platform + '!' });
    } else {
      return res.status(200).json({ players });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching players by platform!' });
  }
});

// Exercise 9: Get Players Sorted by Rating
// http://localhost:3000/players/sort-by-rating

async function getAllPlayesBySorting() {
  const query = 'SELECT * FROM PLAYERS ORDER BY rating DESC';
  const players = await db.all(query, []);
  return players;
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    const players = await getAllPlayesBySorting();
    if (players.length === 0) {
      return res.status(404).json({ message: 'No players found!' });
    } else {
      return res.status(200).json({ players });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching players!' });
  }
});

// Exercise 10: Get All Tournaments
// http://localhost:3000/tournaments
async function getAllTournaments() {
  const query = 'SELECT * FROM TOURNAMENTS';
  const tournaments = await db.all(query, []);
  return tournaments;
}

app.get('/tournaments', async (req, res) => {
  try {
    const tournaments = await getAllTournaments();
    if (tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments found!' });
    } else {
      return res.status(200).json({ tournaments });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tournaments!' });
  }
});

// Exercise 11: Get Tournament by ID
// http://localhost:3000/tournaments/details/1

async function getTournamentById(id) {
  const query = 'SELECT * FROM TOURNAMENTS WHERE id=?';
  const tournament = await db.get(query, [id]);
  return tournament;
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = parseFloat(req.params.id);
  try {
    const tournament = await getTournamentById(id);
    if (tournament.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournament found with id' + id + '!' });
    } else {
      return res.status(200).json({ tournament });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching tournament by Id!' + id });
  }
});

// Exercise 12: Get Tournaments by Game ID
// http://localhost:3000/tournaments/game/1

async function getTournamentByGameId(id) {
  const query = 'SELECT * FROM TOURNAMENTS WHERE gameId=?';
  const tournament = await db.get(query, [id]);
  return tournament;
}

app.get('/tournaments/game/:id', async (req, res) => {
  let id = parseFloat(req.params.id);
  try {
    const tournament = await getTournamentByGameId(id);
    if (tournament.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournament found with id' + id + '!' });
    } else {
      return res.status(200).json({ tournament });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching tournament by Id!' + id });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
// http://localhost:3000/tournaments/sort-by-prize-pool

async function getAllTournamentsBySort() {
  const query = 'SELECT * FROM TOURNAMENTS ORDER BY prizePool DESC';
  const tournaments = await db.all(query, []);
  return tournaments;
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    const tournaments = await getAllTournamentsBySort();
    if (tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments found!' });
    } else {
      return res.status(200).json({ tournaments });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tournaments!' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
