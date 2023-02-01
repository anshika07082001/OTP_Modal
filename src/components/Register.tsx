import React, { useState } from 'react'
import OtpLayout from './ OtpLayout'

const Register = () => {
  console.log('register component')
  var [open,setOpen]=useState(false)
  var [num,setNum]=useState(0)  

  const handleModal = ()=>{
    setOpen(true)
    generateNum()
  }

  const generateNum = ()=>{
    num = Math.floor(Math.random()*90000+10000)
    if(num.toString().match(/^((?!(0))[0-9]{5})$/)){
      setNum(num)
    }
    // if(inp1Ref.current!==null){
    //   if(inp1Ref.current.value==''){
    //     inp1Ref.current.focus()
    //   }
    // }
  }

  return (
    <div>
      <button onClick={handleModal} >Validate OTP</button>
      {open?<OtpLayout generateNum={generateNum} open={open} setOpen={setOpen} num={num} setNum={setNum}/>:<></>}
    </div>
  )
}

export default Register