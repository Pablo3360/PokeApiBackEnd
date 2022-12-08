const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js');
const { Op } = require("sequelize");

router.get('/types', async (req, res)=>{
    //Si existen datos la db en type, que no haga la consulta a la API y que no guarde en db.
    //Proceso:
    //1 - Realizo una consulta a la bd -> type
    //2 - valido que la respuesta a la consulta tenga 20 elementos.
    //si tiene 20 elementos, respondo con esos 20 elementos
    //si no tiene 20 elementos o esta vacio, hago la peticion a la Api y guardo
    try {
        let types = await Type.findAll({
            where: {
                id: {
                    [Op.between]: [1, 20] //Incluye el 1 y el 20
                }
            }
        });

        if(types.length === 20){
            res.status(200).send(types);
        } else {
            let data = await fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then( p => p.results.map( e => {
                let obj = {};
                obj.name = e.name;
                obj.id = e.id;
                return obj;
                }
            ));

            let types = await Type.bulkCreate(data);
            res.status(200).send(types);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;