import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, userProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
class App extends React.Component {
  unscbscribeFromAuth = null;
  // whenever the component mounts user obj of auth library gives us the state of user i.e loggedin or logged out.
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unscbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //this.setState({ currentUser: user });
      // userProfileDocument(user);
      // console.log(user);

      //now we want to store user data into our state
      if (userAuth) {
        const userRef = await userProfileDocument(userAuth);

        //now we have to check whether user data is present in DB or not if yes we are accessing it
        userRef.onSnapshot((snapshot) => {
          //here basically i am filtering out the required data that i want in my state form the DB
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unscbscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUp}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  //dispatch will take an action obj as an input thatit will later trigger
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
