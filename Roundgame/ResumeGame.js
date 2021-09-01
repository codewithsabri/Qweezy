import "./RoundGame.css"
import { useState } from "react";
import { useHistory } from "react-router-dom";

const JoinGame = () => {
    const history = useHistory()

    const [roundGame, setroundGame] = useState([1, 2, 3, 4,])


    return (
        <div className="roundGame-container">
            <div onClick={() => history.push("/CreateGame")} className="create-game"><span>créer une partie</span></div>
            <div className="roundGame-wrapper">
                <div className="d-flex justify-content-center align-content-center mt-5">
                    <input placeholder="entrer votre code" />
                    <button style={{ margin: 0 }} className="button-secondary">rejoins la partie</button>
                </div>
                <h4>Liste des parties</h4>
                {roundGame.map((game, idx) =>
                    <div className="roundGame-card" style={{ margin: 10 }} > <div className="d-flex align-items-baseline"><div><span>Catégorie : Les prohètes</span> <span>Nombre joueurs : 1/2</span></div><button className="button-primary">joindre</button></div>  <span>Créer par Hamdidu72</span></div>
                )}
            </div>
        </div>
    )
}

export default JoinGame
