import React, { useState } from 'react'
import OtpLayout from './ OtpLayout'

const Register = () => {
  var [open,setOpen]=useState(false)
  var [num,setNum]=useState(0)  

  // Function Handles the modal component
  const handleModal = ()=>{
    setOpen(true)
    generateNum()
  }
  // function generates the random number
  const generateNum = ()=>{
    num = Math.floor(Math.random()*90000+10000)
    if(num.toString().match(/^((?!(0))[0-9]{5})$/)){
      setNum(num)
    }
  }

  return (
    <div>
      <button onClick={handleModal} >Validate OTP</button>
      {open?<OtpLayout generateNum={generateNum} open={open} setOpen={setOpen} num={num} setNum={setNum}/>:<></>}
    </div>
  )
}

export default Register