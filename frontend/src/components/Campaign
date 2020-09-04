import React from "react";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import getCampaignService from "../services/getOneCampaignComponent";
import { AuthContext } from "../contexts/AuthContext";
import investCampaign from "../services/investCampaignComponent";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100vw",
    height: "30vh",
  },
  paper: {
    width: "75vw",
    margin: "auto",
    padding: "2em",
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
  progress: {
    marginTop: 15,
  },
  funds: {
    marginTop: 20,
    textAlign: "center",
  },
  pay: {
    marginTop: 20,
  },
}));

const Campaign = ({ web3, contract }) => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getCampaignService(window.location.pathname.split("/").pop())
      .then(([status, data]) => {
        status ? setCampaignInfo(data) : setCampaignInfo(null);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(amount)) {
      console.log(amount);
      const postData = {
        campaignName: campaignInfo.campaignName,
        amount: amount,
      };
      web3.eth.getAccounts().then((res) => {
        web3.eth
          .sendTransaction({
            from: res[0],
            to: campaignInfo.campaignAddress,
            value: web3.utils.toWei(amount, "ether"),
          })
          .then((resOne) => {
            contract.methods
              .investAmount(campaignInfo.campaignID, amount)
              .send({ from: res[0], gas: 3000000 })
              .then((resTwo) => {
                investCampaign(postData).then(([status, data]) => {
                  console.log(data);
                  if (status) {
                    setErrorMessage(`You successfully invested ${amount}`);
                    setOpen(true);
                    setCampaignInfo({
                      ...campaignInfo,
                      currentAmount: data.currentAmount,
                    });
                  }
                });
              });
          });
      });
    } else {
      setErrorMessage("Please enter a Numeric Value");
      setOpen(true);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <div>
      {campaignInfo ? (
        <div>
          <img
            src={`data:image/png;base64,${campaignInfo.campaignImage}`}
            alt="Campaign"
            className={classes.image}
          />
          <Paper className={classes.paper} elevation={5}>
            <Grid container>
              <Grid className={classes.grid} item xs={12}>
                <Typography variant="h4" className={classes.title}>
                  {campaignInfo.campaignName}
                </Typography>
                <hr />
                <Typography variant="body1" className={classes.description}>
                  {campaignInfo.campaignDes}
                </Typography>
                <LinearProgress
                  className={classes.progress}
                  variant="determinate"
                  value={
                    (campaignInfo.currentAmount / campaignInfo.targetAmount) *
                    100
                  }
                />
              </Grid>
              <Grid className={classes.funds} item xs={12}>
                <Typography variant="h6" className={classes.currentAmount}>
                  {campaignInfo.currentAmount}
                </Typography>
                <Typography variant="body1" className={classes.targetAmount}>
                  raised out of {campaignInfo.targetAmount}
                </Typography>
              </Grid>
              {auth.isAuthenticated ? (
                <Grid item className={classes.pay} xs={12}>
                  <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    method="post"
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="amount"
                      label="Amount"
                      name="amount"
                      autoComplete="amount"
                      onChange={handleAmountChange}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Pay
                    </Button>
                  </form>
                </Grid>
              ) : (
                React.Fragment
              )}
            </Grid>
          </Paper>
        </div>
      ) : (
        <React.Fragment />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={errorMessage}
        variant="success"
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default Campaign;
