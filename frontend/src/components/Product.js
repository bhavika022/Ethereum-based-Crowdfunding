import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { LinearProgress } from "@material-ui/core";
import Colors from "../utils/ColorVariables";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 275,
    height: "100%",
    backgroundColor: Colors.backgroundColor2,
    margin: "auto",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  progress: {
    marginTop: 15,
  },
}));

const Product = ({ value }) => {
  const classes = useStyles();

  return (
    <Grid key={value._id} item md={2}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Campaign
          </Typography>
          <Typography variant="h5" component="h2">
            {value.campaignName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Description
          </Typography>
          <Typography variant="body2" component="p">
            {value.campaignDes}
          </Typography>
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={(value.currentAmount / value.targetAmount) * 100}
          />
        </CardContent>
        <CardActions>
          <Button href={`campaigns/${value.campaignName}`} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
