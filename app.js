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
    const name = document.getElementById('name');
    name.innerText += data.name;
    const id = document.getElementById('id');
    id.innerText += data.id;
    const hp = document.getElementById('hp');
    hp.innerText += data.stats[0].base_stat;
    const height = document.getElementById('height');
    height.innerText += data.height;
    const weight = document.getElementById('weight');
    weight.innerText += data.weight;
    const imgContainer = document.getElementById('img-container')
    let img = document.createElement('img');
    img.classList.add('img');
    // img.src = data.sprites.front_default;
    console.log(data.sprites.other)
    img.src = data.sprites.other['official-artwork'].front_default;
    imgContainer.appendChild(img);
    getMovesList(data);

    getMoves(getMovesList(data))

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
  
 
function getPokeData(data){
  const name = data.name;
  const id = data.id;
  const hp = data.stats[0].base_stat;
  const height = data.height;
  const weight= data.weight;
  const img = data.sprites.other['official-artwork'].front_default;
}