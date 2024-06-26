// Afficher les nombres de 1 à 500 
for (i=0; i <= 500; i++) {
    if (i % 2 == 0) {
        console.log(i);
    } else {
        console.error('impair !');
    }
}

const square = document.querySelector('.square')

square.addEventListener('click', () => {
    if (square.style.backgroundColor == "green") {
        square.style.backgroundColor = "blue"
    } else {
        square.style.backgroundColor = "green"
    }
})

