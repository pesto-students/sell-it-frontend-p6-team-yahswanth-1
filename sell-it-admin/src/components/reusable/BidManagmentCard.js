import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const BidManagmentCard = ({ url, title, type, description, id, createdAt }) => {
  return (
    <Card>
      <CardHeader subheader={createdAt} title={title} />
      <CardContent>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={url}
          alt={title}
        />
        <Typography>{description}</Typography>
        <Typography>{type}</Typography>
        <Link to={`/bid-details/${id}`}>
          <Button variant="text">View details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BidManagmentCard;
