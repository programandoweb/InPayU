import {modules_protect as modules} from './modules';
import { useLocation } from "react-router-dom";
let   result      = false
let   result1     = false
let   result2     = false
let   component   = false
let   endpoint    = false
let   tableHref   = false
export const usePrivileges=()=>{
  const location          =   useLocation();
  const location_not_pref =   location.pathname.replace(process.env.REACT_APP_PREFIJOADMIN, '')

  result      =   modules.find((search)=>search.slug===location.pathname || (search.items && search.items.find((search2)=>search2.slug===location.pathname)));

  if (result && result.items) {
    result1    =   result.items.find((search)=>location.pathname===search.slug || search.slug.includes(location.pathname))
  }

  result2       =   modules.find((search)=>search.arraySearch);

  if (result2) {
    tableHref     =   result2.arraySearch
  }

  /*busco por arraySearch los modulos relacionados, si consigo resultados al final seteo result1*/
  if (result2 && result2.items) {
    let split   =   location.pathname.split("/");
    let slug    =   "/"+split[1]+"/"+split[2];
    result2     =   result2.items.find(search=>search.slug.includes(slug))
  }

  /*busco cortando la url*/
  if (!result) {

    location.pathname.split("/").map((row,key)=>{
      if (!component&&row!=='') {
        component=row
      }
      if (component) {
        result            =  modules.find((search)=>search.slug.includes(component))
        if (result) {
          return result1    =   result.items.find((search)=>location.pathname.includes(search.method))
        }else {
          return result1    =   []
        }
      }
      return false
    })

  }
  if (!result1 && result2) {
    result1 = result2
  }

  /*voy a buscar los endpoints*/

  endpoint  =   modules.find((search)=>location_not_pref===search.slug && search.endpoint);
  if (endpoint && endpoint.items.length>0) {
    const endpoint_   =   endpoint.items.find(search=>search.slug===location_not_pref && search.endpoint)
    if (endpoint_) {
      endpoint        =   endpoint_
    }
  }
  return {primary:result,secondary:result1,endpoint:endpoint,tableHref:tableHref}
}
