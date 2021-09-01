import React, { useEffect } from "react";
import "./App.css";
import Footer from "./Navigation/Footer";
import Routage from "./Navigation/Routage";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// import * as firebase from "firebase";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  const result = 1 + 2

  console.log(result)

  console.log(new Date())
  return (
    <Provider store={store}>
      <div >
        <Routage>
        </Routage>
      </div>
    </Provider>
  );
}

export default App;
