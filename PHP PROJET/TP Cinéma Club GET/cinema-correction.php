<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cinema tarif</title>
    <link rel="stylesheet" href="cinema.css">
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="./assets/popcorn.png" alt="logo">
            <p>Cinéma Club</p>
        </div>
        <form id='tarifs' method="GET">
            <input type="text" placeholder="Prénom" name="fname">
            <input type="text" placeholder="Nom" name="lname">
            <input type="number" placeholder="Votre age" name="age">
            <input type="submit" name="submit" value="Calculer">
        </form>
    <?php 

    // On vérifie que le formulaire est soumis
    if (isset($_GET['submit'])) :

        // On vérifie que les champs sont remplis
       if (!empty($_GET['fname']) &&!empty($_GET['lname']) && !empty(($_GET['age']))) :

            $age = $_GET['age'];
            $fname = $_GET['fname'];
            $lname = $_GET['lname'];

            // On utilise un switch pour déterminer le tarif
            switch ($age) {
                case ($age < 10) : 
                    $prix = '4 euros';
                    $tarif = 'Enfant';
                break;
                case ($age < 16) : 
                    $prix = '6 euros';
                    $tarif = 'Junior';
                break;
                case ($age < 25) : 
                    $prix = '7 euros';
                    $tarif = 'Étudiant';
                break;
                case ($age > 60) : 
                    $prix = '6 euros';
                    $tarif = 'Senior';
                break;
                default : 
                    $prix = '10 euros';
                    $tarif = "Normal";
                }       
    ?>

    <!-- On affiche les résultats ainsi que le nom et le prénom -->
    <h2> Bonjour <?= $fname ?> <?= $lname ?> </h2>
    <h2> Prix : <?= $prix ?> </h2>
    <h2> Tarif : <?= $tarif ?></h2>

    <!-- On s'assure que l'age est un chiffre (cas avec e) -->
    <?php elseif ((!is_numeric($_GET['age']))) : ?>

    <h2>Veuillez entrer un chiffre correct</h2>
    
    <?php else : ?>

    <h2>Veuillez remplir tous les champs</h2>

    <?php endif ?>
    <?php endif ?>
    </div>

</body>
</html>