import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AccountSetup() {
  const [Pseudo, setPseudo] = useState("");
  const [Email, setEmail] = useState("");
  const [Checkbox, setCcheckbox] = useState(false);
  const [Password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const history = useHistory()

  function onNavigateConditions() {
    history.push("/Conditions");
  }

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    const userObject = {
      pseudo: Pseudo,
      email: Email,
      password: Password,
    };

    console.log(userObject);
  };

  return (
    <div className="form-wrapper text-center">
      <Form style={{ width: "350px" , display : 'flex', flexDirection : 'column' }} noValidate validated={validated}>
        <div className="mef-title">
          <h2>Inscription</h2>
        </div>
        <Form.Group controlId="text-pseudo ">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            onChange={(e) => setPseudo(e.target.value)}
            className="mef-placeholder"
            type="text"
            placeholder="Choisissez un pseudo"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            className="mef-placeholder"
            type="email"
            placeholder="Entrer votre email"
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
          <Form.Label>Retaper votre Mot de passe</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            className="mef-placeholder"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </Form.Group>
        <Form.Group style={{marginTop : 20}} controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="J'accepte les conditions générales d'utilisation et de ventes"
            required
            onChange={(e) => setCcheckbox(!Checkbox)}
          />
          <Form.Text
            onClick={(e) => onNavigateConditions()}
            className="text-muted"
          >
            Consulter la cgv.
          </Form.Text>
        </Form.Group>
        <div className="mef-button-position">
          <button onClick={(e) => onSubmit(e)} className="button-primary">
            Valider
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AccountSetup;
