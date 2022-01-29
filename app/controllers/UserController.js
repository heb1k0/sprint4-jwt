const User = require("../models/Users");
const Game = require("../models/Games");

const createUser = async (req, res) => {
  const { player } = req.body;
  let username = player;

  if (!player || player === "") {
    username = "ANONIM";
  } else {
    let consultName = await User.findOne({ where: { username } });
    if (consultName)
      return res.json({ error: "Ya existe un usuario con ese nombre" });
  }

  try {
    const newUser = await User.create({ username, createdAt: new Date() });

    if (newUser) {
      return res.json({
        message: "Usuario creado correctamente",
        newUser,
      });
    } else {
      return res.status(400).json({
        message: "No se pudo crear el usuario",
      });
    }
  } catch (err) {
    res.json({
      error: err.errors[0].message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { id, player } = req.body;

    const newUser = await User.update(
      { username: player },
      { where: { id: id } }
    );

    if (newUser) {
      res.json({ update: true });
    } else {
      res.json({ update: false });
    }
  } catch (err) {
    res.json({ err });
  }
};

const createGame = async (req, res) => {
  try {
    let { id } = req.params;
    let player = await User.findByPk(id, {
      include: [
        {
          model: Game,
          as: "Games",
        },
      ],
    });

    if (player) {
      let Dado1 = Math.floor(Math.random() * 6) + 1;
      let Dado2 = Math.floor(Math.random() * 6) + 1;

      let result = Dado1 + Dado2;
      let won;
      let totalGames;

      if (result === 7) {
        won = true;
      } else {
        won = false;
      }

      let newGame = await Game.create({
        Dado1: Dado1,
        Dado2: Dado2,
        result: result,
        won: won,
        userId: player.id,
      });

      let porcentaje = 0;
      var win = 0;
      var lost = 0;

      if (player.Games.length == 0) {
        totalGames = 1;
        won ? win++ : lost++;
      } else {
        player.Games.forEach((element) => {
          element.won ? win++ : lost++;
        });
        totalGames = player.Games.length + 1;
      }

      porcentaje = (win / totalGames) * 100;
      porcentaje = porcentaje.toFixed(2);

      win = 0;
      lost = 0;

      player.porcentaje = porcentaje;
      player.save();

      res.json(newGame);
    } else {
      throw new Error("El usuario no existe"); // (*)
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteGames = async (req, res) => {
  try {
    let { id } = req.params;
    let player = await User.findByPk(id);

    if (player) {
      let deleteGame = await Game.destroy({
        where: { userId: player.id },
      });

      res.json({ delete: true });
    } else {
      throw new Error("El usuario no existe"); // (*)
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    let consulta = await User.findAll({
      include: [
        {
          model: Game,
          as: "Games",
        },
      ],
    });

    if (consulta.length == 0) {
      throw new Error("No hay usuarios");
    }

    res.json(consulta);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getGames = async (req, res) => {
  try {
    let { id } = req.params;
    let Games = await Game.findAll({ where: { userId: id } });

    if (Games.length > 0) {
      res.json(Games);
    } else {
      throw new Error("No existen tiradas de este jugador"); // (*)
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getRanking = async (req, res) => {
  try {
    let PartidasGanadas = await Game.findAll({ where: { won: true } });
    let totalPartidas = await Game.findAll();

    if (totalPartidas.length == 0) throw new Error("No hay tiradas ganadas");

    total = (PartidasGanadas.length / totalPartidas.length) * 100;

    // let porcentaje = 0;
    // let tiradas = 0;
    // let consulta = await User.findAll({
    //   include: [
    //     {
    //       model: Game,
    //       as: "Games",
    //     },
    //   ],
    // });

    // if(consulta.length == 0)  throw new Error("No hay usuarios");

    // let ForPromise =  new Promise((resolve, reject) =>{

    //   consulta.forEach((element, index) => {
    //     if (element.Games.length > 0) {
    //       tiradas = tiradas + element.Games.length + 1
    //       porcentaje = porcentaje + element.porcentaje;
    //     }
    //     if(index == consulta.length -1) resolve(true);
    //   })

    // })

    // await ForPromise ;

    // if (consulta.length == 0) {
    //   throw new Error("No hay usuarios");
    // }

    res.json(total);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getLoserPlayer = async (req, res) => {
  try {
    // Ordenar User por porcentaje desc limit 1
    let consulta = await User.findAll({
      order: [["porcentaje", "ASC"]],
      limit: 1,
    });
    if (consulta.length == 0) throw new Error("No hay usuarios");
    res.json(consulta);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getWinnerPlayer = async (req, res) => {
  try {
    // Ordenar User por porcentaje desc limit 1
    let consulta = await User.findAll({
      order: [["porcentaje", "DESC"]],
      limit: 1,
    });

    if (consulta.length == 0) throw new Error("No hay usuarios");
    res.json(consulta);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  createUser,
  editUser,
  createGame,
  deleteGames,
  getPlayers,
  getGames,
  getRanking,
  getLoserPlayer,
  getWinnerPlayer,
};
