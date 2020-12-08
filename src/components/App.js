import "./App.css";
import CreateCampaign from "./create campaign/CreateCampaign";
import CampaignsView from "./campaignsView/CampaignsView";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import SignIn from "./login/SignIn";
import Home from "./home/Home";
import SingUp from "./login/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SingUp />
          </Route>
          <Route path="/user/:id/createCampaign">
            <CreateCampaign />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
