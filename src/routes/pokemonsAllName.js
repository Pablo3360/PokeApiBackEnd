const { Router } = require('express');
const router = Router();
const { pokemonDataExtraction } = require('./controllers/pokemonDataExtraction');
const { Pokemon, Type } = require('../db.js');

// Esta ruta devuelve Todos los Pokemones o uno especifico indicado por query /pokemons?name=nombre

router.get('/pokemons', async(req, res)=>{

    const { name, totalPokemons } = req.query;

    if(name) {
        // 1 - Busco en la DB, si existe -> respondo, si no existe solicito a la API.

        let pokemonRequest = await Pokemon.findOne({
            where: {
                name: name
            }, include: [
            {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
            ]
        });

        if(pokemonRequest){
            res.status(200).send(pokemonRequest)
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                if(response.status !== 200){
                    throw new Error(`La PokeApi no arrojo el resultado esperado`)
                } else {
                    return response.json()
                }})
            .then( p => pokemonDataExtraction(p))
            .then( data => res.status(200).send(data))
            .catch( error => res.status(400).send(error.message))
        };
    } else {
        try {
            let arrayPromiseDataPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${totalPokemons}`)
                .then(response => response.json())
                .then( pokemonsNameUrl => pokemonsNameUrl.results.map (
                    pokemon => new Promise (
                        resolve =>
                            fetch(`${pokemon.url}`)
                            .then(response => response.json())
                            .then(data => resolve(data))
                    ))
                )
            
            let dataPokemonsApi = await Promise.all(arrayPromiseDataPokemons)
                .then( array => array.map( p => pokemonDataExtraction(p) ));
            
            let dataPokemonsDb = await Pokemon.findAll(
                { include: [
                    {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                    ]
                }
            );

            res.status(200).send( [ ...dataPokemonsApi, ...dataPokemonsDb ]);

        } catch (error) {
            return res.status(400).send(error);
        }
    }
});

module.exports = router;