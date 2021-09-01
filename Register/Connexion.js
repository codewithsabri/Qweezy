import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Alert from "../Layout/Alert";
import { connect } from "react-redux";
import { connexion } from "../actions/auth";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from "./ForgotPassword";

import "./Connexion.css";



const notify = () => toast.success('connexion réussis.', {
  duration: 4000,
});


const Connexion = ({ connexion, isAuthenticated }) => {
  const [Pseudo] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [Forgot, setForgot] = useState(false);

  const history = useHistory()

  const onNavigateConditions = () => {
    history.push("/Inscription");
  };

  const onNavigateForgotPassword = () => {
    history.push("/ForgotPassword");
  };




  const onSubmit = (e) => {
    const form = e.currentTarget;


    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);

      const userObject = {
        pseudo: Pseudo,
        email: Email,
        password: password,
      };

      console.log(userObject);
      connexion({ userObject });

      e.preventDefault();
      notify()


    }
  };

  // Redirect if logged console.log(require('util').inspect(, { depth: null }));

  if (isAuthenticated) {


    return <Redirect to="/Accueil" />





  }

  return (
    <>


      {!Forgot ? (
        <div>
          <Toaster />
          <Alert />
      
          <div className="mef-connexion text-center">
            <Form style={{ width: "350px" }} noValidate validated={validated}>
              <div className="mef-title">
                <h2>Connexion</h2>
              </div>
              <Form.Group controlId="text">
              <p><b>Login:</b> codewithsabri@gmail.com  </p>
              <p><b>password :</b> test123</p>
                <Form.Label>Pseudo ou Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  className="mef-placeholder"
                  type="email"
                  placeholder="Entrer votre pseudo ou votre email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  className="mef-placeholder"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
              </Form.Group>
              <div className="mef-button-position">
                <button onClick={(e) => onSubmit(e)} className="button-primary">
                  Connexion
                </button>
              </div>
              <span>
                <h6>Pas encore inscris?</h6>
                <p onClick={() => onNavigateConditions()}>S'inscrire ici</p>
              </span>
              <span>
                <p><i onClick={() => onNavigateForgotPassword()}>  Mot de passe oublié?</i></p>
              </span>
            </Form>
          </div>
        </div>
      ) : <ForgotPassword />}

    </>
  );
};

Connexion.propTypes = {
  connexion: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { connexion })(Connexion);
