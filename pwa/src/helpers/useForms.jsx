import React from 'react';

const UseForms=()=>{
  const [inputs, setInputs] = React.useState({});

  const onChange  = (e) =>  {
    if (!e || !e.target) {
      return false
    }
    let input = {...inputs}
        input[e.target.name]  =   e.target.value
        setInputs(input)
  }

  const setState=(name,data)=>{
    let input = {...inputs}
        input[name] = data
        setInputs(input)
  }

  const overWriteState=(data)=>{
    setInputs(data)
  }

  return [inputs,onChange,setState,setInputs,overWriteState]
}

export default UseForms
