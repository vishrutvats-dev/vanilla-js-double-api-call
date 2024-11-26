const parentURL = "https://pokeapi.co/api/v2/pokemon/"
const selectPokemon = document.getElementById("pokemon")
const pokemonAbilities = document.getElementById("pokemon-ability")
let response = []
let nameResponse = {}


async function getPokemonData() {
    try {
        const responseData = await fetch(parentURL)
        response = await responseData.json();
        setPokemonData(response?.results)
    } catch (error) {
        console.log('Error Happened at parent side')
    }
}

function setPokemonData(pokemonData) {
    for(const element of pokemonData) {
        nameResponse[element.name] = element.url
        const ele = document.createElement('option')
        ele.innerHTML = element.name
        ele.id = element.name
        selectPokemon.appendChild(ele)
    }

}

async function getPokemonDetails(url = "") {
    try {
        const pokemonDetailsObject  = await fetch(url)
        const pokemonDetails = await pokemonDetailsObject.json()
        localStorage.setItem(url,JSON.stringify(pokemonDetails?.abilities))
        setPokemonDetails(pokemonDetails?.abilities)
    } catch (error) {
       console.log("Error at Seconde Call") 
    }
}
function setPokemonDetails(abilities) {
    for(const element of abilities) {
        const ele = document.createElement('div')
        ele.innerHTML = element.ability?.name
        pokemonAbilities.appendChild(ele) 
    }
}

selectPokemon.addEventListener("change", function(event) {
    pokemonAbilities.innerHTML = ""
    if(localStorage.getItem(nameResponse[event.target.value])) {
        setPokemonDetails(JSON.parse(localStorage.getItem(nameResponse[event.target.value])))
    } else {
        getPokemonDetails(nameResponse[event.target.value])
    }
})
getPokemonData()
