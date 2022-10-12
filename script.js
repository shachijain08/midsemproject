var pokeCount = 1;
var pokedex = {};
//getPokemon(1);
getPokemon(1); 
getInfo(1);



// increment-arrow
const incrementCount = document.getElementById("Up-arrows");
function handleIncrement() {
    pokeCount++;
    deleteP()
    getPokemon(pokeCount);

    if (document.getElementById("Title").innerHTML === "Moves") {
        getMoves(pokeCount)
    } else {
        getInfo(pokeCount)
    }

};
incrementCount.addEventListener("click", handleIncrement);


//decrement-arrow NOT WORKING
const decrementCount = document.getElementById("Down-arrows");


function handleDecrement() {
    if (pokeCount != 1){
        pokeCount--;
        deleteP()
        getPokemon(pokeCount);
        console.log(pokeCount)

        if (document.getElementById("Title").innerHTML === "Moves") {
            getMoves(pokeCount)
        } else {
            getInfo(pokeCount)
        }
    }
    

};
decrementCount.addEventListener("click", handleDecrement);

//moves button
const moveButton = document.getElementById("txt2");
function handleMoves() {
    
    document.getElementById("infobox").innerHTML = "";
    getMoves(pokeCount);
    moveButton.style.backgroundColor = 'lightgreen';
    infoButton.style.backgroundColor = 'rgb(236, 236, 236)';
}
moveButton.addEventListener("click", handleMoves);


//info button 
const infoButton = document.getElementById("txt1");
function handleInfo() {
    document.getElementById("infobox").innerHTML = "";
    getInfo(pokeCount);
    infoButton.style.backgroundColor = 'lightgreen';
    moveButton.style.backgroundColor = 'rgb(236, 236, 236)';

}



infoButton.addEventListener("click", handleInfo);






async function deleteP() {
    document.getElementById("Rect").innerHTML = "";

    document.getElementById("infobox").innerHTML = "";
    document.getElementById("pokeContainer").innerHTML = "";
    document.getElementById("types").innerHTML = "";


}

async function getPokemon(num) {
    let url =  "https://pokeapi.co/api/v2/pokemon/" + num.toString(); 
    
    let res = await fetch(url);
    let pokemon = await res.json();
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    console.log(pokemonType);

    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokeHP = pokemon["stats"][0]["base_stat"];
   /**types */
    var i = 0;
    var length = pokemonType.length;
    while (i < length) {
        let newType = document.createElement("div");
        newType.style.width = '65px';
        newType.style.height = '25px';
        newType.style.borderRadius = '5px';
        newType.style.backgroundColor = 'red';
        document.getElementById("types").appendChild(newType);
        newType.innerHTML = pokemonType[i]["type"]["name"]
        newType.style.textAlign = "center";
        newType.style.fontFamily = 'Franklin Gothic Medium, Arial, sans-serif'
        if (pokemonType[i]["type"]["name"] === "normal") {
            newType.style.backgroundColor = 'A8A77A'
        } else if (pokemonType[i]["type"]["name"] === "fire") {
            newType.style.backgroundColor = 'EE8130'
        } else if (pokemonType[i]["type"]["name"] === "water") {
            newType.style.backgroundColor = '6390F0'
        } else if (pokemonType[i]["type"]["name"] === "electric") {
            newType.style.backgroundColor = 'F7D02C' 
        } else if (pokemonType[i]["type"]["name"] === "grass") {
            newType.style.backgroundColor = '7AC74C' 
        } else if (pokemonType[i]["type"]["name"] === "ice") {
            newType.style.backgroundColor = '96D9D6'
        } else if (pokemonType[i]["type"]["name"] === "fighting") {
            newType.style.backgroundColor = 'C22E28'
        }else if (pokemonType[i]["type"]["name"] === "poison") {
            newType.style.backgroundColor = 'A33EA1'
        } else if (pokemonType[i]["type"]["name"] === "ground") {
            newType.style.backgroundColor = 'E2BF6A'
        } else if (pokemonType[i]["type"]["name"] === "flying") {
            newType.style.backgroundColor = 'A98FF3'
        } else if (pokemonType[i]["type"]["name"] === "psychic") {
            newType.style.backgroundColor = 'F95587'
        } else if (pokemonType[i]["type"]["name"] === "bug") {
            newType.style.backgroundColor = 'A6B91A'
        } else if (pokemonType[i]["type"]["name"] === "rock") {
            newType.style.backgroundColor = 'B6A136'
        } else if (pokemonType[i]["type"]["name"] === "ghost") {
            newType.style.backgroundColor = '735797'
        } else if (pokemonType[i]["type"]["name"] === "dragon") {
            newType.style.backgroundColor = '6F35FC'
        } else if (pokemonType[i]["type"]["name"] === "dark") {
            newType.style.backgroundColor = '705746'
        } else if (pokemonType[i]["type"]["name"] === "steel") {
            newType.style.backgroundColor = 'B7B7CE'
        } else if (pokemonType[i]["type"]["name"] === "fairy") {
            newType.style.backgroundColor = 'D685AD'
        }
        i++;
        //pokemonType[i]["type"]["name"]
    }

    console.log(pokeHP);
    pokedex[num] = {"name": pokemonName, "type": pokemonType, "image": pokemonImg};

    /** Adding title */
    let pokeTitle = document.createElement("p");
    pokeTitle.innerText = pokedex[num]["name"]
    document.getElementById("Rect").append(pokeTitle);
    //

    console.log(pokedex[num]["height"])
   


    let pokeImage = document.createElement("img");
    pokeImage.src = pokemonImg;
    document.getElementById("pokeContainer").appendChild(pokeImage);
    
}


async function getMoves(num) {
    let url =  "https://pokeapi.co/api/v2/pokemon/" + num.toString(); 
    
    let res = await fetch(url);
    let pokemon = await res.json();
    let pokeMoves = pokemon["moves"]
    console.log(pokeMoves)
    pokedex[num] = {}
    document.getElementById("Title").innerHTML = "Moves"
    var i = 0
    var length = pokeMoves.length
    console.log(length)
    let pokeInfo = document.createElement("p");

    while (i < length) {
        newType = document.createElement("div");
        newType.innerHTML = pokeMoves[i]["move"]["name"]
        document.getElementById("infobox").append(newType);  
        i++;
        console.log(i)
        if (i > 9) {
            break;
        }
    }

}


async function getInfo(num) {
    let url =  "https://pokeapi.co/api/v2/pokemon/" + num.toString(); 
    
    let res = await fetch(url);
    let pokemon = await res.json();
    document.getElementById("Title").innerHTML = "Info"
    pokedex[num] = {}
    let pokemonHeight = pokemon["height"]
    let pokeWeight = pokemon["weight"];
    let pokeHP = pokemon["stats"][0]["base_stat"];
    let pokeAttack = pokemon["stats"][1]["base_stat"];
    let pokeDefense = pokemon["stats"][2]["base_stat"];
    let pokeSAttack = pokemon["stats"][3]["base_stat"];
    let pokeSDefense = pokemon["stats"][4]["base_stat"];

    pokedex[num] = {"weight": pokeWeight, "height": pokemonHeight, 
     "hp": pokeHP, "attack": pokeAttack,  "defense": pokeDefense, 
     "SAttack": pokeSAttack, "SDefense": pokeSDefense};

    /**Adding info */
    let pokeInfo = document.createElement("p");
    pokeInfo.innerText = "height: " + pokedex[num]["height"].toString() + "\nweight: " 
        + pokedex[num]["weight"].toString() + "\nhp: " + pokedex[num]["hp"] + "\nattack: " 
        + pokedex[num]["attack"] + "\ndefense: " + pokedex[num]["defense"] + "\nspecial attack: " 
        + pokedex[num]["SAttack"] + "\nspecial defense: " + pokedex[num]["SDefense"];
     document.getElementById("infobox").append(pokeInfo);
    

}
