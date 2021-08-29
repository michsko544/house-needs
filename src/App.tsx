import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import HomematesNeedsPage from "views/HomematesNeedsPage";
import LoginPage from "views/LoginPage";
import RegisterPage from "views/RegisterPage";
import PrivateRoute from "components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <PrivateRoute exact path="/">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/homemates-needs">
          <HomematesNeedsPage />
        </PrivateRoute>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/register">
          <RegisterPage />
        </PublicRoute>
      </Router>
    </div>
  );
}

export default App;
