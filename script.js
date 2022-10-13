let id = 1;
let characters = [];
let flag = true;
let height, weight, hp, attack, defense, specAttack, specDefense, spped;
let moves = [];
const pokeName = document.getElementById("name");
const pokeImg = document.getElementById("pokeImg");
const leftButton = document.getElementsByClassName("button")[0];
const rightButton = document.getElementsByClassName("button")[1];
const list = document.getElementById("list");
const infoOutput = document.getElementById("infoOutput");
const info = document.getElementById("info");
const moveButton = document.getElementById("moves");
var c = document.getElementById("myCanvas");



function getPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then((resp) => resp.json())
      .then((resp) => {
        pokeName.textContent = resp.name;
        pokeImg.src =
          resp.sprites["other"]["official-artwork"]["front_default"];
        characters = [];
        list.innerHTML = "";
        moves = [];
        for (let i = 0; i < resp.moves.length; i++) {
          moves.push(resp.moves[i]["move"]["name"]);
        }
        for (key in resp.types) {
          characters.push(resp.types[key]["type"]["name"]);
        }
        for (let i = 0; i < characters.length; i++) {
          list.innerHTML += '<div class="type-box ' + characters[i] +'" class>' +characters[i] +"</div>";
        }
        if (flag == true) {
          info.style.backgroundColor = "lightGreen";
          moveButton.style.backgroundColor = "white";
          height = resp.height / 10;
          weight = resp.weight / 10;
          hp = resp.stats[0]["base_stat"];
          attack = resp.stats[1]["base_stat"];
          defense = resp.stats[2]["base_stat"];
          specAttack = resp.stats[3]["base_stat"];
          specDefense = resp.stats[4]["base_stat"];
          speed = resp.stats[5]["base_stat"];
          infoOutput.innerHTML =
            "<div class='info_text'> height: " + height + "m</div><div class='info_text'> weight: " + weight + "kg</div><div class='info_text'>hp: " +hp +
            "</div><div class='info_text'>attack: " + attack + "</div><div class='info_text'>defense: " + defense +"</div><div class='info_text'>special-attack: " +specAttack +
            "</div><div class='info_text'>special-defence; " + specDefense +"</div><div class='info_text'>speed: " +speed +"</div>";
        } else {
          info.style.backgroundColor = "white";
          moveButton.style.backgroundColor = "lightGreen";
          infoOutput.innerHTML = "";
          for (let j = 0; j < moves.length; j++) {
            infoOutput.innerHTML += "<div class='info_text'>" + moves[j] + "</div>";
          }
        }
      });
  }
  getPokemon();
  rightButton.addEventListener("click", () => {
    id = (id + 1) % 899;
    if (id == 0) {
      id = 1;
    }
    getPokemon();
  });
  leftButton.addEventListener("click", () => {
    id = (id - 1) % 899;
    if (id == 0) {
      id = 898;
    }
    getPokemon();
  });
  info.addEventListener("click", () => {
    if (flag == false) {
      flag = true;
      info.style.backgroundColor = "lightGreen";
      moveButton.style.backgroundColor = "white";
      infoOutput.innerHTML =
        "<div class='info_text'> height: " + height +"m</div><div class='info_text'> weight: " +weight +"kg</div><div class='info_text'>hp: " +
        hp + "</div><div class='info_text'>attack: " + attack + "</div><div class='info_text'>defense: " + defense +
        "</div><div class='info_text'>special-attack: " + specAttack + "</div><div class='info_text'>special-defence; " +
        specDefense +"</div><div class='info_text'>speed: " + speed +"</div>";
    }
  });
  moveButton.addEventListener("click", () => {
    if (flag == true) {
      info.style.backgroundColor = "white";
      moveButton.style.backgroundColor = "lightGreen";
      flag = false;
      infoOutput.innerHTML = "";
      for (let j = 0; j < moves.length; j++) {
          infoOutput.innerHTML += "<div class='info_text'>" + moves[j] + "</div>";
      }
    }
  }); 