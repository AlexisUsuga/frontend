const form = document.getElementById("formulario")
const title = document.getElementById("titleForm")


function POST (){
    //envia la informacion para guardarla
    form.addEventListener("submit",async function (event) {
        event.preventDefault();
        if (form[0].value != "" && form[1].value != "" ){
            const formConvertData= new FormData(form);
            const f = await fetch('http://localhost/api/guardar.php',{
            method: 'POST',
            body: formConvertData
            });
        alert("te has registrado exitosamente")
        window.location.href = "../index.html"
        }else{
            alert("faltan datos por llenar en el formulario porfavor completa el formulario e intentalo")
        }
                  
    })
}

async function GET(){
    //obtiene la informacion de la base de datos
    form.addEventListener("submit",async function (event) {
        event.preventDefault();
        let datos = await fetch('http://localhost/api/obtener.php');
        const res = await datos.json();
        
        //asegura que el formulario se alla llenado
        if (form[0].value != "" && form[1].value != "" ){
            
            const verfLogin = ()=>{
                for (let i in res.users){
                    //verifica si el usuario existe
                    if (res.users[i]["email"] == form[0].value && res.users[i]["password"] == form[1].value ){
                        //se asegura que la sesion se a iniciado
                        localStorage.setItem("inicioSesion",true)
                        return true
                        
                    }
                }
                return false
            }
            if(verfLogin()){

                alert("has ingresado el email y contraseña correctamente")
                //retorna otra vez donde estan todos los pokemones
                window.location.href = "../index.html"
                
            }else{
                alert("contraseña o correo incorrecto intentalo nuevamente")
                
            }
                  
        }else{
            alert("faltan datos por llenar en el formulario porfavor completa el formulario e intentalo")
        }      
    })
};

//comprueba que es lo que el usuario esta solicitando (iniciar sesion, registrarse, cerrar sesion)
if(localStorage.getItem("statu") == "iniciar"){
    title.textContent = "iniciar sesion"
    GET()

}else if(localStorage.getItem("statu") == "registrar"){
    title.textContent = "registrar sesion"
    
    POST()

}else if(localStorage.getItem("statu") == "cerrar"){

    localStorage.setItem(inicioSesion,false)
}
