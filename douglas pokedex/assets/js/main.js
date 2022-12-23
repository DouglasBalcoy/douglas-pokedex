
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151 
const limit = 10 
let offset = 0 
let pokemons = [] 
let pokemons2 = [] 
let quantPokemonsAtual = 0 
let btnVoltarClicado = false

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <button title="Clique e Saiba mais do: ${pokemon.name}" id="${pokemon.name}"><img src="${pokemon.photo}"
                     alt="${pokemon.name}"></button>
            </div>
        </li>
    `
}


function adicionarDetalhesDoPokemon(pokemon, details_pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <br>
            <ul class="types">
                    <li>Habilidades: ${details_pokemon.abilities}</li>
                    <li>Experiência: ${details_pokemon.experience}</li>
                    <li>Altura: ${details_pokemon.height}</li>
                    <li>Largura: ${details_pokemon.weigth}</li>
                </ul>
        </li>
        <br>
    `
}


function loadPokemonItens(offset, limit) {
    
    console.log("LoadPokemonsItens: offset: "+offset+" - limit: "+limit)
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        quantPokemonsAtual += limit;
        return pokemons

    }).then(pokemons => {

        pokemons.forEach(element => {
            pokemons2.push(element)
        });

        pokemons = pokemons2
        console.log(pokemons)
        return pokemons
    }).then(pokemons => {
        apresentarDetalhesDosPokemons(pokemons);
    })
}


function loadPokemon(offset, limit, pokemons) {
    pokeApi2.getPokemons2(offset+1).then((details_pokemon) => {
            
       
        loadMoreButton.style.display = 'none'
        return details_pokemon
    }).then(details_pokemon => {
        
        pokemonList.innerHTML = adicionarDetalhesDoPokemon(pokemons[offset], details_pokemon)
    }).then(() => {
        
        pokemonList.innerHTML += `<button type="button" id="btn_voltar">Voltar</button>`;
    }).then(() => {
        
        let btnVoltar = document.getElementById("btn_voltar");
        btnVoltar.addEventListener('click', () => { 
            pokemonList.innerHTML = ""
            offset = 0
            console.log("BTN VOLTAR = off: "+offset+" - lim: "+limit)
            quantPokemonsAtual=0
            pokemons = []
            pokemons2 = []
            btnVoltarClicado=true

            
            loadPokemonItens(offset,10);
            
            
            loadMoreButton.style.display = 'initial'
        })    
    })
}


function apresentarDetalhesDosPokemons(pokemons) {
    console.log("apresentarDetalhesDosPokemons: "+pokemons.length)
    for (let index = 0; index < pokemons.length; index++) {
        
        
        document.getElementById(pokemons[index].name).addEventListener('click', () => {
            
            loadPokemon(index,1, pokemons); 
        })
    }
}


loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    
    if (btnVoltarClicado === true) {
        offset = 0
        btnVoltarClicado = false
    } 
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        console.log("LoadModreButton: newLimit: "+newLimit)
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        console.log("LoadMoreButton: offset"+offset+" - limit: "+limit)
        loadPokemonItens(offset, limit)
        
    }
})