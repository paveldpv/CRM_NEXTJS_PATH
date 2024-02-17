"use client";
import { memo, useMemo, forwardRef, useCallback, useEffect, useState } from "react";
import { useProcessLoader } from "../../../../store/storeProcessLoader";

import Transition from "@/components/additional/TransitionWrapper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import LinearProgress from "@mui/material/LinearProgress";
import DialogTitle from "@mui/material/DialogTitle";

function ProgressLoader() {
  const [visible, setVisible, step, status, handlerCancel] = useProcessLoader((state) => [
    state.visible,
    state.setVisible,
    state.step,
    state.status,
    state.handlerCancel,
  ]);
  const [progress, setProgress] = useState(0);  

  let arrStepProgress = ()=>{
    if(step<=0)return[100]
    const stepProgress = 100 / step;
    return new Array(step).fill(0).map((el, index) => Math.round(el + stepProgress * (index+1)))
  }
  

  

  useEffect(() => {    
    const timer = setInterval(()=>{

      setProgress(oldProgress=>{
        if(oldProgress===100){         
          return 0
        }
        const diff = Math.random()*10;
        return Math.min(oldProgress+diff,arrStepProgress()[0])
      })
    },400)
    
    return ()=>{
      clearInterval(timer);
      arrStepProgress().shift()
    }  
  }, []);

  const clickCancelButton = useCallback(() => {
    setVisible(false);
    handlerCancel && handlerCancel();
  }, []);

  return (
    <>
      <Dialog TransitionComponent={Transition} keepMounted open={visible}>
        <DialogTitle>
          <span className=" text-2xl underline">{status}</span>
        </DialogTitle>
        <DialogContent>
          <LinearProgress sx={{
                  backgroundColor: "#4F5162",
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: "#F47C28"
                  }
                }} variant="determinate" value={progress} />
        </DialogContent>
        <DialogActions>
          <button onClick={clickCancelButton}>Отмена</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(ProgressLoader);
