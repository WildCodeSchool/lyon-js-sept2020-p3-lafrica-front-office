import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import CreateCampaign from './create campaign/CreateCampaign';
import CampaignDetail from './CampaignDetail/CampaignDetails';
import Footer from './footer/Footer';
import Header from './header/Header';
import SignIn from './login/SignIn';
import ForgetPassword from './login/ForgetPassword';
import ResetPassword from './login/ResetPassword';
// import Home from './home/Home';
import SignUp from './login/SignUp';
import CampaignsView from './campaignsView/CampaignsView';
import ContactsView from './create campaign/subcomponents/ContactsView';
import UserContextProvider from '../context/UserContext';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <ToastProvider placement="top-center">
      <Router>
        <UserContextProvider>
          <div className="app">
            <Header />
            <main>
              <Switch>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/forgot" component={ForgetPassword} />
                <Route path="/reset/:token" component={ResetPassword} />
                <ProtectedRoute
                  path="/campaigns/create/:campaign_id"
                  component={CreateCampaign}
                />

                <ProtectedRoute
                  path="/campaigns/:campaign_id"
                  component={CampaignDetail}
                />

                <ProtectedRoute exact path="/" component={CampaignsView} />
                <ProtectedRoute
                  path="/users/:user_id/contacts"
                  component={ContactsView}
                />
              </Switch>
            </main>
            <Footer />
          </div>
        </UserContextProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;
