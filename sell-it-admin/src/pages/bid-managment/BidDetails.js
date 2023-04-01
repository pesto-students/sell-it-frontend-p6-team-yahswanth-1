import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  DialogActions,
  Box,
  Input,
  Grid,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  FormGroup,
} from "@mui/material";
import PropTypes from "prop-types";

import { getProductById } from "../../api/products";
import ImageSlider from "../../components/reusable/Stepper";
import Stepper from "../../components/Stpper";

import NotFound from "../../assets/img/no-document.png";
import { addNewBid } from "../../api/products";
import { Label } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { Title } from "../../components/reusable/Title";

function SimpleDialog(props) {
  const { onClose, onBidSubmit, open } = props;
  const [val, setVal] = useState("");
  const handleClose = () => {
    onClose();
  };

  const onSubmit = () => {
    onBidSubmit(val);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        padding: 4,
      }}
    >
      <DialogTitle>Set backup account</DialogTitle>
      <Box>
        <FormGroup>
          <Label> New value </Label>
          <Input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </FormGroup>
      </Box>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit}>
          Submit bid
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const BidDetails = () => {
  const [details, setDetails] = useState({
    images: [],
    title: "",
    createdAt: "",
    _id: "",
  });
  const [show, setShow] = useState(false);
  const loc = useParams();
  const { bidId } = loc;

  const getProduct = (id) => {
    getProductById(bidId)
      .then((res) => {
        setDetails(res.data?.response?.product);
        console.log(res.data?.response?.product);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (bidId) {
      getProduct(bidId);
    }
  }, [bidId]);

  const suggestBid = () => {
    setShow(true);
  };

  const onSubmit = (val) => {
    addNewBid({
      productId: details?._id,
      offeredAmount: val,
    })
      .then((res) => {
        toast.success("New bid submitted");
        getProduct(details?._id);
      })
      .catch((err) => console.log(err));
  };

  const images = details
    ? details?.images?.map((i, id) => ({
        lebel: `Image ${id}`,
        imgPath: i.uri,
      }))
    : [];

  return (
    <div>
      <Box>
        <Title text="Bid details" />
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Grid container>
            <Grid
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6">{details?.title}</Typography>
                <Typography color={"gray"} variant="subtitle2">
                  {details?.createdAt
                    ? new Date(details?.createdAt).toLocaleString()
                    : ""}
                </Typography>
              </Box>
              <Button variant="contained" onClick={suggestBid}>
                Suggest a new bid
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              {images.length > 0 && <ImageSlider images={images} />}
            </Grid>
            <Grid item xs={6}>
              {details?.description}
            </Grid>
            <Grid
              sx={{
                marginY: 2,
              }}
              item
              xs={8}
            >
              <Typography
                variant="h6"
                color={"gray"}
                sx={{
                  marginBottom: 2,
                }}
              >
                Bid History
              </Typography>
              {details?.bidHistory?.length > 0 ? (
                <Stepper history={details?.bidHistory} />
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Alert severity="info">No history found</Alert>
                    <img
                      alt="bid-history"
                      src={NotFound}
                      style={{
                        width: "20%",
                      }}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h6"></Typography>
      </Box>
      <SimpleDialog
        open={show}
        onClose={() => setShow(false)}
        onBidSubmit={onSubmit}
      />
    </div>
  );
};

export default BidDetails;
