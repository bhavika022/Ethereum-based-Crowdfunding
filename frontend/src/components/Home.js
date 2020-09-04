import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import homePageService from "../services/getHomePageComponent";
import { AuthContext } from "../contexts/AuthContext";
import Colors from "../utils/ColorVariables";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    padding: "2vh",
    width: "80vw",
    margin: "auto",
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  card: {
    backgroundColor: Colors.backgroundColor2,
    position: "relative",
    margin: "auto",
    height: "25vh",
    width: "25vh",
    maxHeight: 400,
    maxWidth: "90%",
    borderRadius: 14,
    marginBottom: "2vh",
  },
  campaignCard: {
    width: "80%",
    borderRadius: 14,
    position: "relative",
    backgroundColor: Colors.backgroundColor2,
    margin: "auto",
    marginBottom: "5vh",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: Colors.backgroundColor3,
    },
  },
  campaignCardLink: {
    textDecoration: "none",
  },
  primaryHeading: {
    margin: "2vh",
    fontSize: 40,
    color: Colors.fontColor1,
  },
  secondaryHeading: {
    fontSize: 30,
    margin: "2vh",
    color: Colors.fontColor1,
  },
  cardTitle: {
    color: Colors.fontColor3,
    position: "absolute",
    bottom: 10,
    fontSize: 16,
  },
  campaignCardTitle: {
    color: Colors.fontColor3,
    paddingLeft: "1vh",
  },
  cardNumber: {
    color: Colors.fontColor3,
    position: "absolute",
    bottom: "30%",
    left: "10%",
    fontSize: 66,
  },
  cardNumber2: {
    color: Colors.fontColor3,
    position: "absolute",
    bottom: "30%",
    left: "5%",
    fontSize: 66,
  },
  campaignCardNumber: {
    color: Colors.fontColor3,
    paddingLeft: "2vh",
    fontSize: 30,
  },
}));

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const Home = () => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataObj = { email: auth.userName };
    homePageService(dataObj)
      .then(([status, data]) => {
        status ? setData(data) : setData([]);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.primaryHeading} variant="h4">
              Home Page
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom>
                  Total Campaigns
                </Typography>
                <Typography className={classes.cardNumber}>
                  {data.length > 1 ? data[0] : 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom>
                  Current Campaigns
                </Typography>
                <Typography className={classes.cardNumber}>
                  {data.length > 1 ? data[1] : 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom>
                  Your Campaigns
                </Typography>
                <Typography className={classes.cardNumber}>
                  {data.length > 1 ? data[2] : 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom>
                  Funding Raised
                </Typography>
                <Typography className={classes.cardNumber2}>
                  {data.length > 1 ? nFormatter(data[3][0].value, 1) : 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.secondaryHeading} variant="h5">
              Popular Campaigns
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.campaignCard}>
              <Link
                className={classes.campaignCardLink}
                to={
                  data.length > 1
                    ? `campaigns/${data[4][0].campaignName}`
                    : "home"
                }
              >
                <CardContent>
                  <Typography
                    className={classes.campaignCardTitle}
                    gutterBottom
                  >
                    {data.length > 1 ? data[4][0].campaignName : 0}
                  </Typography>
                  <Typography className={classes.campaignCardNumber}>
                    {data.length > 1 ? data[4][0].currentAmount : 0}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.campaignCard}>
              <Link
                className={classes.campaignCardLink}
                to={
                  data.length > 1
                    ? `campaigns/${data[4][1].campaignName}`
                    : "home"
                }
              >
                <CardContent>
                  <Typography
                    className={classes.campaignCardTitle}
                    gutterBottom
                  >
                    {data.length > 1 ? data[4][1].campaignName : 0}
                  </Typography>
                  <Typography className={classes.campaignCardNumber}>
                    {data.length > 1 ? data[4][1].currentAmount : 0}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.campaignCard}>
              <Link
                className={classes.campaignCardLink}
                to={
                  data.length > 1
                    ? `campaigns/${data[4][2].campaignName}`
                    : "home"
                }
              >
                <CardContent>
                  <Typography
                    className={classes.campaignCardTitle}
                    gutterBottom
                  >
                    {data.length > 1 ? data[4][2].campaignName : 0}
                  </Typography>
                  <Typography className={classes.campaignCardNumber}>
                    {data.length > 1 ? data[4][2].currentAmount : 0}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
