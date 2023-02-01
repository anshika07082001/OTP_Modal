import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

type OtpProps={
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    num:number,
    setNum:React.Dispatch<React.SetStateAction<number>>,
    generateNum:()=>void
}

const OtpLayout = (props:OtpProps) => {
    
    const handleClose = () => props.setOpen(false);
    var [numArr,setNumArr]=useState<any>([])
    var [border,setBorder]=useState('noneBorder')
    var [errColor,setErrColor]=useState('')
    var [disFlag,setDisFlag]=useState<boolean>(false)
    var [msg,setMsg]=useState('')
    var [min,setMin]=useState(0)
    var [sec,setSec]=useState(59)
    const inpRefs = useRef<any>([])
    useEffect(()=>{
        
    },[])

    const matchNum=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(numArr.length==5){
            if(parseInt(numArr.join(''))==props.num){
                setBorder('succesBorder')
                setErrColor('success')
                setMsg('Matched successfully')
                setInterval(()=>{
                    props.setOpen(false)
                },1000)
            }     
            else{
                setBorder('errorBorder')
                setErrColor('error')
                // setDisFlag(true)
                setMsg('Entered one-Time passcode is In-correct')
                timer()
                setInterval(()=>{
                    setDisFlag(true)
                },1000)
            } 
        }
        else{
            alert('fill all input boxes')
        }  
    }

    const timer =()=>{
        for(var i=0 ;i<=59;i++){
            console.log(i)
            if(min==0){
                setInterval(()=>{
                    setSec(sec-1)
                },1000)
            }
        }
    }

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

    const regenerateNum=()=>{
        setNumArr([])
        props.generateNum()
        setBorder('noneBorder')
        setMsg('Passcode Sent Successfully')
        setErrColor('success')
        inpRefs.current=[]
    }

  return (
    <div>
      <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
            <div className='heading'>
                <Typography id="modal-modal-title" variant="h6" component="h2">Verify Email Address ({props.num})</Typography>
                <button onClick={handleClose}>Close</button>
            </div>
            <hr/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Enter Your Code Here:</Typography>
            <form className='inpDiv' onSubmit={(e)=>matchNum(e)}>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)} pattern="\d{1}"/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)} pattern="\d{1}"/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)} pattern="\d{1}"/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)} pattern="\d{1}"/>
              <input type='number' onChange={(e)=>inpHandler(e)} className={border} ref={(r)=>inpRefs.current.push(r)} pattern="\d{1}"/>
              <button type='submit' style={{display:'none'}}></button>
            </form>
            <label className={errColor}>{msg}</label>
            <div className='resendDiv'>
              {disFlag?
              <button onClick={regenerateNum} className='button'>Resend One-time Passcode</button>:<></>}
              <label>(Attempts left)</label>
              <label>{min}:{sec}</label>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default OtpLayout