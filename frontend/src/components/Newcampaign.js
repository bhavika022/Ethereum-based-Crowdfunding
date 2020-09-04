import React, { useState, useContext } from "react";
import Colors from "../utils/ColorVariables";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
import newCampaignService from "../services/newCampaignComponent";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: Colors.backgroundColor1,
    },
  },
  card: {
    marginTop: theme.spacing(16),
    minWidth: 325,
    padding: theme.spacing(4),
    backgroundColor: Colors.backgroundColor2,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  formControl: {
    minWidth: 335,
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: Colors.fontColor1,
    },
  },
});

const Newcampaign = ({ web3, contract }) => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDes, setCampaignDes] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Upload Image");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  const classes = useStyles();

  const animationStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });

  const patterns = {
    // eslint-disable-next-line
    targetamount: /^[0-9]{3,}$/,
  };

  const handleCampaignNameChange = (e) => {
    setCampaignName(e.target.value);
  };

  const handleCampaignDesChange = (e) => {
    setCampaignDes(e.target.value);
  };

  const handleTargetAmountChange = (e) => {
    setTargetAmount(e.target.value);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(file);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
    setOpen(false);
  };

  const verifyCampaign = async (campaignObject) => {
    web3.eth.getAccounts().then((res) => {
      contract.methods
        .createTask(campaignName, targetAmount)
        .send({
          from: res[0],
          gas: 3000000,
        })
        .then((resOne) => {
          console.log(resOne);
          contract.methods.taskCount().call((err, resTwo) => {
            contract.methods.tasks(resTwo).call((err, resThree) => {
              campaignObject.append("campaignID", resThree.id);
              campaignObject.append("campaignAddress", res[0]);
              newCampaignService(campaignObject).then(([status, data]) => {
                if (status === "success") {
                  setErrorMessage("Campaign Successfully Created");
                  setOpen(true);
                } else {
                  setErrorMessage("Campaign Name is already in use");
                  setOpen(true);
                }
              });
            });
          });
        })
        .catch((err) => {
          setErrorMessage(err);
          setOpen(true);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("campaignDes", campaignDes);
    formData.append("targetAmount", targetAmount);
    formData.append("email", auth.userName);
    formData.append("file", file);

    if (!patterns.targetamount.test(targetAmount)) {
      setErrorMessage("Enter a Valid Amount");
      setOpen(true);
    } else {
      verifyCampaign(formData);
    }
  };

  return (
    <AuthContextProvider>
      <animated.div style={animationStyle}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  New Campaign
                </Typography>
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  method="post"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="cname"
                        name="campaignName"
                        variant="outlined"
                        required
                        fullWidth
                        id="campaignName"
                        label="Campaign Name"
                        onChange={handleCampaignNameChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="campaignDes"
                        label="Campaign Description"
                        name="campaignDes"
                        autoComplete="cDes"
                        onChange={handleCampaignDesChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="targetAmount"
                        label="Target Amount"
                        name="targetAmount"
                        autoComplete="targetAmount"
                        onChange={handleTargetAmountChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <label htmlFor="imageFile">
                          <input
                            type="file"
                            id="imageFile"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outlined"
                            fullWidth
                            required
                            component="span"
                          >
                            {fileName}
                          </Button>
                        </label>
                      </div>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create
                  </Button>
                </form>
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
            </Card>
          </Container>
        </ThemeProvider>
      </animated.div>
    </AuthContextProvider>
  );
};

export default Newcampaign;
