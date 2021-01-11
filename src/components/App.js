import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import CreateCampaign from './create campaign/CreateCampaign';
import CampaignDetail from './CampaignDetail/CampaignDetails';
import Footer from './footer/Footer';
import Header from './header/Header';
import SignIn from './login/SignIn';
import Home from './home/Home';
import SignUp from './login/SignUp';
import CampaignsView from './campaignsView/CampaignsView';
import UserContextProvider from '../context/UserContext';

function App() {
  return (
    <ToastProvider placement="top-center">
      <UserContextProvider>
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
                <Route
                  path="/users/:user_id/createCampaign"
                  component={CreateCampaign}
                />
                <Route path="/users/:user_id/campaigns/:campaign_id">
                  <CampaignDetail />
                </Route>
                <Route
                  path="/users/:user_id/campaigns"
                  component={CampaignsView}
                />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      </UserContextProvider>
    </ToastProvider>
  );
}

export default App;
