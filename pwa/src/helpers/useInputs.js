export let inputs = {}
export const useInputs=(e)=>{
  return inputs[e.target.name] =  e.target.value
}
