import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateCampaign from './create campaign/CreateCampaign';
import CampaignDetail from './CampaignDetail/CampaignDetails';
import CampaignsView from './campaignsView/CampaignsView';

import Footer from './footer/Footer';
import Header from './header/Header';
import SignIn from './login/SignIn';
import Home from './home/Home';
import SignUp from './login/SignUp';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/users/:user_id/createCampaign">
              <CreateCampaign />
            </Route>
            <Route exact path="/users/:user_id/campaigns">
              <CampaignsView />
            </Route>
            <Route path="/users/:user_id/campaigns/:campaign_id">
              <CampaignDetail />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
