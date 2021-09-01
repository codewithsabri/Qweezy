import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import axios from "axios";

const Reset = () => {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const { id } = useParams();
    let history = useHistory()

    const resetPassword = (e) => {

        const data = { password: password }
        e.preventDefault();
        axios
            .patch(`${process.env.REACT_APP_API}/api/auth/reset/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    history.push("/Connexion");
                })
                .catch((error) => {
                    console.log(error);
                });

    }


    return (
        <div style={{ marginTop: "25px", }} className="d-flex justify-content-center align-content-center">
            <Form   >
                <p>{id}</p>
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Nouveau mot de passe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Retapez le nouveau mot de passe</Form.Label>
                    <Form.Control onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Nouveau mot de passe" />
                </Form.Group>

                <button style={{ margin: 'auto' }} onClick={(e) => resetPassword(e)} className="button-primary" type="submit">
                    Valider
                </button>
            </Form>
        </div>
    )
}

export default Reset
