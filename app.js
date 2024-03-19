const url = 'https://pokeapi.co/api/v2/pokemon/565';
//pokemon 555 name is too long and doesnt fit in one line which breaks the layout
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

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
 

const movesContainer = document.getElementById('moves-container');

function getMovesList(data){
  const movesList = []
  data.moves.forEach(function(move){
    movesList.push(move.move.name);
  })
  console.log(movesList)
  return movesList;
}

function getMoves(movesList){
  const moves = []
  let index1 = Math.floor(Math.random() * movesList.length -1);
  let index2;
  do {
      index2 = Math.floor(Math.random() * movesList.length -1);
  } while (index2 === index1);
  console.log(movesList[index1], movesList[index2]);
  moves.push(movesList[index1], movesList[index2]);
  renderMoves(moves);
  return moves;
}

function renderMoves(moves){
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
