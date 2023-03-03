export const get=(index)=>{
  const get = localStorage.getItem(index);
  if (get!==null && get!=='' && get!==undefined && get!=="undefined")  {
    return JSON.parse(get);
  }else if (get==="undefined") {
    clear(index);
    return {}
  } else {
    return {}
  }
}


export const getStoreAsync = async (index)  =>  {
  await null;
  return resolveGetStoreAsync(index)
}

const resolveGetStoreAsync=(index)=>{
  return new Promise((resolve, reject) => {
    try {
      let get = localStorage.getItem(index);
      resolve(JSON.parse(get))
    } catch (e) {
      reject({})
    }
  });
}

export const set=(index,object)=>{
  localStorage.setItem(index,JSON.stringify(object));
}

export const setStoreAsync = async(index,object)=>{
  await null;
  return resolveSetStoreAsync(index,object)
}

const resolveSetStoreAsync=(index,object)=>{
  return new Promise((resolve, reject) => {
    if (localStorage.setItem(index,JSON.stringify(object))) {
      resolve(object);
    }else {
      reject(false)
    }
  });
}

export const clear=()=>{
  localStorage.clear();
}

export const useStore=()=>{
  return  {
            clear:clear,
            set:set,
            get:get,
            getStoreAsync:getStoreAsync,
            setStoreAsync:setStoreAsync
          }
}
