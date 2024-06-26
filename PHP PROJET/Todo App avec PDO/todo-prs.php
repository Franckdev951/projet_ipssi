<?php 

    // On importe notre connexion PDO
    include "db.php";

    // Logique pour l'affichage des todos (si il y en a !)
    $sql = "SELECT * FROM todoz";
    $todos = $pdo->query($sql)->fetchAll();


    // Logique pour ajouter une todo en BDD 
    // 1) On vérifie que le form ait été soumis
    if (isset($_POST['submit'])) {

        // 2) On vérifie que le user ait bien rempli le champ
        if (!empty($_POST['todo'])) {

            // On annule l'effet des crochets en HTML (XSS)
            $todo = htmlspecialchars($_POST['todo']);

            // On définit la requete à effectuer
            $sql = "INSERT INTO todoz(title) VALUES(?)";

            // On la prépare avant de l'éxecuter (injections SQL)
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$todo]);
        } else {
            $error = "Veuillez remplir le champ";
        }
    }

    // Suppression d'une todo à l'aide de $_GET et des paramètres de l'URL
    if (isset($_GET['delete'])) {

        // On récupère l'id de la toto à supprimer que l'on a transmise dans les paramètres de l'URL
        $id = $_GET['delete'];

        $sql = "DELETE FROM todoz WHERE id = ?";
        $stmt = $pdo->prepare($sql)->execute([$id]);
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
</head>
<body>

<h1>Ma super todo</h1>

<!-- Notre formulaire de soumission avec la méthode POST  -->
<form method="POST">
    <input type="text" name="todo" placeholder="Votre todo ici ...">
    <input type="submit" name="submit">
</form>

<!-- Affiche la variable $error si celle-ci existe  -->
<?php if (isset($error)) : ?>
    <p><?= $error ?></p>
<?php endif ?>

<!-- Si notre tableau de todos n'est pas vide alors on affiche une div de classe todos -->
<?php if (isset($todos)) : ?>
    <div class="todos">
        <!-- Pour chaque élément de todos (item) on affiche du html qui contient les infos de notre todo -->
        <?php foreach($todos as $todo) : ?>
            <!-- Ici on affiche les élément de notre todo  -->
            <div class="todo">
                <h2><?= $todo['title'] ?></h2>
                <a href="?delete=<?= $todo['id'] ?>">x</a>
                <input type="checkbox" name="check" id="check">
            </div>
        <?php endforeach ?>
    </div>
<?php endif ?>


</body>
</html>