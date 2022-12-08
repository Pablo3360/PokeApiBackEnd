const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../db.js');

router.post('/pokemons/create', async (req, res)=>{
  const data = req.body;

  let typeId = parseInt(data.typeId);

  try {
    const pokemon = await Pokemon.create( data );
    await pokemon.addTypes([typeId]);
    return res.status(200).send(pokemon);
  } catch (error) {
    return res.status(404).send('Error en alguno de los datos provistos');
  }
});

module.exports = router;
