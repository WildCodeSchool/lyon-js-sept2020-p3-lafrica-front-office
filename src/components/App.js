import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import SignIn from './login/SignIn';

import SingUp from './login/SignUp';

function App() {
  return (
    <div className='App'>
      <Header />
      <SignIn />
      <SingUp />
      <Footer />
    </div>
  );
}

export default App;
