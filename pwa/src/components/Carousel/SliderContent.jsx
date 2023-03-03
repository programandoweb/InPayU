import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { autoPlay } from 'react-swipeable-views-utils';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import './SliderContent.css';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const App=({items,handleNext,handleBack,handleStepChange,activeStep,maxSteps,nextButtons})=>{
  const theme                       =   useTheme();


  return <Grid container spacing={2} >
    <Grid  item xs={12} className="slider_content" sx={{pt:0}}>
      <Grid className="siguiente">
        <Button
          size="small"
          className="carousel-bottom"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          {theme.direction === 'rtl' ? (
            <ArrowBackIosNewIcon/>
          ) : (
            <ArrowForwardIosIcon/>
          )}
        </Button>

      </Grid>
      <Grid className="atras">
        <Button size="small" className="carousel-bottom" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <ArrowForwardIosIcon />
          ) : (
            <ArrowBackIosNewIcon />
          )}
        </Button>
      </Grid>
      <AutoPlaySwipeableViews
          interval={100000}
          autoPlay={false}

          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents>
            {items.map((step, index) => (
              <div key={index}>
                <Grid className="slider_item">
                  <Box
                        component="img"
                        sx={{
                        display: 'block',
                        overflow: 'hidden',
                        width: '100%',
                        }}
                        src={step.fullpath||step.image_fullurl}
                        alt={step.text}/>
                </Grid>
              </div>
            ))}
      </AutoPlaySwipeableViews>
      {nextButtons?<Grid className="content-carousel-bottom">
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              className="carousel-bottom"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {"Siguiente"}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" className="carousel-bottom" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {"Anterior"}
            </Button>
          }
        />
      </Grid>:false}
    </Grid>
  </Grid>

}

export default App
