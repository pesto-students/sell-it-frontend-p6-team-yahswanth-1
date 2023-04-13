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
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { getProductById } from "../../api/products";
import ImageSlider from "../../components/reusable/Stepper";
import Stepper from "../../components/Stpper";

import NotFound from "../../assets/img/no-document.png";
import { addNewBid, updateBid } from "../../api/products";
import { Label } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { Title } from "../../components/reusable/Title";
import { productBidStatus } from "../../Constants";

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
      <DialogTitle>New Bid</DialogTitle>
      <Box
        sx={{
          paddingX: 4,
          marginY: 2,
        }}
      >
        <FormGroup>
          <TextField
            label="New price"
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </FormGroup>
      </Box>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!val || val.length === 0}
        >
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
  const acceptBid = () => {
    const body = {
      bidId: details?._id,
      status: productBidStatus["ACCEPTED"],
      offeredAmount: 100,
      notes: "string",
    };
    updateBid(body)
      .then((res) => {
        toast.success("Bid accepted");
      })
      .catch((err) => console.log(err));
  };

  const rejectBid = () => {
    const body = {
      bidId: details?._id,
      status: productBidStatus["REJECTED"],
      offeredAmount: 100,
      notes: "string",
    };
    updateBid(body)
      .then((res) => {
        toast.success("Bid rejected");
      })
      .catch((err) => console.log(err));
  };

  const BidSuggestArea = () => {
    const userData = JSON.parse(localStorage.getItem("admin"));
    const userId = userData?.user?._id;
    if (details?.bidHistory?.length === 0) {
      return (
        <Button
          endIcon={<LocalOfferIcon />}
          variant="contained"
          onClick={suggestBid}
          size="small"
        >
          Suggest a new bid
        </Button>
      );
    } else if (
      details?.bidHistory?.length > 1 &&
      details?.createdBy === userId
    ) {
      return (
        <Box>
          <Button variant="contained" color="success" onClick={acceptBid}>
            Accept
          </Button>
          <Button variant="outlined" color="danger" onClick={rejectBid}>
            Reject
          </Button>
          <Button variant="contained" color="primary" onClick={suggestBid}>
            Modify
          </Button>
        </Box>
      );
    } else {
      return <></>;
    }
  };

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
              <Box>
                <BidSuggestArea />
              </Box>
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
              <Box>Brand: {details?.brand}</Box>
              <Box>
                Description :<p>{details?.description}</p>
              </Box>
              <Box>Pickup Address : {details?.pickupAddress}</Box>
              <Box>Purchased Year : {details?.purchasedYear}</Box>
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
