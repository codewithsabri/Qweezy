import "./RoundGame.css"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import ScrollTop from '../Layout/scrollTop';
import toast, { Toaster } from 'react-hot-toast';


const JoinGame = () => {
    const history = useHistory()
    const [roundGame, setroundGame] = useState([1, 2, 3, 4,])
    const roundApi = `${process.env.REACT_APP_API}/quizzRound`;
    const roundApiJoin = `${process.env.REACT_APP_API}/quizzRound/join`;
    const [Data, setData] = useState([]);
    const [value, setValue] = useState(555);

    const notify = () => toast.success('Votre ami  vient de se connecter', {
        icon: '🤫',
        duration: 3000,
    });

    useEffect(() => {
        notify()
    }, [])


    useEffect(async () => {
        console.log("fetech data");
        await axios
            .get(roundApi)
            .then((res) => {
                setData(res.data);
                console.log(res.data.uuid)
            })
            .catch((error) => {
                console.log(error);
            });
        return () => { };
    }, []);

    const joinRoundGame = async (identifiant)=> {
        console.log(identifiant)
        console.log(roundApiJoin)
        const id = {"id" : identifiant}
        console.log(id)
        await axios
        .post(roundApiJoin, id)
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }



    return (
        <div className="roundGame-container ">
            <Toaster position="bottom-right" />
            <div onClick={() => history.push("/CreateGame")} className="create-game"><span>Créer une partie</span></div>
            <div className="roundGame-wrapper">
                <div style={{ border: '2px #36ab9d solid', borderRadius: "25px", padding: '0.1em' }} className="  d-flex justify-content-center align-items-center mt-5 ">
                    <input   onChange={(e) => setValue(e.target.value)} style={{ borderRadius: "25px", height: '35px', marginRight: '1em', padding: '1.2em', border: 'none' }} placeholder="entrer votre code" />
                    <button style={{ margin: 0 }} className="button-rejoin">rejoins la partie</button>
                </div>
                <h4 style={{ margin: "1em", fontWeight: "700", fontSize: "1.5rem", color: "#71d2c2" }}>Liste des parties</h4>
                {Data.map((round) =>
                    <div key={round._id} className="roundGame-card" style={{ margin: 10 }} >
                        <div className="d-flex align-items-center">
                            <div><span>Difficulté {round.difficulty}</span> <span> Nombre de joueurs : 1/{round.players.length}</span></div>
                            <button onClick ={() => joinRoundGame(round._id)} className="button-secondary">joindre</button>
                        </div>
                        <div> <span>Créer par {round.user.name}</span> </div>
                        <div><span>Statut : {round.isPrivate ? 'Privée' : 'Public'}</span></div>
                        <div><span>Identifiant : {round.uuid}</span></div>
                        <div><span>Manches : {round.roundNumber}</span></div>
                    </div>
                )}
            </div>
            <ScrollTop />
        </div>
    )
}

export default JoinGame
