import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";
import { AuthContext } from "../contexts/AuthContext";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Header from "../components/Header";
import Home from "../components/Home";
import Explore from "../components/Explore";
import Campaign from "../components/Campaign";
import Newcampaign from "../components/Newcampaign";
import { CONTRACT_ADDRESS } from "../utils/config";
import abi from "../utils/abi";

export default function App() {
  const { auth } = useContext(AuthContext);
  //const web3 = new Web3(RPC_URL);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  window.ethereum.enable().catch((err) => {
    console.log(err);
  });
  web3.eth.getAccounts().then((res) => {
    console.log(res[0]);
  });

  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            {auth.isAuthenticated ? <Home /> : <Signin />}
          </Route>
          <Route path="/signup">
            {auth.isAuthenticated ? <Home /> : <Signup />}
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/create-campaign">
            {auth.isAuthenticated ? (
              <Newcampaign web3={web3} contract={contract} />
            ) : (
              <Signin />
            )}
          </Route>
          <Route path="/campaigns/">
            <Campaign web3={web3} contract={contract} />
          </Route>
          <Route path="/" render={() => <h1>Error 404: Page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}
