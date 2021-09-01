import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./QuizzCommunity.css";
import Quizz from "../Quizz/Quizz";
import ScrollTop from '../Layout/scrollTop';



import axios from "axios";


function QuizzCommunity() {

  const [data, setData] = useState([]);
  const [start] = useState(false);
  const [numero] = useState();
  const [value, setValue] = useState("");

  const history = useHistory()

  useEffect(() => {
    const QuizzApi = `${process.env.REACT_APP_API}/quizz`;
    axios
      .get(QuizzApi)
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
        // console.table(res.data);
        // console.log(res.data[0].question)
      })
      .catch((error) => {
        console.log(error);
      });

    return () => { };
  }, []);



  function onNavigateQuizz(quizz) {
    console.log(quizz)
    history.push(`Quizz/${quizz.uuid}`);
  }




  return (
    <>
      {start === true ? (
        <div>
          {/* <h3>Vous pouvez ici configurez votre quizz</h3> */}
          <div>
            <Quizz quizzs={data[numero].question} />
          </div>

        </div>
      ) : (
        <div>
          <div className="row justify-content-center">
            <div className="col-12 text-center mt-5 ">
              <div>
                <input
                  style={{
                    width: "300px",
                    margin: "5px",
                    padding: "20",
                    height: "50px",
                    borderColor: "rgb(63, 177, 163)",
                  }}
                  type="text"
                  placeholder="Entrez l'identifiant du Quizz recherché ..."
                  onChange={(e) => setValue(e.target.value)}
                />

              </div>
            </div>
          </div>

          <div className="grille mt-5 ">
            {data
              .filter((quizz) => quizz.uuid.toLowerCase().includes(value))
              .map((quizz, index) => (
                <div
                  key={index}
                  className="card text-center"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <div className="cards-header">
                    Catégorie : {quizz.category}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{quizz.title}</h5>
                    <p className="card-text">{quizz.description} </p>
                    <p>crée par : </p>
                    <p>Vues : 87500 fois</p>
                    <p>identifiant : {quizz.uuid}</p>
                    <div className="play-count">
                      <p>Joué : 2750 fois </p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => onNavigateQuizz(quizz)}
                      className="button-primary "
                    >
                      Commencer
                    </button>

                  </div>
                </div>
              ))}
          </div>
          <ScrollTop/>
        </div>
      )}
    </>
  );
}

export default QuizzCommunity;
