import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



export default function StepperCheckout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
       
          <Step>
            <StepLabel>
              First Step
            </StepLabel>
            <StepContent>
              <Typography>Address</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                    <div className="card-body">
                          <div className="billing-address-form">
                            <form>
                              <p>
                                <input
                                  type="text"
                                
                                  placeholder="Name"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  
                                  placeholder="Email"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                
                                  placeholder="Address"
                                />
                              </p>
                              <p style={{ display: "flex", gap: "10px" }}>
                                <input
                                  type="text"
                                  
                                  placeholder="district"
                                />
                                <input
                                  type="text"
                                 
                                  placeholder="state"
                                />
                                <input
                                  type="text"
                                  
                                  placeholder="pincode"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  
                                  placeholder="Phone"
                                />
                              </p>
                            </form>
                          </div>
                        </div>
                </Button>
                <Button
                //   disabled={}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>

      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
