const gradients = {
  'electric' : "linear-gradient(43deg, #ba8a08 0%, #d1a30b 46%, #dcc266 100%)",
  'bug' : "linear-gradient(43deg, #527039 0%, #83a36f 46%, #aac784 100%)",
  'dark' : "linear-gradient(43deg, #6f7e8d 0%, #4c6683 46%, #3a526b 100%",
  'dragon' : "linear-gradient(43deg, #626e9c 0%, #4c6283 46%, #3c5087 100%)",
  'fairy' : "linear-gradient(43deg, #c089bc 0%, #ab74a7 46%, #925d8f 100%)",
  'fighting' : "linear-gradient(43deg, #9c5454 0%, #ba2f2f 46%, #912b2b 100%)",
  'fire' : "linear-gradient(43deg, #c1642f 0%, #d9833d 46%, #d6c251 100%)",
  'flying' : "linear-gradient(43deg, #2f87c1 0%, #478ab6 46%, #95d0f8 100%)",
  'ghost' : "linear-gradient(43deg, #2f69c1 0%, #37698b 46%, #41769a 100%)",
  'grass' : "linear-gradient(43deg, #487624 0%, #378b44 46%, #4a9a41 100%)",
  'ground' : "linear-gradient(43deg, #655242 0%, #936045 46%, #6d4d3f 100%)",
  'ice' : "linear-gradient(43deg, #49716c 0%, #458e93 46%, #68a1a2 100%)",
  'normal' : "linear-gradient(43deg, #595b5d 0%, #5b6976 46%, #9b9d9f 100%)",
  'poison' : "linear-gradient(43deg, #6c4971 0%, #794593 46%, #7e68a2 100%)",
  'psychic' : "linear-gradient(43deg, #923859 0%, #ad4e71 46%, #d495ac 100%)",
  'rock' : "linear-gradient(43deg, #635d41 0%, #756d4c 46%, #7a7663 100%)",
  'steel' : "linear-gradient(43deg, #788ea2 0%, #456e93 46%, #425465 100%)",
  'water' : "linear-gradient(43deg, #325d83 0%, #1c517f 46%, #537ca0 100%)"
}
const movesContainer = document.getElementById('moves-container');
const baseURL = `https://pokeapi.co/api/v2/`;
const POKEMON = 'pokemon/';
const MOVE = 'move/';

async function fetchData(baseURL ,endpoint, value){
  try {
    const url = new URL(`${baseURL}${endpoint}${value}`);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}

async function fetchFromTwoAPIs(pokeName) {
  try {
      const pokeData = await fetchData(baseURL, POKEMON, pokeName);
      console.log('Data for Pokemon:', pokeData);

      const moves = getMoves(pokeData);

      const value1promise = fetchData(baseURL,MOVE,moves[0]);
      const value2promise = fetchData(baseURL,MOVE,moves[1]);
      const [move1Data, move2Data] = await Promise.all([value1promise,value2promise]);

      console.log('Data for move 1:', move1Data);
      console.log('Data for move 2:', move2Data);

      // Do something with data from both APIs...
      renderPokeCard(pokeData);
      removeMoveRender();
      renderMovesCard(move1Data);
      renderMovesCard(move2Data);
      
  } catch (error) {
      console.error('Error:', error);
  }
}

function changeCardStyle(type) {
  document.getElementById('card').style.backgroundImage = gradients[type];
}

function renderMovesCard(data){

  const newDiv = document.createElement('div');
  newDiv.classList.add('move-div');

  const nameSpan = document.createElement('span');
  nameSpan.innerText = capitalize(data.name);

  let powerSpan;
  if(data.power===null){
    powerSpan = document.createElement('p');
    powerSpan.innerText = data.effect_entries[0].short_effect;
    powerSpan.classList.add('description');
  } else {
    powerSpan = document.createElement('span');
    powerSpan.innerText = data.power;
    powerSpan.classList.add('power');
  }
  

  const typeSpan = document.createElement('span');
  
  const img = document.createElement('img');
  img.classList.add('move-img');
  const type = data.type.name;
  img.src = './icons/' + type + '.png';
  typeSpan.appendChild(img)

  
  newDiv.appendChild(typeSpan);
  newDiv.appendChild(nameSpan);
  newDiv.appendChild(powerSpan);
  movesContainer.appendChild(newDiv); 
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokeData(data){
  document.getElementById('name').innerText = capitalize(data.name);
  document.getElementById('id').innerHTML = 'pokedex nr. ' + data.id;
  document.getElementById('hp').innerHTML = 'HP: ' + data.stats[0].base_stat;
  document.getElementById('height').innerHTML = 'HT: ' + data.height;
  document.getElementById('weight').innerHTML = 'WT: ' + data.weight;
}

function renderMoveType(data){
  const type = data.name;

}
function renderPokeType(data){
  let type = data.types[0].type.name;
  let img = document.getElementById('type');
  img.src = './icons/' + type + '.png';
}

function renderNewImg(data){ 
  const img = document.getElementById('current-pokemon');
  img.src = data.sprites.other['official-artwork'].front_default; 
}

//remove Previous Moves Render
function removeMoveRender(){
  while (movesContainer.firstChild) {
    movesContainer.removeChild(movesContainer.firstChild);
  };
}

function getMoves(data){
  const movesList = []
  data.moves.forEach(function(move){
    movesList.push(move.move.name);
  })
  
  const moves = []
  let index1 = Math.floor(Math.random() * movesList.length -1);
  let index2;
  do {
      index2 = Math.floor(Math.random() * movesList.length -1);
  } while (index2 === index1);
  moves.push(movesList[index1], movesList[index2]);
  return moves;
}

document.getElementById('search-btn').addEventListener('click', function(){
  let input = document.getElementById('input');
  fetchFromTwoAPIs(input.value);
  input.value = '';
});

function renderPokeCard(data){
  renderPokeData(data);
  renderPokeType(data);
  renderNewImg(data);
}
