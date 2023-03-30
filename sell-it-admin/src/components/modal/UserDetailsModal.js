import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

import VerticalTabs from "../reusable/VerticalTabs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  height: 400,
};
export const UserDetailsModal = ({ open, handleClose, data }) => {
  const {
    name,
    email,
    role,
    mobile,
    identityProofImageUri,
    addressLine1,
    landmark,
    city,
    state,
    zipCode,
    country,
    bankAccountNumber,
    ifscCode,
    customerId,
    accountHolderName,
    fundAccountId,
    isReported,
    otp,
    otpExpiry,
    tempMobile,
    updateMobileOtp,
    updateMobileOtpExpiry,
    reasonForReporting,
    UPI,
  } = data;

  const tabs = [
    {
      label: "Personal details",
      component: (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle1">Name:</Typography>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Role:</Typography>
              <Typography variant="body1">{role}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Mobile:</Typography>
              <Typography variant="body1">{mobile}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Identity Proof Image:</Typography>
              <Typography variant="body1">{identityProofImageUri}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Address Line 1:</Typography>
              <Typography variant="body1">{addressLine1}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Landmark:</Typography>
              <Typography variant="body1">{landmark}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">City:</Typography>
              <Typography variant="body1">{city}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">State:</Typography>
              <Typography variant="body1">{state}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Zip Code:</Typography>
              <Typography variant="body1">{zipCode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Country:</Typography>
              <Typography variant="body1">{country}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Bank Account Number:</Typography>
              <Typography variant="body1">{bankAccountNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">IFSC Code:</Typography>
              <Typography variant="body1">{ifscCode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Customer ID:</Typography>
              <Typography variant="body1">{customerId}</Typography>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Bank details",
      component: <></>,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
          </Grid>
        </Grid>
        <VerticalTabs tabs={tabs} />
      </Box>
    </Modal>
  );
};
UserDetailsModal.propTypes = {
  opne: PropTypes.bool,
  handleClose: PropTypes.func,
  data: {
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.number,
    mobile: PropTypes.number,
    identityProofImageUri: PropTypes.string,
    addressLine1: PropTypes.string,
    landmark: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
    bankAccountNumber: PropTypes.string,
    ifscCode: PropTypes.string,
    customerId: PropTypes.string,
    accountHolderName: PropTypes.string,
    fundAccountId: PropTypes.string,
    isReported: PropTypes.bool,
    otp: PropTypes.string,
    otpExpiry: PropTypes.string,
    tempMobile: PropTypes.string,
    updateMobileOtp: PropTypes.string,
    updateMobileOtpExpiry: PropTypes.string,
    reasonForReporting: PropTypes.string,
    UPI: PropTypes.string,
  },
};
