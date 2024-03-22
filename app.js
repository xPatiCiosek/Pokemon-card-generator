function fetchPokeData(value){
  const url = `https://pokeapi.co/api/v2/pokemon/${value}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      renderPokeData(data);
      renderPokeType(data);
      renderNewImg(data);
      renderMoves(getMoves(data));
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
const movesContainer = document.getElementById('moves-container');
function fetchMoveData(value){
  const url = `https://pokeapi.co/api/v2/move/${value}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
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

const movesContainer = document.getElementById('moves-container');

function getMoves(data){
  const movesList = []
  data.moves.forEach(function(move){
    movesList.push(move.move.name);
  })
  console.log(movesList)
  return movesList;
}

function renderMoves(movesList){
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
