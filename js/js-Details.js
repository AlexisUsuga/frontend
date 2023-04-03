
const namePok = document.getElementById("namePokemon");
const imgPok = document.getElementById("imgPokemon");
const habilitiesPok = document.getElementById("habilitiesPokemon");
const fragment = document.createDocumentFragment();

//agregamos el indice del pokemon seleccionado y se agrega como ruta a la ruta de la api
let p = "https://pokeapi.co/api/v2/pokemon/"
p+=localStorage.getItem('pkm')

async function loadApi (){
    try{
        //obtenemos la informacion del pokemon seleccionado
        let datos = await fetch(p);
        const res = await datos.json();
        namePok.textContent = res.name
        
          
    //agregamos la imagen de el pokemon de la api a la etiqueta img
    if(res.sprites.other["official-artwork"].front_default != null){
        imgPok.setAttribute("src",res.sprites.other["official-artwork"].front_default)

    }else{
        if(res.name.includes('miraidon')){
            imgPok.setAttribute("src","https://assets.pokemon.com/assets/cms2/img/pokedex/full/1008.png")    
        }
        else{
            imgPok.setAttribute("src","https://assets.pokemon.com/assets/cms2/img/pokedex/full/1007.png")
            
        }
        
    }

    //creamos un forEach para agregar las habilidades del pokemon
    res.abilities.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element.ability.name
        fragment.appendChild(li)
    });

    //finalizamos agregando las habilidades a una lista desordenada
    habilitiesPok.appendChild(fragment);
    }catch(e){
        
        alert("lo sentimos mucho no hemos podido solicitar lo que buscabas intentalo mas tarde o comunicate con el creador.")
    }
          
};

loadApi()