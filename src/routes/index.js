const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsAllName = require('./pokemonsAllName.js');
const pokemonId = require('./pokemonId.js');
const pokemonCreate = require('./pokemonCreate.js');
const types = require('./types.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(pokemonsAllName);
router.use(pokemonCreate);
router.use(pokemonId);
router.use(types);


module.exports = router;
