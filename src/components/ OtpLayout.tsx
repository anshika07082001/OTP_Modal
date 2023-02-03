import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from 'react';

const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 2,};

type OtpProps={
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    num:number,
    setNum:React.Dispatch<React.SetStateAction<number>>,
    generateNum:()=>void
}

const OtpLayout = (props:OtpProps) => {

    var [numArr,setNumArr]=useState<any>([])
    var [border,setBorder]=useState('noneBorder')
    var [errColor,setErrColor]=useState('')
    var [disabled,setDisabled]=useState(true)
    var [msg,setMsg]=useState('')
    var [sec,setSec]=useState(5)
    var [limit,setLimit]=useState(4)
    const inpRefs = useRef<any>([])
    var modalInterval:any

    const intervalId=useRef<any>()

    useEffect(()=>{
        clearInterval(intervalId.current)
        intervalId.current = setInterval(timer,1000)
        if(sec==0){
            setDisabled(false)
        }
    },[sec])

    // function closes the Modal
    const handleClose = () => {
        props.setOpen(false);
        reset()
    }
    
    // function runs on input onchange
    const inpHandler=(e:any)=>{
        var n:number = e.target.value
        if(n.toString().length==1)
        {
            var ele = e.target
            var nextSibling = ele.nextElementSibling
            nextSibling?nextSibling.focus():ele.blur()
            numArr.push(n)
            setNumArr([...numArr])
        }
    }

    // Function validates the number entered by user and random generated number

   
    const matchNum=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(numArr.length==5){
            if(parseInt(numArr.join(''))==props.num){
                setBorder('succesBorder')
                setErrColor('success')
                setMsg('Matched successfully')
                if(!modalInterval){
                    modalInterval = setTimeout(()=>props.setOpen(false),1000)
                }
            }     
            else{
                setBorder('errorBorder')
                setErrColor('error')
                setMsg('Entered one-Time passcode is In-correct')
            } 
        }
        else{
            alert('fill all input boxes')
        }  
    }
    
    // functions sets the timer of 1 minute
    const timer =()=>{
       if(sec>0){
        sec--
        setSec(sec)
       }
    }
    
    // Function regenerates the otp random number and resets the values 
    const regenerateNum=()=>{
        if(limit>0){
            setMsg('Passcode Sent Successfully')
            setErrColor('success')
            setLimit(limit-1)
            setDisabled(true)
            setSec(5)
            props.generateNum()
        }
        else{
            setMsg('Attempt Limit Exceed')
        }
        reset()
        inpRefs.current.map((item:any)=>{
            item.value=''
        })
    }

    // Reset Function 
    const reset=()=>{
        setNumArr([])
        
        setBorder('noneBorder')
    }

  return (
    <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
            <div className='heading'>
                <Typography id="modal-modal-title" variant="h6" component="h2">Verify Email Address ({props.num})</Typography>
                <button onClick={handleClose}>Close</button>
            </div>
            <hr/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Enter Your Code Here:</Typography>
            <form className='inpDiv' onSubmit={(e)=>matchNum(e)}>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)}/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)}/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)}/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)}/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)}/>
              <button type='submit' style={{display:'none'}}></button>
            </form>
            <label className={errColor}>{msg}</label>
            <div className='resendDiv'>
              <button onClick={regenerateNum} className='button' disabled={disabled}>Resend One-time Passcode</button>
              <label>({limit} Attempts left)</label>
              <label className='error'>00:{sec}</label>
            </div>
        </Box>
    </Modal>
  );
}

export default OtpLayout