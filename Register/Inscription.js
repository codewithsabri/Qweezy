import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Inscription.css";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import PropTypes from "prop-types";
import Alert from "../Layout/Alert";

import AccountSetup from "./AccountSetup";
import SocialProfile from "./SocialProfile";
import Success from "./Success";
import { useTransition, animated } from "react-spring"




const Inscription = ({ isAuthenticated }) => {
  const [step, setStep] = useState(1);


  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const transition = useTransition(() => step, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, y: 0, opacity: 0 },
    delay: 500,
    reset : true
  });

  if (isAuthenticated) {
    return <Redirect to="/Accueil" />;
  }

  function renderSwitch(step) {
    switch (step) {
      case 1:
        return <AccountSetup />;
      case 2:
        return <SocialProfile />;
      case 3:
        return <Success />;

      default:
        return <AccountSetup />;;
    }
  }

  return (
    <div>
      <>
        {transition((style, item) => item ? <animated.div style={style} >

          {renderSwitch(step)}
        </animated.div> : '')}
      </>


      {step !== 3 ? (
        <div className="mef-stepRegister">
          <button className="button-step" onClick={() => prevStep()}>
            <FaAngleLeft />
            précédent
          </button>
          <button className="button-step" onClick={() => nextStep()}>
            suivant
            <FaAngleRight />
          </button>
        </div>
      ) : null}
    </div>
  );
};

Inscription.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Inscription);
