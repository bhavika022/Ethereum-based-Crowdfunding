import React, { useState, useContext } from "react";
import Colors from "../utils/ColorVariables";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
import signupService from "../services/signupComponent";

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

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { setAuthenticated } = useContext(AuthContext);

  const classes = useStyles();

  const animationStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });

  const patterns = {
    // eslint-disable-next-line
    email: /^[a-zA-Z\d]{2,}\@\w{2,}\.([a-z]{2,4})$/,
    password: /^\w{8,20}$/,
    rollnum: /^[0-9]{7}$/,
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
    setOpen(false);
  };

  const verifyUser = async (signupObject) => {
    const [result, userData] = await signupService(signupObject);
    console.log(result);
    console.log(userData);
    if (result === true) {
      setAuthenticated(userData.email);
    } else {
      setErrorMessage("Email is already registered");
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupObject = {
      userName: userName,
      email: email,
      password: password,
    };

    if (!patterns.email.test(email)) {
      setErrorMessage("Enter a Valid Email ID");
      setOpen(true);
    } else {
      verifyUser(signupObject);
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
                  Sign Up
                </Typography>
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  method="post"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="username"
                        name="userName"
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        onChange={handleUserNameChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmailChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        </ThemeProvider>
      </animated.div>
    </AuthContextProvider>
  );
};

export default SignUp;
