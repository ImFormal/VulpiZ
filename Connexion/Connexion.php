<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg" href="../Ressources/Logo/vulpiz_icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Découvrez VulpiZ, votre site de quiz innovant mélant culture, fun et renard !">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="connexion.css">
    <title>Connexion | VulpiZ</title>
  </head>
  <body>
    <div class="content">
      <div class="logo">
        <img src="../Ressources/Logo/logo.svg" alt="logo_VulpiZ">
      </div>
      <p class="accroche">
        Pour accéder à VulpiZ, connectez-vous !
      </p>

      <div class="formulaire">
        <form action="connexionbase.php" method="post">
          <p>Se connecter</p>
          <hr>
  
          <div class="Box">
            <span>Email</span>
            <div class="box">
              <input type="text" name="email" id="email" placeholder="adresse@gmail.com" pattern="[a-z0-9A-Z._-]+@[a-z.]+\.[a-z]{2,4}" required>
            </div>
            
          <br>
            
            <span>Mot de Passe</span>
            <div class="box">
              <input type="password" name="password" id="password" pattern="[a-z0-9A-Z._-!]{8,}" required>
            </div>
            
          <br>
                
            <div class="box">
              <input type="submit" value="Se connecter">
            </div>
          </div>
        </form>
      </div>

      <a href="../inscription.html" class="inscription">Pas de compte ? Inscrivez-vous !</a>
    </div>

    <?php include '../Modèles/Footer/footer.php'; ?>
  </body>
</html>
