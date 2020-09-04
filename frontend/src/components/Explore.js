import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import getCampaignsService from "../services/getAllCampaignsComponent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  paperHeader: {
    padding: "2vh",
    margin: "auto",
    marginTop: "10vh",
    marginBottom: "5vh",
  },
  paperItems: {
    padding: "5vh",
  },
}));

const Explore = () => {
  const [campaignsData, setCampaignsData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getCampaignsService()
      .then(([status, data]) => {
        status ? setCampaignsData(data) : setCampaignsData([]);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(campaignsData);

  return (
    <div>
      <Paper className={classes.paperHeader}>
        <Typography variant="h2" align="center" gutterBottom>
          Explore
        </Typography>
      </Paper>
      <Paper className={classes.paperItems}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {campaignsData.map((value) => (
                <Product key={value._id} value={value} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Explore;
