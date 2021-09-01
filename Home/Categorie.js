import React from "react";
import "./Categorie.css";
import { useHistory } from "react-router-dom";

export default function Categorie() {
  const history = useHistory()
  const categorie = [
    "Général",
    "La prière",
    "L'unicité de Dieu",
    "L'aumone",
    "Le pelerinage",
    "Le ramadan",
    "Les prophètes",
    "Les compagnons",
    "Le Coran",
    "Les Hadiths",
    "Biographie du Prophète",
    "Femmes en islam",
  ];

  return (
    <>
      <div>
        <div className="grille-categorie">
          {categorie.map((categorie, index) => (
            <div
              key={index}
              style={{
                width: "20rem",
                height: "14rem",
              
              }}
              onClick={() => history.push("/QuizzCommunity")}
              className="card "
            >
              <div className="card-block">
                <div className="card-title">{categorie}</div>
                <p>Affichage des catégories</p>

                <button className="mef-button">Découvrir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
