import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { CardHeader, Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export default function BidCard({
  image,
  name,
  description,
  category,
  createdBy,
  userId,
}) {
  const User = () => {
    console.log({ userId });
    return (
      <Tooltip title={createdBy}>
        <Link to={`user-details/${userId}`}>
          <Avatar aria-label="recipe"></Avatar>
        </Link>
      </Tooltip>
    );
  };
  return (
    <Card sx={{ maxWidth: 460 }}>
      <CardHeader avatar={<User />} title={name} subheader={category} />
      <CardMedia component="img" alt={name} height="140" image={image} />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">View more</Button>
      </CardActions>
    </Card>
  );
}
