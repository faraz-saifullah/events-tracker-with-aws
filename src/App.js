import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/homepage/Home";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Footer from "./components/footer/Footer";
import EventsList from "./components/eventsList/EventsList";
import CreateNewEvent from "./components/createEvent/CreateNewEvent";

library.add(faEdit);

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      username: null,
    };
  }

  setAuthStatus = (authenticated) => {
    this.setState({
      isAuthenticated: authenticated,
    });
  };

  setUser = (user) => {
    this.setState({
      username: user.username,
    });
  };

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        this.setAuthStatus(true);
        this.setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      username: this.state.username,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };
    return (
      this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <Home {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/events"
                  render={(props) => <EventsList {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/create"
                  render={(props) => (
                    <CreateNewEvent {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => <LogIn {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={(props) => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  render={(props) => (
                    <ForgotPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgotpasswordverification"
                  render={(props) => (
                    <ForgotPasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={(props) => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepasswordconfirmation"
                  render={(props) => (
                    <ChangePasswordConfirm {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/welcome"
                  render={(props) => <Welcome {...props} auth={authProps} />}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
