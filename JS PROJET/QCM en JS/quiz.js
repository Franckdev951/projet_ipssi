// 1) On importe notre tableau d'objets qui contient toutes les infos nécessaires pour notre qcm
import questions from './questions.js'

// 2) Récupère les éléments de notre document html (dans mon cas c'est la div de classe quizz)
const quiz = document.querySelector('.quiz')

// 3) Vous allez devoir utiliser forEach pour affiher correctement la liste des questions avec leur réponses respectives. 
// Il faudra donc coder le HTML à afficher (on pourrait utiliser innerHTML par exemple)
// Pour chaque question on aura l'intitulé, les choix possibles (avec des radios), et un bouton de soumission 
questions.forEach((item) => {
    // 1) CRÈER LES ÉLÉMENTS HTML À AFFICHER

    // On récupère les valeurs depuis l'objet questions
    const id = item.id
    const question = item.question
    const choices = item.reponses

    // Ici on créé le titre pour chaque question 
    const title = document.createElement('div')
    title.innerHTML = `<h2>${id} : ${question}</h2>`

    // Ici la liste contenant les réponses possibles 
    const responseList = document.createElement('ul')

    // Ici on crée la zone du résultat
    const resultZone = document.createElement('h2')

    // On crée le bouton de soumission avec pour contenu texte "Soumettre"
    const submit = document.createElement('button')
    submit.textContent = "Soumettre" 

    // On vient afficher les choix / réponses possibles dans un li 
    for (let key in choices) {
        const li = document.createElement('li')
        li.innerHTML = `<input name=${id} value=${key} type="radio"><p>${key} : ${choices[key]}</p>`
        
        // On injecte le li dans notre liste de réponses possibles
        responseList.appendChild(li)
    }

    // On injecte les différents élements dans notre div quiz du fichier html
    quiz.appendChild(title)
    quiz.appendChild(responseList)
    quiz.appendChild(submit)
    quiz.appendChild(resultZone)
    

    // On vient écouter le bouton de submit précedemment créé
    submit.addEventListener('click', () => {
        // Lorsque l'on clique sur ce bouton on veut également récupérer la radio sur laquelle on a cliqué
        const input = document.querySelector(`input[name="${id}"]:checked`)

        // Ainsi on pourra comparer la valeur (value) de celle-ci avec celle du résulat attendu ("correction" dans notre objet)
        if (input.value == item.correction) {
            resultZone.textContent = "Bonne réponse"
        } else {
            resultZone.textContent = "Mauvaise réponse"
        }
    })
})


