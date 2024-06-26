import { useState } from "react"
import questions from './questions.jsx'

function QuizCo() {
    
    // 1) Ici on va pouvoir déclarer 2 states : un pour le score, un pour l'index de la question
    // Si on réponds bien +1 au score, sinon 0, quoi qu'il arrive des que l'on clique sur une réponse
    // on passe automatiquement à la suivante. Quand il n'y a plus de question on propose de recommencer
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0)

    // 2) Comportements / fonctions. On peut en déclarer 2 : une qui vient vérifier la réponse choisie (handleClick)
    // et qui nous ajoute, ou pas, un point de score et qui nous fait passer à la question suivante 
    // Une autre fonction (handleReset) qui gère elle le boutom recommencer. Quand on clique sur ce bouton on remet tous les compteurs à zéro

    function handleClick(option) {
        // On vient vérifier si la réponse est la bonne
        if (option === questions[index].answer) {
            setScore(score + 1)
        }
        setIndex(index + 1)
    }

    function handleReset() {
        setScore(0)
        setIndex(0)
    }

    // 3) Pour le JSX l'idée est, avec des conditions, d'afficher les question et les options (.map)
    // Tant qu'il y a des questions on les affiche, sinon on affiche le bouton de recommencer 
    return ( 
        <>
            <h1>Mon Quiz en React</h1>
            <h2>Score : {score}</h2>

            { (index < questions.length) ? 
                <div>
                    <h2>{questions[index].question}</h2>
                    <ul>{questions[index].options.map((option,index) => (
                        <button onClick={() => handleClick(option)} key={index}>{option}</button>
                    ))}</ul>
                </div>
                : <button onClick={() => handleReset()}>Recommencer</button>
            }
        </>
     );
}

export default QuizCo;