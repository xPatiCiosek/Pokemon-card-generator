function fetchData(value){
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
      renderNewImg(data);
      renderMoves(getMoves(data));
      renderType(data);

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function renderType(data){
  let type = data.types[0].type.name;
  console.log(type);
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

  //remove rendered moves before assigning new ones
  while (movesContainer.firstChild) {
    movesContainer.removeChild(movesContainer.firstChild);
  };

  moves.forEach( move =>{
    const newDiv = document.createElement('div');
    const moveSpan = document.createElement('span');
    moveSpan.innerText = move;
    newDiv.appendChild(moveSpan);
    movesContainer.appendChild(newDiv); 
  })
}
  
function renderPokeData(data){
  document.getElementById('name').innerText = data.name;
  document.getElementById('id').innerHTML = 'pokedex nr. ' + data.id;
  document.getElementById('hp').innerHTML = 'HP: ' + data.stats[0].base_stat;
  document.getElementById('height').innerHTML = 'HT: ' + data.height;
  document.getElementById('weight').innerHTML = 'WT: ' + data.weight;
}

document.getElementById('search-btn').addEventListener('click', function(){
  let input = document.getElementById('input');
  fetchData(input.value);
  input.value = '';
});
