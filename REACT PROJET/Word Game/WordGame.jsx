import { useState, useEffect } from 'react'

// Word Game 

// À chaque fois 2 lettres sont suggerées 

// On doit trouver un mot le plus rapidement possible avec ces 2 lettres 

// On a 20 secondes pour trouver un maximum de mots 

// Il va falloir une API type dictionnaire (ici dictionnary.json dans le dossier public). 

// Et il faudrait se baser sur des mots de cette API pour afficher nos 2 lettres.

function WordGame() {
    // Ici nos différents State
    const [value, setValue] = useState('')
    const [letters, setLetters] = useState('')
    const [guess, setGuess] = useState('')
    const [error, setError] = useState('')
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(20)
    const [timeout, setTimeout] = useState(20000)

    let findWordApi = `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`

    // On vient fetch le fichier du dico situé dans le dossier public
    useEffect(() => {
        fetch('dictionary_alpha_arrays.json')
        .then(res => res.json())
        .then(data => {
            // Je récupère un Objet correspondant à tous le smots d'une lettre 
            let randomLetter = data[(Math.floor(Math.random() * 26))]

            // Je transforme cet objet en Tableau 
            let array = Object.keys(randomLetter)

            let random = Math.floor(Math.random() * array.length)

            // Je récupère un mot aléatoire
            let randomWord = array[random]

            // Cas ou c'est un mot d'une lettre ou alors qu'il contient un espace 
            if (randomWord.length === 1 || randomWord.includes(' ')) {
                randomWord = array[random + 1]
            }

            // Si jamais le mot au hasard n'a que deux lettres
            if (randomWord.length === 2) {
                let letters = randomWord
                console.log(letters)

                setLetters(letters)

            } else {
                let begin = Math.floor(Math.random() * (randomWord.length - 1))

                let letters = randomWord.slice(begin, (begin + 2))
                console.log(letters)

                setLetters(letters)
            }
        
        })
        .catch(err => console.log(err))
    }, [score])

    // UseEffect pour rechercher si le mot écrit existe bel et bien et qu'il contient nos 2 lettres 
    useEffect(() => {
        // Avec fetch on va faire la requete 
        if (guess.length > 0) {
            fetch(findWordApi)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.title === 'No Definitions Found') {
                    console.log('perdu')
                    setError('That word does not exist')
                } else {
                    console.log('mot suivant !')
                    setScore(score + 1)
                    setCount(count + 5)
                    setTimeout(timeout + 5000)
                }

            })
            .catch(err => console.log(err))
        }
    },[guess]) 

    useEffect(() => {
        // Ajout du minuteur
        let interval = setInterval(() => {
            setCount(count => count - 1)
        }, 1000)

        setTimeout(() => {
            clearInterval(interval)
        }, timeout)
    }, []) 


    function handleSubmit() {
        // Vérifier que le mot contient bien nos 2 lettres 
        if (!value.includes(letters)) {
            // Compter la réponse comme fausse 
            setError(`This word does not include the letters : ${letters}`)
            return
        }

        // Si c'est bon on fait l'appel API 
        setError('')
        setGuess(value)
        setValue('')
    }

    // Affichage avec le JSX
    return ( 
        <>
            <h1>Word Gaaaame !</h1>
            { count === 0 ? 
                <div>
                    <h2>Score : {score}</h2>
                    <h2>It's over !</h2>
                    <button>Try again</button>
                </div>
             : <div>
                <h2>{count}</h2>
                <h2>Score : {score}</h2>
                <h2>{letters}</h2>
                <input 
                    type="text"    
                    name="guess"
                    className='guessInput'
                    value={value}
                    onChange = {(e) => setValue(e.target.value)}
                />
                <button onClick={() => handleSubmit()}>Go !</button>
                { error.length > 0 && <h3>{error}</h3> }
             </div> }
            
        </>
     );
}

export default WordGame;