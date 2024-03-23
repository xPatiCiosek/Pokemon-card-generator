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
      
  } catch (error) {
      console.error('Error:', error);
  }
}

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
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
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

function renderMoves(moves){

  //remove rendered moves before assigning new ones
  while (movesContainer.firstChild) {
    movesContainer.removeChild(movesContainer.firstChild);
  };

  //for each move fetchData / get name power type
  moves.forEach( move =>{
    fetchMoveData(move);
  })
}

document.getElementById('search-btn').addEventListener('click', function(){
  let input = document.getElementById('input');
  fetchPokeData(input.value);
  input.value = '';
});
