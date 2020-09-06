import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, userProfileDocument } from "./firebase/firebase.utils";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unscbscribeFromAuth = null;
  // whenever the component mounts user obj of auth library gives us the state of user i.e loggedin or logged out.
  componentDidMount() {
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
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unscbscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUp}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
