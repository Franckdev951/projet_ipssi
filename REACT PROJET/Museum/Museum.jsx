import { useState, useEffect } from "react"

function Museum() {
    // Nos variables de State, value c'est la valeur changeante de l'input, 
    // search c'est le terme de recherche nettoyé (qui va déclencher la première requete)
    // imageList ce sont les IDs des oeuvres (ID à partir duquel on recup les infos d'une oeuvre)
    // results ce sont les images tirées des objects (les url qui vont nous permettrent d'afficher les images)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [imageList, setImageList] = useState([])
    const [results, setResults] = useState([])

    // Le useEffect qui vient faire la requete vers l'API pour récupérer les IDs lié au terme de la recherche
    useEffect(() => {
        fetchData()
    }, [search])

    // 2eme useEffect qui lui vient récupérer les infos pour chaque IDs 
    useEffect(() => {
        fetchImages()
    }, [imageList])

    // Fonction déclenchée lorsque l'on clique sur le bouton de recherche
    function handleSearch() {
        setResults([])
        // Assainir l'input 
        const cleanSearch = value.toLowerCase().trim().replace(/(<([^>]+)>)/gi, "").replaceAll(/\s/g,'')
        console.log(cleanSearch)
        setSearch(cleanSearch)
    }

    // Fonction qui est déclenchée dans le 1er useEffect (recuperation des IDs)
    function fetchData() {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let arts = data.objectIDs.slice(0, 20)
            // console.log(arts)
            setImageList(arts)
        })
        .catch(err => console.log(err))
    }

    // On récupère les infos pour chaque oeuvre avec un map, et en particulier les images de l'oeuvre
    function fetchImages() {
        imageList.map((item, index) => (
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.primaryImageSmall)
                let image = data.primaryImageSmall

                // On vient ajouter à notre tableau de résultats chaque image en faisant une copie du tableau (JS - voir immuables)
                setResults(results => [ ...results , image ])
            })                
            .catch(err => console.log(err))
        ))
    }

    console.log(results)

    // Dans le JSX, si il y a des oeuvres à afficher on les affiche, sinon 
    // un message qui stipule qu'il n'y arien à afficher 
    return ( 
        <>
            <h1>Mon musée de Saint-Quentin</h1>

            {/* Un input de recherche controllée via le state (search) */}
            <input 
                className="museumInput"
                type="text" 
                placeholder="Chercher un artiste..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button onClick={() => handleSearch()}>Rechercher</button>

            {/* Une zone d'affichage des oeuvres ou on vient maper sur les oeuvres, cad results dans le state */}
            <ul>
                {results.map((image, index) => (
                    <li key={index}>
                        <img src={image} />
                    </li>
                ))}
            </ul>
        </>
     );
}

export default Museum;