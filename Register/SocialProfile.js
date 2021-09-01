import React from "react";
import "./Inscription.css";
import { Form } from "react-bootstrap";
import axios from "axios";

function SocialProfile() {


  const createProfile = (e) => {
    console.log("je créer un profil");
    e.preventDefault();

    const ProfilAPI = `${process.env.REACT_APP_API}/profile`;

    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(ProfilAPI, {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="social-input-wrapper">
        <Form style={{ width: "300px" }}>
          <h2 className="mef-title">Profil social</h2>
          <Form.Group controlId="text-pseudo d-flex justify-content-center">
            <Form.Label className="mef-label d-flex justify-content-center">
              Votre statut
            </Form.Label>
            <div className="d-flex justify-content-center">
              <select>
                <option value="Choisir">Etudiant</option>
                <option value="Prière">Association</option>
                <option value="Coran">Parent</option>
              </select>
            </div>
          </Form.Group>
          <Form.Group controlId="text-nom ">
            <Form.Label className="mef-label d-flex justify-content-center">
              Bio
            </Form.Label>
            <Form.Control
              // onChange={(e) => setNom(e.target.value)}
              className="mef-placeholder"
              type="text"
              as="textarea"
              rows={3}
              placeholder="Entrer une courte description"
              required
            />
          </Form.Group>


          <Form.Group controlId="formBasicCitation">
            <Form.Label className="mef-label d-flex justify-content-center">
              Votre citation préféré
            </Form.Label>
            <Form.Control
              // onChange={(e) => setPassword(e.target.value)}
              className="mef-placeholder"
              type="text"
              placeholder="écrire ici la citation"
              required
            />
            <Form.Label className="mef-label d-flex justify-content-center">
              Votre site internet
            </Form.Label>
            <Form.Control
              // onChange={(e) => setPassword(e.target.value)}
              className="mef-placeholder"
              type="text"
              placeholder="Entrer votre site"
              required
            />
          </Form.Group>

          <div className="mef-button-position">
            <button onClick={createProfile} className="button-primary">
              Valider
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SocialProfile;
