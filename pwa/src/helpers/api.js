import axios from 'axios';
//import { Typography } from '@mui/material';

const LIMIT_TIMEOUT      =  process.env.REACT_APP_LIMIT_TIMEOUT || 4000
export let functions     =  {}

export const IsValidJSONString=(item)=>{
    item = typeof item !== "string"? JSON.stringify(item): item;
    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }
    if (typeof item === "object" && item !== null) {
      return true;
    }
    return false;
}

export const setFunctions=(functions_)=>{
  functions = {...functions,...functions_}
}

const processData=(inputs)=>{
  let data          = new FormData();
      data.append("pathname",window.location.pathname)
      if (functions.csrf_token) {
        data.append("csrf_token",functions.csrf_token)
      }
      if (functions.user && functions.user.access_token) {
        data.append("access_token",functions.user.access_token)
      }
      if (functions.token) {
        data.append("access_token",functions.token)
      }
      if (inputs) {
        Object.entries(inputs).map((v,k) => {
          return data.append (v[0],v[1]);
        })
      }
      if (functions && functions.position) {
        Object.entries(functions.position).map((row,key)=>{
          if (row[1]!=='') {
            return data.append (row[0],row[1]);
          }else {
            return false

          }
        })
      }
  return data;
}

/*
  parametros:
    endpoint:   si viene vacío lo lleno con la url actual
    inputs:     data a enviar, si viene vacío se ignora
    loading:    (bool)  dispara una vista de loading
    modalShow:  (bool)  es el state en app.js que enciende y apaga el loading
*/

export const closeSession=()=>{
  functions.store.clear()
}

export  const  get  =   async (endpoint,inputs,loading,modalShow,snackbars)=>{



  if (!endpoint) {
    endpoint        =   "api/"+process.env.REACT_APP_BACKEND_VERSION+window.location.pathname;
  }

  /*
    state que controla un ícono de loading
    parámetro loading true dispara este evento al inicio
  */

  if (loading && functions.setLoading) {
    functions.setLoading(true)
  }



  try {
    //console.log(`bearer ${functions.store.get("user").access_token}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${functions.store.get("user").access_token}`;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.withCredentials = false;


    if (process.env.REACT_APP_ENVIRONMENT==='development' && functions.store.get("user").access_token) {

      if (endpoint.includes("?")) {
        endpoint=endpoint+"&t="+functions.store.get("user").access_token
      }else {
        endpoint=endpoint+"?t="+functions.store.get("user").access_token
      }
    }

    if (endpoint.includes("?")) {
      endpoint  = endpoint+"lang="+functions.lang
    }else {
      endpoint  = endpoint+"?lang="+functions.lang
    }

    //return console.log(endpoint);

    const response    =   await axios.get(window.location.hostname==='localhost'?process.env.REACT_APP_BACKEND+endpoint:process.env.REACT_APP_BACKENDREMOTE+endpoint);


    // var myAxios = axios.create({
    //   baseURL: process.env.REACT_APP_BACKEND+endpoint,
    //   timeout: 700,
    //   headers: {'Authorization': `bearer ${functions.store.get("user").access_token}`}
    // });
    //
    // const response    =   await myAxios.get(process.env.REACT_APP_BACKEND+endpoint);



    if (!IsValidJSONString(response.data)) {
      if (modalShow && functions.setModalShow) {
        functions.setModalShow({
                        show:true,
                        message:"Error en formato JSON, consulte backend",
                        size:""
                      }
                    )
      }
      return false;
    }


    if (modalShow && functions.setModalShow) {
      console.log(response.data);
    }

    if (snackbars && functions.setOpenMessage) {
      functions.setOpenMessage(response.data.message)
      setTimeout(function(){
        functions.setOpenMessage(false)
      }, LIMIT_TIMEOUT );
    }else {
      functions.setOpenMessage(false)
    }

    //console.log(response);
    functions.localDatabase.requestApi(endpoint,response.data)
    return response.data;

  } catch (e) {
    if (functions.setModalShow && e.message==='Network Error') {
      functions.internetStatus(e)
      let promise = new Promise((resolve, reject) => {
        functions.localDatabase.responseApi(endpoint).then((data)=>{
          resolve(data.response);
        })
      });
      return  await promise
    }else {
      if (functions.setSnackbars) {
        functions.setSnackbars({
                        message:e.message,
                        color:""
                      }
                    )
      }
      if (modalShow && functions.setModalShow) {
        functions.setModalShow({
                        show:true,
                        message:e.message,
                        size:""
                      }
                    )
      }

      if (process.env.REACT_APP_ENVIRONMENT==='development' && functions.setModalShow && (e.response && e.response.data && e.response.data.code==='ERROR' && !e.response.data.message && e.response.data.data==='')) {
        functions.setModalShow({
                        show:true,
                        title:e.name,
                        message:e.message,
                        size:""
                      }
                    )
      }
      return e.response
    }
  } finally {
    if (loading && functions.setLoading) {
      functions.setLoading(false)
    }
  }

}

/*
  parametros:
    endpoint:   si viene vacío lo lleno con la url actual
    inputs:     data a enviar, si viene vacío se ignora
    loading:    dispara una vista de loading
    functions.setLoading: es el state en app.js que enciende y apaga el loading
*/

export  const  post           =   async (endpoint,inputs,loading,modalShow,snackbars)=>{




  if (!endpoint) {
    //endpoint        =   "api"+window.location.pathname;
    endpoint        =   "api/"+process.env.REACT_APP_BACKEND_VERSION+window.location.pathname;
  }

  let send          =   processData(inputs)
  //let split         =   (functions.store && functions.store.get("user") && functions.store.get("user").access_token!==undefined)?functions.store.get("user").access_token.split("|")[1]:"";

  let header        =   false
  if (functions.store.get("user").access_token) {
    const contentType =   inputs.images?"multipart/form-data":"application/json"
    header          =   {
                            headers: {
                              "Content-Type": contentType,
                              'Accept': 'application/json, text/plain, */*',
                              "X-Requested-With": "XMLHttpRequest",
                              "Authorization" : `Bearer ${functions.store.get("user").access_token}`,
                              'X-CSRF-TOKEN': functions.store.get("user").access_token,
                            }
                        }
  }else {
    header          =   {
                              headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                "X-Requested-With": "XMLHttpRequest",
                              }
                            }

  }

  // const csrf_token_dinamic    =   await axios.get(process.env.REACT_APP_BACKEND+"api/admin/csrf_token", {}, header );
  // if (!csrf_token_dinamic.data) {
  //   return false
  // }else {
  //   header          =   {
  //                             headers: {
  //                               'Accept': 'application/json, text/plain, */*',
  //                               'Content-Type': 'application/json',
  //                               "X-Requested-With": "XMLHttpRequest",
  //                               "Authorization" : `Bearer ${functions.store.get("user").access_token}`,
  //                               'X-CSRF-TOKEN': csrf_token_dinamic.data,
  //                             }
  //                           }
  // }

  //console.log(header);

  /*
    state que controla un ícono de loading
    parámetro loading true dispara este evento al inicio
  */

  if (loading && functions.setLoading) {
    functions.setLoading(true)
  }

  try {

    if (endpoint.includes("?")) {
      endpoint  = endpoint+"lang="+functions.lang
    }else {
      endpoint  = endpoint+"?lang="+functions.lang
    }



    const response    =   await axios.post(window.location.hostname==='localhost'?process.env.REACT_APP_BACKEND+endpoint:process.env.REACT_APP_BACKENDREMOTE+endpoint, send, header);

    if (!IsValidJSONString(response.data)) {
      if (modalShow && functions.setModalShow) {
        functions.setModalShow({
                        show:true,
                        message:"Error en formato JSON, consulte backend",
                        size:""
                      }
                    )
      }
      return false;
    }


    if (  modalShow &&
          functions.setModalShow &&
          response.data.code==='SUCCESS' &&
          response.data.message) {
          functions.setModalShow({
                                    show:true,
                                    title:response.data.code,
                                    message:<div>{response.data.message}</div>,
                                    size:""
                                  }
                                )
          setTimeout(function(){
            functions.setModalShow(false)
          }, LIMIT_TIMEOUT);
    }

    if (snackbars && functions.setOpenMessage) {
      functions.setOpenMessage(response.data.message)
      setTimeout(function(){
        functions.setOpenMessage(false)
      }, LIMIT_TIMEOUT );
    }else {
      functions.setOpenMessage(false)
    }


    functions.localDatabase.requestApi(endpoint,response.data)
    return response.data;

  } catch (e) {
    if (e.message==='Network Error') {
      functions.localDatabase.responseApi(endpoint).then((data)=>{
        if (data && data.response && data.response.data) {
          return data.response.data;
        }
      })
      functions.internetStatus(e)
    }
    if (modalShow && functions.setModalShow) {
      if (e.response &&
          e.response.data &&
          e.response.data.code &&
          e.response.data.message ) {
        return functions.setModalShow({
                                          show:true,
                                          title:e.response.data.code,
                                          message:<div>{e.response.data.message}</div>,
                                          size:""
                                        }
                                      )
      }else if (e.response && e.response.statusText==='Unauthorized') {
        functions.setModalShow({
                          show:true,
                          title:e.response.status,
                          message:<div>{e.response.statusText}</div>,
                          size:""
                      }
                    )

        return e.response
      }else if (e.response && e.response.statusText==='0') {
        functions.setModalShow({
                          show:true,
                          title:"Error",
                          message:<div>{"¡Estamos presentando inconvenientes de conexión!"}</div>,
                          size:""
                      }
                    )
      }
      // else {
      //   functions.setModalShow({
      //                   show:true,
      //                   message:  <>
      //                               <div>{e.response.status}</div>
      //                               <div>22</div>
      //                             </>,
      //                   size:""
      //                 }
      //               )
      // }
    }

    if (process.env.REACT_APP_ENVIRONMENT==='development' && functions.setModalShow && e.response) {
      const title     =  e.response.data&&e.response.data.code?e.response.data.code:e.name
      const message   =  e.response.data&&e.response.data.message?e.response.data.message:e.message
      functions.setModalShow({
                      show:true,
                      title:title,
                      message:message,
                      size:""
                    }
                  )
    }
    return e
  } finally {
    if (loading && functions.setLoading) {
      functions.setLoading(false)
    }
  }
}

/*
  parametros:
    endpoint:   si viene vacío lo lleno con la url actual
    inputs:     data a enviar, si viene vacío se ignora
    loading:    dispara una vista de loading
    functions.setLoading: es el state en app.js que enciende y apaga el loading
*/

export  const  put  =   async (endpoint,inputs,loading,modalShow)=>{
  //let send = processData(inputs)
}

/*
  parametros:
    endpoint:   si viene vacío lo lleno con la url actual
    inputs:     data a enviar, si viene vacío se ignora
    loading:    dispara una vista de loading
    functions.setLoading: es el state en app.js que enciende y apaga el loading
*/

export  const  del  =   async (endpoint,inputs,loading,modalShow,snackbars)=>{
  if (!endpoint) {
    endpoint        =   "api"+window.location.pathname;
  }

  let send          =   processData(inputs)
  let header        =   false
  if (functions.store.get("user").access_token) {
    header          =   {
                              headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization" : `Bearer ${functions.store.get("user").access_token}`,
                                //'X-CSRF-TOKEN': '{{ csrf_token() }}'
                                'X-CSRF-TOKEN': functions.store.get("user").access_token,
                              }
                            }
  }else {
    header          =   {
                              headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                "X-Requested-With": "XMLHttpRequest",
                              }
                            }

  }

  /*
    state que controla un ícono de loading
    parámetro loading true dispara este evento al inicio
  */

  if (loading && functions.setLoading) {
    functions.setLoading(true)
  }

  try {

    const response    =   await axios.delete(window.location.hostname==='localhost'?process.env.REACT_APP_BACKEND+endpoint:process.env.REACT_APP_BACKENDREMOTE+endpoint, send, header);

    if (!IsValidJSONString(response.data)) {
      if (modalShow && functions.setModalShow) {
        functions.setModalShow({
                        show:true,
                        message:"Error en formato JSON, consulte backend",
                        size:""
                      }
                    )
      }
      return false;
    }


    if (  modalShow &&
          functions.setModalShow &&
          response.data.code==='SUCCESS' &&
          response.data.message) {
          functions.setModalShow({
                                    show:true,
                                    title:response.data.code,
                                    message:<div>{response.data.message}</div>,
                                    size:""
                                  }
                                )
          setTimeout(function(){
            functions.setModalShow(false)
          }, LIMIT_TIMEOUT);
    }

    if (snackbars && functions.setOpenMessage) {
      functions.setOpenMessage(response.data.message)
      setTimeout(function(){
        functions.setOpenMessage(false)
      }, LIMIT_TIMEOUT );
    }else {
      functions.setOpenMessage(false)
    }


    functions.localDatabase.requestApi(endpoint,response.data)
    return response.data;

  } catch (e) {
    if (e.message==='Network Error') {
      functions.localDatabase.responseApi(endpoint).then((data)=>{
        return data.response.data;
      })
      functions.internetStatus(e)
    }
    if (modalShow && functions.setModalShow) {
      if (e.response &&
          e.response.data &&
          e.response.data.code &&
          e.response.data.message ) {
        return functions.setModalShow({
                                          show:true,
                                          title:e.response.data.code,
                                          message:<div>{e.response.data.message}</div>,
                                          size:""
                                        }
                                      )
      }else if (e.response && e.response.statusText==='Unauthorized') {
        functions.setModalShow({
                          show:true,
                          title:e.response.status,
                          message:<div>{e.response.statusText}</div>,
                          size:""
                      }
                    )
      }else if (e.response && e.response.statusText==='0') {
        functions.setModalShow({
                          show:true,
                          title:"Error",
                          message:<div>{"¡Estamos presentando inconvenientes de conexión!"}</div>,
                          size:""
                      }
                    )
      }
    }

    if (process.env.REACT_APP_ENVIRONMENT==='development' && functions.setModalShow) {
      functions.setModalShow({
                      show:true,
                      title:e.name,
                      message:e.message,
                      size:""
                    }
                  )
    }

    return e
  } finally {
    if (loading && functions.setLoading) {
      functions.setLoading(false)
    }
  }
}
