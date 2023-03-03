const index =   "useShoppingCart"


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/*
  add shoppingCart item
  params:
    id (get database)
    title
    course_id
    price
    amount
    status (optional)
    user_id (optional)
*/

export const useShoppingCart=()=>{

  const reload = async (data)  =>  {
    await null
    localStorage.setItem(index,JSON.stringify(data, getCircularReplacer()));
    return true;
  }

  const get = async ()  =>  {
    await null
    return resolveGetAsync();
  }

  const set = async (data)  =>  {
    await null
    localStorage.setItem(index,JSON.stringify(data, getCircularReplacer()));
    return true;
  }

  const del = async (data) =>  {
    await null
    //let input = []
    return get().then((response)=>{
      if (response.length>0) {
        response.splice(response.findIndex(search=>search.id===data.id), 1);
        localStorage.setItem(index,JSON.stringify(response, getCircularReplacer()));
        return response;
      }
    })

  }

  const add = async (data)  =>  {
    await null
    return get().then((response)=>{

      let insert    =   []
      if (response) {
        insert        =   response
        const result  =   response.findIndex((search)=>search.id===data.id || ((search.description&&search.description.id)&&(data.description&&data.description.id) && search.description.id===data.description.id))
        if (result===-1) {
          insert.push(data)
        }else {
          response.splice(response.findIndex((search)=>search.id===data.id || ((search.description&&search.description.id)&&(data.description&&data.description.id) && search.description.id===data.description.id)), 1);
          insert.push(data)
        }
      }else {
        insert.push(data)
      }

      localStorage.setItem(index,JSON.stringify(insert, getCircularReplacer()));

      return insert

    }).catch((e)=>{
      return e
    })
  }

  const clear = async ( ) =>{
    await null
    return get().then((response)=>{
      //localStorage.removeItem(index);
      return response
    })

  }

  return {set,get,add,del,clear,reload}
}

export const add=(data)=>{
  localStorage.setItem(index,JSON.stringify(data));
}

export const upd=()=>{
  console.log(get(index));
  //localStorage.setItem(index,JSON.stringify(object));
}

export const del=()=>{
  //localStorage.setItem(index,JSON.stringify(object));
}

export const get=()=>{
  const   value   =   localStorage.getItem(index);
  return  value?JSON.parse(value):false
}

export const getAsync = async ()  =>  {
  await null
  return resolveGetAsync();
}

const resolveGetAsync=()=>{
  return new Promise((resolve,reject) => {
    const   value   =   localStorage.getItem(index);
    resolve(JSON.parse(value))
  });
}

export const empty=()=>{
  //localStorage.setItem(index,JSON.stringify(object));
}


// const useShoppingCart=()=>{
//   return  {
//             add:add,
//             upd:upd,
//             del:del,
//             empty:empty,
//             getAsync:getAsync,
//           }
// }

export default useShoppingCart
