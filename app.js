

//index
const container =document.getElementById("containerHeader")
const listTagA = container.getElementsByTagName("a");
const bodyListPokemon = document.getElementById("indexBody");

//ciclo para controlar cuando ocultar o mostrar el inicio sesion, cerrar sesion y registro
for (let i = 0;i < listTagA.length;i++){
        
        listTagA[i].onclick = (event)=>{
            if(event.currentTarget.textContent == "iniciar sesion"){
                localStorage.setItem("statu","iniciar")
                
            }else if(event.currentTarget.textContent == "registrarse"){
                localStorage.setItem("statu","registrar")
                
                //condicion para ocultar cerrar sesion  y mostrar iniciar sesion y cerrar sesion
            }else if(event.currentTarget.textContent == "cerrar sesion"){
                localStorage.setItem("inicioSesion",false)

                listTagA[0].classList.remove("hiddenA")
                listTagA[0].classList.add("showA")
                
                listTagA[1].classList.remove("showA")
                listTagA[1].classList.add("hiddenA")
                listTagA[2].classList.remove("hiddenA")
                listTagA[2].classList.add("showA")
                
                
            }
        }
    
};

//condicion para ocultar iniciar sesion y registrarse y mostrar cerrar sesion
if(localStorage.getItem("inicioSesion") == 'true'){
        
        listTagA[0].classList.add("hiddenA")
        listTagA[0].classList.remove("showA")
                
        listTagA[1].classList.add("showA")
        listTagA[1].classList.remove("hiddenA")
        listTagA[2].classList.add("hiddenA")
        listTagA[2].classList.remove("showA")
        
    
    }


    

async function loadApi (){
    //caarga la api y la prepara para poder a empezar a trabajar con ella
    let datos = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1282");
    const res = await datos.json();
    //se crea un objeto fragment para  agregar las etiquetas de los nombres de los pokemones
    const fragment = document.createDocumentFragment();

    //iteramos hasta la cantidad de pokemones
    for (let i = 0; i < 1280;i++){
        
        const a = document.createElement("a");
        //creamos el funcionamiento al dar click a un pokemon
        a.onclick = (event) =>{
            const listA = bodyListPokemon.getElementsByTagName("a")
            
            if (localStorage.getItem("inicioSesion") == 'true'){
                const listA = bodyListPokemon.getElementsByTagName("a")
                //obtenemos el indice de el pokemon en la api
                let pokemonNum = Object.values(listA).indexOf(event.currentTarget) +1
                //hacemos la formula ya que despues de cierta cifra empieza a valer 9000 mas
                if (pokemonNum > 1010){
                    pokemonNum+=(9000-9)
                    localStorage.setItem("pkm",String(pokemonNum))
                } else{
                    localStorage.setItem("pkm",String(pokemonNum))
                }
            }else{
                event.preventDefault();
                alert("primero debes iniciar sesion porfavor ve a la parte superior de la aplicacion y dale en el boton iniciar sesion o registrar si todabia no tienes cuenta")
            }
                
                
            }
        
        a.textContent = res.results[i].name    
        a.setAttribute("href","views/pokemon-Details.html")
        a.classList.add("pokemonLink")
        //agregamos todas los elementos a el objeto fragment y despues lo damos como hijo a nuestro container
        fragment.appendChild(a)

            //views.target in Object.values(l)
        }
        bodyListPokemon.appendChild(fragment)


    };
    
   


loadApi()
 