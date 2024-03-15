const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 
    const text = document.getElementById('name');
    text.innerText += data.name;
    const id = document.getElementById('id');
    id.innerText += data.id;
    const height = document.getElementById('height');
    height.innerText += data.height;
    const weight = document.getElementById('weight');
    weight.innerText += data.weight;
    const imgContainer = document.getElementById('img-container')
    let img = document.createElement('img');
    img.src = data.sprites.front_default;
    imgContainer.appendChild(img);

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
 

 
