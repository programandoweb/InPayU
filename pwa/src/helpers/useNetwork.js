import { useState, useEffect } from 'react';
export const useNetwork=(get)=>{
  const [online, setOnline] = useState(false);
  useEffect(()=>{
    // get(process.env.REACT_APP_BACKEND+"api/status",{},false,false).then((response)=>{
    //   console.log(response);
    // })
  },[])
  return online;
}
