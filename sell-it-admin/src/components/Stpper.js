import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { bidStatus } from "../Constants";
import { Alert } from "@mui/material";

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

                  <Typography variant="caption" gutterBottom color="gray">
                    {new Date(label?.updatedAt).toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>Bid creator : {label?.bidCreator?.name}</Box>
                    <Box>Value : {label?.newValue}</Box>
                  </Box>
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
