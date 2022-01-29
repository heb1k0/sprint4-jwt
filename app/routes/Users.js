const controllers = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.post("/player", controllers.createUser);
router.put("/player", controllers.editUser);
router.post("/player/:id/games", controllers.createGame);
router.delete("/player/:id/games", controllers.deleteGames);
router.get("/players", controllers.getPlayers);
router.get("/players/:id/games", controllers.getGames);
router.get("/players/ranking", controllers.getRanking);
router.get("/players/ranking/loser", controllers.getLoserPlayer);
router.get("/players/ranking/winner", controllers.getWinnerPlayer);

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
// GET /players/{id}/games: retorna el llistat de jugades per un jugador.
// GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
// GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
// GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit

module.exports = router;
