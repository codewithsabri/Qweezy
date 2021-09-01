import React, { useEffect, useState } from 'react'
import { Form, button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from 'axios'

function CreateGame() {
    const history = useHistory()
    const roundApi = `${process.env.REACT_APP_API}/quizzRound`;
    const questionAPI = `${process.env.REACT_APP_API}/questions`;
    const [Data, setData] = useState([]);
    const [Number, setNumber] = useState([]);
    const [isPrivate, setPrivate] = useState(false);
    const [Password, setPassword] = useState("");
    const [RoundNumber, setRoundNumber] = useState(3);


    useEffect(async () => {
        console.log("fetech data");
        await axios
            .get(questionAPI)
            .then((res) => {
                setData(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(typeof RoundNumber)
        return () => { };

    }, []);





    const sendRound = async (e) => {

        // history.push("/JoinGame")
        console.log(e)
        e.preventDefault();
        const round = {
            // "players": [{ "name": "hamid", "score": 5 }, { "name": "karim", "score": 0 }],
            "difficulty": "impossible",
            "isPrivate": isPrivate,
            "password": Password,
            "report": 15,
            "roundNumber": RoundNumber,
        }

        await axios
            .post(roundApi, round)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            });


    }




    return (
        <div style={{ height: "50%", position: "relative" }} className="d-flex justify-content-center align-items-center flex-column">

            <div style={{ margin: "1em", fontWeight: "700", fontSize: "1.5rem", color: "#71d2c2" }}><span >Créer un duel</span></div>

            <Form className='d-flex justify-content-center align-items-center flex-column' style={{ textAlign: "center" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre de Manches</Form.Label>
                    <div>     <div class="form-check form-check-inline">
                        <input onChange={(e) => setRoundNumber(e.target.value)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="3" />
                        <label class="form-check-label" for="inlineRadio1">3</label>
                    </div>
                        <div class="form-check form-check-inline">
                            <input onChange={(e) => setRoundNumber(e.target.value)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="5" />
                            <label class="form-check-label" for="inlineRadio2">5</label>
                        </div></div>
                    <Form.Text className="text-muted">
                        (Trois questions par manche)
                    </Form.Text>
                </Form.Group>

                <Form.Group className="m-3 d-flex" controlId="formBasicCheckbox">
                    <p>Privé</p>
                    <label className="switch ">
                        <input onChange={() => setPrivate(!isPrivate)} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </Form.Group>

                <Form.Group style={{ display: isPrivate ? "" : "none" }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Votre code pin" maxlength="15" />
                    <Form.Text className="text-muted">
                        Choisissez un mot de passe (5 charactères minimum)
                    </Form.Text>
                </Form.Group>

                <div onClick={() => history.push("/JoinGame")} className="join-game"><span>Liste des parties</span></div>

                <button onClick={(e) => sendRound(e)} style={{ backgroundColor: 'purple' }} className="button-primary" >
                    Créer
                </button>
            </Form>
        </div>
    )
}

export default CreateGame
