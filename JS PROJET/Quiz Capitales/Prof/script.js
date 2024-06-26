// Faire QCM pour deviner des capitales

// 1) On veut afficher aléatoirement le nom du pays + drapeau
// 2) En dessous on veut un input pour insérer le nom de la capitale
// 3) On veut un bouton pour valider
// 4) On veut afficher si la réponse est bonne ou pas
// 5) Une fois validé on veut aussi un bouton qui nous emmène à la question suivante

// Comptabiliser les points et stopper au bout de 10 questions

// Choisir aléatoirement le pays en passant par son code pays

key = "Iz7zwKQPzm7heMszGK3MAzbwonqEZjW2E45pWfjO"

const url = `https://countryapi.io/api/all?apikey=${key}`

let countries = []
let currentCountry = {}
let currentQuestion = 1
let score = 0

const input = document.querySelector("input")
const validation = document.querySelector(".submit")
const next = document.querySelector(".next")
const pays = document.querySelector(".pays")
const flag = document.querySelector(".flag")
const scoreTotal = document.querySelector(".scoreTotal")
const verdict = document.querySelector('.verdict')

axios.get(url)
    .then(response => response.data)
    .then(data => {
        const countries = Object.keys(data);

        console.log(data)

        let currentQuestion = 1;
        let score = 0;

        verdict.textContent = ""

        displayQuestion(countries, data, currentQuestion, score)
});
       
function displayQuestion(countries, data, currentQuestion, score) {
    scoreTotal.innerHTML = `Round ${currentQuestion} : Tu as ${score} /10`

    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCode = countries[randomIndex];
    const randomCountry = data[randomCode];

    pays.innerHTML = randomCountry.name;
    flag.src = randomCountry.flag.medium;
    currentCountry = randomCountry;

    validation.addEventListener("click", () => {
        const answer = input.value.toLowerCase().replace(' ', '')

        if (answer === currentCountry.capital.toLowerCase().replace(' ', '')) {
            verdict.textContent = "Bonne réponse"
            score++;
            scoreTotal.innerHTML = `Round ${currentQuestion} : Tu as ${score} /10`
            input.value = ""
        } else {
            verdict.textContent = `Mauvaise réponse, la capitale est ${currentCountry.capital}`
            input.value = ""
        }
    });

    next.addEventListener('click', () => {
        if (currentQuestion < 10) {
            currentQuestion++
            displayQuestion(countries, data, currentQuestion, score)
        } else {
            verdict.textContent = `Quiz terminé !`
            scoreTotal.innerHTML = `Tu as un score global de ${score} /10`
        }
        
    })
}


