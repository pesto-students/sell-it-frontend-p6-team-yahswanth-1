import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { bidStatus } from "../Constants";

export default function HorizontalStepperWithError(props) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Stepper activeStep={props?.history?.length}>
        {props.history.map((label, index) => {
          return (
            <Step key={label._id}>
              <StepLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {bidStatus[label?.bidStatus]}

                  <Typography variant="body2" color="gray">
                    {new Date(label?.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
