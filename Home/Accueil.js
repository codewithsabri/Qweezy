import React from "react";
import { useHistory } from "react-router-dom";
import "./Accueil.css";
// import logo from "./../img/Lovemydin.png";

function Accueil() {

  const history = useHistory();



  return (
    <>
      <div className="d-flex justify-content-center home-element-wrapper  ">
        <div
          className="home-element"
          style={{
            color : "#36ab9d",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ><h1>Qweezy</h1></div>
        <div style={{textAlign: "center"}} className="home-element">
          <p> Testez vos connaissances à travers plusieurs thématiques !</p>
        </div>
        <div style={{ marginBottom: 5 }} className="home-elements">
          <button onClick={ ()=> history.push("/QuizzConfig")} style = {{backgroundColor : "#36ab9d"}}className="btn-accueil">
            <span className="mef-p"> Entrainement</span>
          </button>
          <button onClick={()=> history.push("/QuizzCommunity")}  style = {{backgroundColor : "#008080"}} className="btn-accueil">
            <span className="mef-p"> Quizz Communauté</span>
          </button>
          <button onClick={()=> history.push("/JoinGame")}  style = {{backgroundColor : "#00b8e6"}} className="btn-accueil">
            <span className="mef-p"> Quizz Duel</span>
          </button>
        </div>
        <div>


        </div>
      </div>
    </>
  );
}

export default Accueil;
