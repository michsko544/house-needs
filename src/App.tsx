import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <PublicRoute exact path="/">
          <HomePage />
        </PublicRoute>
      </Router>
    </div>
  );
}

export default App;
