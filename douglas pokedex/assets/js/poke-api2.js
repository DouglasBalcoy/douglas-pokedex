

const pokeApi2 = {}


function convertPokeApiDetailToPokemon2(pokeDetail2) {
    const pokemon2 = new Pokemon2()
    let valor;

    for (let index = 0; index < pokeDetail2.abilities.length; index++) {
        valor = JSON.stringify(pokeDetail2.abilities[index].ability.name)
        pokemon2.abilities.push(valor)
    }
    
    pokemon2.experience = JSON.stringify(pokeDetail2.base_experience)
    pokemon2.height = JSON.stringify(pokeDetail2.height)
    pokemon2.weigth = JSON.stringify(pokeDetail2.weight)

    for (let index = 0; index < pokeDetail2.types.length; index++) {
        valor = pokeDetail2.types[index].type.name    
        pokemon2.types.push(JSON.stringify(valor))
    }
    
    return pokemon2
}


pokeApi2.getPokemons2 = (offset) => {
    const url2 = `https://pokeapi.co/api/v2/pokemon/${offset}`

    return fetch(url2)
        .then((response2) => response2.json())
        .then((jsonBody2) => jsonBody2)
        .then((pokemon) => convertPokeApiDetailToPokemon2(pokemon))
}