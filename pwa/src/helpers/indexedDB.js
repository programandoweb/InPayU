export let    indexedDB   =   window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
export const  version     =   1
export let    connect     =   false
export let    request     =   false
export let    tabla       =   "apirest"
export let    db

const createConnection=(db_)=>{
  try {

    /*si no es soportado por el navegador, se cierra la sesión*/
    if (!window.indexedDB) {
      return connect = false
    }

    db                =   db_
    request           =   indexedDB.open(db,1);


    let objectStore   =   false

    request.onerror   =   function(event){
      connect         =   false
    };

    request.onupgradeneeded =   function (event){
      let db                =   event.target.result;
      objectStore           =   db.createObjectStore(tabla, {keyPath:'endpoint',autoIncrement: true} );
      objectStore.createIndex("endpoint", "endpoint", { unique: true });
      objectStore.createIndex("response", "response", { unique: false });
    }

  } catch (e) {
    /*si ocurre un error desactivo la conexión*/
    console.log(e);
  }
}

const requestApi=(endpoint,requestData)=>{
  request           =   indexedDB.open(db,1);
  request.onsuccess =   (event) =>  {
    let db          =   event.target.result;
    try {
      var transaction =   db.transaction([tabla], "readwrite");
      var objectStore =   transaction.objectStore(tabla);
      objectStore.add({endpoint:endpoint,response:requestData});
    } catch (e) {

    }
  }
}

const responseApi           =   async(endpoint)=>{
  return new Promise(function(resolve, reject){
    request                 =   indexedDB.open(db,1);
    request.onsuccess       =   (event) =>  {
      let db                =   event.target.result;
      let transaction       =   db.transaction([tabla]);
      let objectStore       =   transaction.objectStore(tabla);
      let request2          =   objectStore.get(endpoint);

      request2.onsuccess    =   function(event) {
        resolve(event.target.result)
      };

      request2.onerror    =   function(event) {
        reject(event)
      };
    }
  })
}



const exportar  =   {
                      createConnection,
                      connect,
                      requestApi,
                      responseApi,
                    }
export default exportar
