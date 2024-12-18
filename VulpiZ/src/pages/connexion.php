<?php
session_start();

// Exemple de connexion simple (à adapter à votre base de données)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Vérifiez les identifiants (simulé ici)
    if ($email === 'test@example.com' && $password === 'password123') {
        $_SESSION['user_id'] = 1; // Exemple : l'ID utilisateur
        header('Location: /'); // Redirection vers l'index
        exit();
    } else {
        $error = "Identifiants incorrects.";
    }
}
?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Connexion | VulpiZ</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Connexion</h1>
    <form method="post">
      <label for="email">Email :</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Se connecter</button>
    </form>
    <?php if (isset($error)): ?>
      <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
  </body>
</html>