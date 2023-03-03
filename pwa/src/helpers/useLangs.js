
let     indexedDB   =   window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const   version     =   1
const   db          =   "programandoweb"
const   tabla       =   "langs_items"
let     request     =   false


// const apirest=async()=>{
//
//   const res = await fetch("https://libretranslate.com/translate", {
// 	method: "POST",
//   	body: JSON.stringify({
//   		q: "hola",
//   		source: "auto",
//   		target: "en",
//   		format: "text",
//   		api_key: ""
//   	}),
//   	headers: { "Content-Type": "application/json" }
//   });
//
//   console.log(await res.json());
//
// }

const useLang = ()  =>{

  try {

    /*si no es soportado por el navegador, se cierra la sesión*/
    if (!window.indexedDB) {
      return console.log("Navegador no soportado");
    }

    request           =   indexedDB.open(db,version);

    request.onerror   =   function(event){
      console.log(event.target.result);
    };

    request.onsuccess =   function(event){
      inserts(event)
    };

    request.onupgradeneeded =   function (event){
      let db                =   event.target.result;
      let objectStore       =   db.createObjectStore(tabla, {keyPath:'label',autoIncrement: true} );
      objectStore.createIndex("label", "label", { unique: true });
      objectStore.createIndex("values", "values", { unique: true });
    }

    const inserts   = (event)  =>{
      let db            =   event.target.result;
      try {
        var transaction =   db.transaction([tabla], "readwrite");
        var objectStore =   transaction.objectStore(tabla);

        es.map((row,key)=>{
          const insert  =   {
            label:row,
            value:{es:row,en:en[key]}
          }
          return objectStore.add(insert);
        })

      } catch (e) {
        console.log(e);
      }
    }

    const set = text=>{
      try {
        return new Promise(function(resolve, reject){
          request.onsuccess =   function(event){
            let db          =   event.target.result;
            try {
              var transaction =   db.transaction([tabla], "readwrite");
              var objectStore =   transaction.objectStore(tabla);
              const insert  =   {
                label:text,
                value:{es:text,en:"hold english "+text}
              }
              return objectStore.add(insert);
            } catch (e) {
              console.log(e);
            }
          }
          request.onerror    =   function(event) {
            return reject(event)
          };
        })
      } catch (e) {
        console.log(e);
      }
    }

    const text = text=>{
      try {

      } catch (e) {
        console.log(e);
      }
    }

    const get = async ()  =>{
      try {
        return new Promise(function(resolve, reject){
          request.onsuccess =   function(event){
            let db                =   event.target.result;
            let transaction       =   db.transaction([tabla]);
            let objectStore       =   transaction.objectStore(tabla);
            let request2          =   objectStore.getAll();

            request2.onsuccess    =   function(event) {
              let return_  = {}
              event.target.result.map((row,key)=>{
                return return_[row.label] = row.value
              })
              return resolve(return_)
            };

            request2.onerror    =   function(event) {
              return reject(event)
            };
          };
        })
      } catch (e) {
        console.log(e);
      }
    }


    return {text,get,set}

  } catch (event) {
    console.log(event);
  }
}

export { useLang };

// const traslator = {
//   es:{
//     label:"Español",
//     symbol:"es",
//     ma_estatus_id:8
//   },
//   en:{
//     label:"English",
//     symbol:"en",
//     ma_estatus_id:8
//   },
// }

const es        =   [ "Anterior",
                      "Siguiente",
                      "Academias",
                      "Rediferidos",
                      "Blog",
                      "Contacto",
                      "Buscar...",
                      "Iniciar sesión",
                      "Crear Cuenta",
                      "Olvidé contraseña",
                      "Bienvenido",
                      "Correo electrónico",
                      "Contraseña",
                      "Recuperar contraseña",
                      "Registro de usuario",
                      "Nombres y Apellidos",
                      "Celular",
                      "Nombre de Usuario",
                    ]
const en        =   [ "Last",
                      "Next",
                      "Academies",
                      "Referrals",
                      "Blog",
                      "Contact",
                      "Search...",
                      "Log in",
                      "Sign up",
                      "I forgot the passwod",
                      "Welcome",
                      "Email",
                      "Password",
                      "Recover password",
                      "User register",
                      "Names and Surnames",
                      "Cell phone",
                      "Username",
                    ]
// const items     =   {
//                       es:es,
//                       en:en,
//                     }
//
// const  structure    =   {
//   langs_items:traslator
// }
