/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

let risposte_finali = { 
  blep: 0,
  happy: 0,
  sleeping: 0,
  dopey: 0,
  burger: 0,
  cart: 0,
  nerd: 0,
  shy: 0,
  sleepy: 0};
  
let risposte_date = {};

function risultato(){
  for(const chiave in risposte_date){
    for(const chiave2 in risposte_finali){
      if(risposte_date[chiave] == chiave2){
        risposte_finali[chiave2]++;
      }
    }
  }
  console.log(risposte_finali);

  let massimo = 0;
  let personality = '';
  for(const chiave in risposte_finali){
    if(risposte_finali[chiave] > massimo){
      massimo = risposte_finali[chiave];
      personality = chiave;
    }
  }

  if(massimo == 1){
    personality = risposte_date.first;
  } 
  return personality;

}


function end(){
  if(risposte_date.first !== undefined && risposte_date.second !== undefined && risposte_date.third !== undefined){

    const risposte = document.querySelectorAll('.choice-grid div');
    for(const risposta of risposte){
    risposta.removeEventListener('click', seleziona);
    }

    const result = document.querySelector('.risultato');
    result.classList.remove('hidden');
    const title = result.querySelector('h1');
    const contents = result.querySelector('p');
  
    let personality = risultato();
    title.textContent = RESULTS_MAP[personality].title;
    contents.textContent = RESULTS_MAP[personality].contents;


  }

}



function seleziona(event){
    const selezionata = event.currentTarget;  
    selezionata.classList.remove('unselected');
    selezionata.classList.add('selected');
    const img = selezionata.querySelector('.checkbox');
    img.src = 'images/checked.png';

    const unselected = document.querySelectorAll('.choice-grid div');
    for(const selection of unselected){
      if(selection.dataset.questionId === selezionata.dataset.questionId){
        if(selection !== selezionata){
        const image = selection.querySelector('.checkbox');
        image.src = 'images/unchecked.png';
        selection.classList.remove('selected');
        selection.classList.add('unselected');
      }
    }
  }
    
      if(selezionata.dataset.questionId === 'one')
      {
        risposte_date.first = selezionata.dataset.choiceId;
        console.log(risposte_date);
      }
      else if(selezionata.dataset.questionId === 'two'){
        risposte_date.second = selezionata.dataset.choiceId;
        console.log(risposte_date);
      }
      else if(selezionata.dataset.questionId === 'three'){
        risposte_date.third = selezionata.dataset.choiceId;
        console.log(risposte_date);
       
      
      }
    
     
      end();
    
}

function ricomincia(){
  const risposte = document.querySelectorAll('.choice-grid div');
  for(const risposta of risposte){
    risposta.addEventListener('click', seleziona);
    risposta.classList.remove('selected');
    risposta.classList.remove('unselected');

    const img = risposta.querySelector('.checkbox');
    img.src = 'images/unchecked.png';

   
  }

  const risultato = document.querySelector('.risultato');
  risultato.classList.add('hidden');
  

  risposte_date = {};
  risposte_finali = {
    blep: 0,
    happy: 0,
    sleeping: 0,
    dopey: 0,
    burger: 0,
    cart: 0,
    nerd: 0,
    shy: 0,
    sleepy: 0

  };
}

const risposte = document.querySelectorAll('.choice-grid div');
for(const risposta of risposte){                       
    risposta.addEventListener('click', seleziona);
}

const bottone = document.querySelector('button');
bottone.addEventListener('click', ricomincia);


//MHW3//



function search(event){
                                                               
  event.preventDefault();

  const view = document.querySelector('#sports-view');
  view.innerHTML = '';

  const text = document.querySelector('#sport');               
  const sport_value = encodeURIComponent(text.value);
  console.log('Eseguo la ricerca: ' + sport_value);
  const request = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';  
  console.log('URL ' + request);
  fetch(request).then(onResponse).then(onJson);

}

function onResponse(response){
  return response.json();                                      
}


function onJson(json){

  console.log(json);
  const text = document.querySelector('#sport');               
  const sport_value = encodeURIComponent(text.value);
  console.log('Eseguo la ricerca: ' + sport_value);
  text.innerHTML = '';                                         
  let risultato = json.sports.length;
  console.log(risultato);

  for(let i = 0; i < risultato; i++){                          
    const sports = json.sports[i];
    if(sports.strSport === sport_value){
      const type = json.strSport;
      const img = sports.strSportThumb;                        
      const elemento = document.createElement('div');
      elemento.classList.add('sport');
      const copertina = document.createElement('img');
      copertina.src = img;
      const paragrafo = document.createElement('span');
      paragrafo.textContent = type;
      elemento.appendChild(copertina);
      elemento.appendChild(paragrafo);
      const view = document.querySelector('#sports-view');
      view.appendChild(elemento);
    }

  }

}


function onTokenJson(json){
  console.log(json);
}





function search3(event)
{
  
  event.preventDefault();

  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);

  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson3);
}




function onTokenJson(json)
{                                                                           
  console.log(json)
  token = json.access_token;
}




function onTokenResponse(response)                                          
{
  return response.json();
}




const client_id = '6494ad6c3f594b4a8a658e2ff7e308b4';                        
const client_secret = '40bb93c2f32342d7873a7f1b7d76d73b';                    
let token;                                                                   
                                                                             
                                                                             

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",                                                           
   body: 'grant_type=client_credentials',                                    
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);




function onJson3(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  const results = json.albums.items;
  let num_results = results.length;

  if(num_results > 3)
    num_results = 3;

  for(let i=0; i<num_results; i++)
  {
  
    const album_data = results[i]
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
  
    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
  }
}




const form = document.querySelector('.firstsearch');
form.addEventListener('submit', search);

const form3 = document.querySelector('.thirdsearch');
form3.addEventListener('submit', search3);