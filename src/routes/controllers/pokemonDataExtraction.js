
function pokemonDataExtraction(p){
    let obj = {};
    obj.id = p.id;
    obj.name = p.name;
    obj.health = p.stats[0].base_stat;
    obj.attack = p.stats[1].base_stat;
    obj.defense = p.stats[2].base_stat;
    obj.speed = p.stats[5].base_stat;
    obj.height = p.height;
    obj.weight = p.weight;
    obj.img = p.sprites.other.dream_world.front_default; //svg
    obj.types = p.types.map( t => { return {'name': t.type.name }; });
    return obj;
};

module.exports = { pokemonDataExtraction };