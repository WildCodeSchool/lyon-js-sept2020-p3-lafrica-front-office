import "./App.css";
import CampaignsView from "./campaignsView/CampaignsView";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <CampaignsView />
      <Footer />
    </div>
  );
}

export default App;
