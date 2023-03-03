import React from 'react';
import "./css.css";

const Textarea=({name,inputs,onChange,classNameMain,className,defaultValue,placeholder})=>{

  const [reset, setReset]       =   React.useState(false)
  const [standBy, setStandBy]   =   React.useState(true)

  // React.useEffect(()=>{
  //   if (inputs[name] && standBy) {
  //     setReset(true)
  //     setStandBy(false)
  //   }
  // },[inputs])
  //
  // React.useEffect(()=>{
  //   if (reset) {
  //     setReset(false)
  //   }
  // },[reset])

  return  <div className={classNameMain || "content-textarea"}>
                <label>{placeholder}</label>
                {!reset?<textarea name={name}
                    className={className}
                    defaultValue={inputs&&inputs[name]?inputs[name]:""}
                    onChange={onChange}/>:false}
          </div>


}

export default Textarea
