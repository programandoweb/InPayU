import * as React from 'react';
import { Grid } from '@mui/material'
import SliderContent from './SliderContent'
import Loading from '../Loading/LoadingSlider'



function SwipeableTextMobileStepper({data}) {

  const [activeStep, setActiveStep] =   React.useState(0);
  const [items, setItems]           =   React.useState(false);
  const [view, setView]             =   React.useState("Loading");
  const maxSteps                    =   data.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  React.useEffect(()=>{
    if (data.length>0) {
      setItems(data)
      setView("Slider")
    }else if (!data) {
      setView("Loading")
    }else {
      setView(false)
    }

  },[data]);

  
  return  <>
            {
              items&&view==='Slider'?<>
                <SliderContent  items={items}
                                maxSteps={maxSteps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                handleStepChange={handleStepChange}
                                activeStep={activeStep}
                />
              </>:view==='Loading'?<Grid>
                <Loading/>
              </Grid>:<></>
            }
          </>

}

export default SwipeableTextMobileStepper;
