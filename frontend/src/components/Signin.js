import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { AuthContext } from "../contexts/AuthContext";
import signinService from "../services/signinComponent";
import imageUrl from "../images/loginPageImage.jpg";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    backgroundImage: "url(" + imageUrl + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { setAuthenticated } = useContext(AuthContext);
  const classes = useStyles();
  const animatedStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });

  const patterns = {
    email: /^[a-zA-Z\d]{2,}@\w{2,}\.([a-z]{2,4})$/,
    password: /^\w{8,20}$/,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyUser = async (newObject) => {
    const [isValidUser, userData] = await signinService(newObject);
    console.log(isValidUser);
    console.log(userData);
    console.log(typeof isValidUser);
    if (isValidUser === "name") {
      setErrorMessage("Invalid Email");
      setOpen(true);
    } else if (isValidUser) {
      console.log("success");
      //setUserData(userData);
      setAuthenticated(userData.email);
    } else {
      console.log("fail");
      setErrorMessage("Invalid Password");
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginObject = {
      email: email,
      password: password,
    };
    //console.log(email, password);
    if (!patterns.email.test(email)) {
      setErrorMessage("Enter a Valid Email ID");
      setOpen(true);
    } else {
      verifyUser(loginObject);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <animated.div style={animatedStyle}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
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
          </Grid>
        </Grid>
      </ThemeProvider>
    </animated.div>
  );
};

export default Signin;
