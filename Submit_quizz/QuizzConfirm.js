import React from 'react'

function QuizzCreate() {


    function Submit() {
        const [Question_name, setQuestion_name] = useState("");
        const [Explanation, setExplanation] = useState("");
        const [Category, setCategory] = useState("");
        const [Quizz_create, setQuizzCreate] = useState(false);
        const [QuizzTitle, setQuizzTitle] = useState("");
        const [QuizzDescription, setQuizzDescription] = useState("");
        const [QuizzCategory, setQuizzCategory] = useState("");

        // Création des Questions dans la table question
        const [Question, setQuestion] = useState({
            title: "",
            explanation: "",
            category: "",
            author: "eee",
            source: "eeee",
            propositions: [
                {
                    proposition: "Ecrire ici la bonne réponse",
                    answers: 0,
                    correct: true,
                },
                { proposition: "Autre proposition", answers: 0, correct: false },
                { proposition: "Autre proposition", answers: 0, correct: false },
                { proposition: "Autre proposition", answers: 0, correct: false },
            ],
        });
        const [QuestionList, setQuestionList] = useState([]);
        const [QuestionId, setQuestionId] = useState([]);
        const [Quizz, setQuizz] = useState({
            title: "A remplir",
            category: "A remplir",
            difficulty: "1",
            description: "A remplir",
            source: "A spécifier",
            number: 99,
            question: [],
        });

        // Push des ids des questions dans le localstarage

        useEffect(() => {
            if (localStorage.getItem("Questionliste") === null) {
            } else {
                const liste = JSON.parse(localStorage.getItem("Questionliste"));
                setQuestionList(liste);
            }

            return () => { };
        }, []);

        let eQuestion = { ...Question };

        let eQuizz = { ...Quizz };

        // Update des propositions dans l'object eQuestion

        const AddProposition = (e, question, idx) => {
            eQuestion.propositions[idx].proposition = e;
        };

        // Suppression d'une question la barre latérale
        const ModifyQuestion = (question, idx) => {
            console.log("question a modifier");
            setQuestion(question);
            console.log(question);
        };
        const RemoveQuestion = (question, idx) => {
            console.log(question + idx);

            if (
                window.confirm(
                    `Etes vous sur de vouloir supprimer la question "${question.title} " ?`
                ) === true
            ) {
                QuestionList.splice(idx, 1);
                const liste = JSON.parse(localStorage.getItem("Questionliste"));
                liste.splice(idx, 1);
                localStorage.setItem("Questionliste", JSON.stringify(liste));
                setQuestionList(liste);

                console.log(liste);
            } else {
                console.log("question non supprimée");
            }
        };

        // Ajout d'une question la barre latérale

        const addQuestion = async (e) => {
            e.preventDefault();

            console.log(Quizz);

            eQuestion.title = Question_name;
            eQuestion.explanation = Explanation;
            eQuestion.category = Category;

            const isValid = await questionSchema.isValid(eQuestion);

            if (isValid) {
                QuestionList.push(eQuestion);
                localStorage.setItem("Questionliste", JSON.stringify(QuestionList));
                document.location.reload();
                setQuestion_name("");
                setExplanation("");
                setCategory("");
            } else {
                window.alert("Merci de remplir tous les champs");
            }
        };

        const modifyQuestion = async (e) => {
            e.preventDefault();
            console.log("modifier question");
        };

        // Vérification du Quizz avant validation

        const onCheckQuizz = (e) => {
            e.preventDefault();
            eQuizz.title = QuizzTitle;
            eQuizz.category = QuizzCategory;
            eQuizz.description = QuizzDescription;
            eQuizz.question = QuestionId;

            console.log(eQuizz, "equizz soumission quizz");

            setQuizz(eQuizz);
            console.log(Quizz, "Quizz soumission quizz");
        };

        // Envois du Quizz dans la base de données

        const onSubmitQuizz = (e) => {
            e.preventDefault();

            const QuizzAPI = `${process.env.REACT_APP_API}/quizz`;

            axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
            axios
                .post(QuizzAPI, Quizz)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        // Envois des questions dans la base de donnée

        const onSubmitQuestion = (e) => {
            if (QuestionList.length > 4) {
                const questionsApi = `${process.env.REACT_APP_API}/questions/multiple`;

                // Send questions to databse and get their ids => Questionid
                axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
                axios
                    .post(questionsApi, QuestionList)
                    .then((res) => {
                        const Idliste = res.data;

                        for (let i = 0; i < Idliste.length; i++) {
                            // QuestionId.push(Idliste[i]._id);
                            setQuestionId((QuestionId) => [...QuestionId, Idliste[i]._id]);
                        }
                        eQuizz.question = QuestionId;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                //N'update pas le Quizz de manière immédiate

                // Send the quizz to the database with array of questions ids

                localStorage.removeItem("Questionliste");
                console.log(eQuizz, "apres soumission des questions dans bdd");
                setQuizzCreate(!Quizz_create);

                // document.location.reload();
            } else {
                window.alert(
                    "Un minimum de 5 questions est requis pour valider le quizz"
                );
            }
        };
        return (
            <div>
                <>
                    <div className="quizz-details">
                        <h5>
                            Pour terminer Merci de donner quelques détails sur votre quizz !
                        </h5>
                    </div>
                    <div className="quizz-finish">
                        <div className="quizz-finish">
                            <Form className="mef-form text-center">
                                <h3 className="titre-quizz">Créer un Quizz!</h3>
                                <Form.Group controlId="text">
                                    <Form.Label>Titre de mon Quizz</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="mef-placeholder"
                                        type="text"
                                        placeholder="Entrez le titre de votre quizz "
                                        onChange={(e) => setQuizzTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="text">
                                    <div className="text-center">
                                        <h6>Choisissez une catégorie</h6>
                                        <select onChange={(e) => setQuizzCategory(e.target.value)}>
                                            <option value=""></option>
                                            <option value="Prière">Prière</option>
                                            <option value="Coran">Coran</option>
                                            <option value="Prophète">Prophète</option>
                                            <option value="Ramadan">Ramadan</option>
                                        </select>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="text">
                                    <Form.Label>Description de mon Quizz</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="mef-placeholder"
                                        type="text"
                                        placeholder="Entre une description de votre Quizz"
                                        onChange={(e) => setQuizzDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="mef-button-position">
                                    <Button
                                        onClick={(e) => onCheckQuizz(e)}
                                        type="submit"
                                        className="btn-success m-2"
                                    >
                                        Valider mon Quizz
                                    </Button>
                                    <Button
                                        onClick={(e) => onSubmitQuizz(e)}
                                        type="submit"
                                        className="btn-danger m-2"
                                    >
                                        Terminer
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>


                </>
            </div>
        );
    }
}


export default QuizzCreate
