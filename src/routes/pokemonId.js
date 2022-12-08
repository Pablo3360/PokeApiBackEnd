const { Router } = require('express');
const router = Router();
const { pokemonDataExtraction } = require('./controllers/pokemonDataExtraction');

router.get('/pokemons/:id', async (req, res)=>{

    const { id } = req.params;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {
        if(response.status !== 200){
            throw new Error(`La PokeApi no arrojo el resultado esperado`)
        } else {
            return response.json()
        }})
    .then( p => pokemonDataExtraction(p))
    .then( data => res.status(200).send(data))
    .catch( error => res.status(400).send(error.message))
});

module.exports = router;