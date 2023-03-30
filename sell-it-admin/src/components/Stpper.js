import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

export default function HorizontalStepperWithError(props) {
  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1}>
        {props.history.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label._id}>
              <StepLabel {...labelProps}>{label._id}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
