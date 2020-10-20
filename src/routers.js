import React from "react";
import { connect } from "react-redux";
import { Detector } from "react-detect-offline";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {
  screenLockEnableOfflineMood,
  screenLockDisableOfflineMood,
  PageNotFound,
} from "./shared";
import { PasswordReset } from "./components";
import { AuthenticationContainer, DashboardContainer } from "./containers";
import history from "./history";
import { auth } from "./config";
import { resetSigninUserState } from "./store/actions";


class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(props, state) {
    return false
  }

  Dashboard = () => {
    const component = (
      <React.Fragment>
        {(this.props.isUserExist) ?
          <DashboardContainer />
          : <AuthenticationContainer />
        }
      </React.Fragment>
    );
    return component;
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      // const user = await generateUserDocument(userAuth);
      if (userAuth) {
        this.props.resetSigninUserState(userAuth);
      }
    });
  };

  render() {
    return (
      <div className='app-background'>
        <Detector
          render={({ online }) => {
            if (online) {
              screenLockDisableOfflineMood();
              return true;
            } else {
              screenLockEnableOfflineMood();
              return false;
            }
          }}
        />
        <div className='screen-fixed'>
          <Router history={history}>
            {/* <Header /> */}
            <Switch>
              <Route exact path='/'>
                {this.Dashboard}
              </Route>
              {/* <Route exact path='/customerdetail'>
                {(this.props.user.type || type) === "admin" ? (
                  <CustomerDetailsContainer />
                ) : (
                    <PageNotFound />
                  )}
              </Route> */}
              <Route exact path='/passwordReset'>
                <PasswordReset />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </Router>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    user: props.auth.user,
    isUserExist: props.auth.isUserExist,
  };
};
export default connect(mapStateToProps, { resetSigninUserState })(Routing);
