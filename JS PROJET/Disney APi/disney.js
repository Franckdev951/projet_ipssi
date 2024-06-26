// 1) On récupère le container characters de notre html 
const container = document.querySelector('.characters')

// 2) On va utiliser axios pour recupe les persos de l'API
axios.get('https://api.disneyapi.dev/character')
.then(res => res.data)
.then(res => displayCharacters(res))
.catch(e => console.error(e))


// 3) Coder la fonction qui nous permettra d'afficher ces persos de Disney
//    On voudra en afficher une vingtaine et il faudra qu'ils apparaissent dans un film 
function displayCharacters(characters) {
    for (let i = 0; i < 20; i++) {
        const name = characters.data[i].name
        const image = characters.data[i].imageUrl
        const films = characters.data[i].films

        const html = `
                <h1>${name}</h1>
                <img src="${image}"></img>
                <p>${films}</p>
        `
        const card = document.createElement('div')
        card.classList.add('.card')
        card.innerHTML = html

        container.appendChild(card)
    }
}