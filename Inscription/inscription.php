<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg" href="/Ressources/Logo/vulpiz_icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Découvrez VulpiZ, votre site de quiz innovant mélant culture, fun et renard !">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/Inscription/inscription.css">
    <title>Inscription | VulpiZ</title>
  </head>
  <body>
    <div class="content">
      
      <img src="/Ressources/Logo/logo.svg" alt="logo_VulpiZ">
      
      <p class="accroche">
        Pour accéder à VulpiZ, inscrivez-vous !
      </p>

      <div class="formulaire">
        <form action="connexionbase.php" method="post">
          <p>S'inscrire</p>
          <hr>
  
          <div class="Box">
            <span>Pseudo</span>
            <div class="box">
              <input type="text" name="pseudo" id="pseudo" pattern="[a-z0-9A-Z._-]{3,32}" required>
            </div>
            
          <br>

            <span>Email</span>
            <div class="box">
              <input type="text" name="email" id="email" pattern="[a-z0-9A-Z._-]+@[a-z.]+\.[a-z]{2,4}" required>
            </div>
            
          <br>
            
            <span>Mot de Passe</span>
            <div class="box">
              <input type="password" name="password" id="password" pattern="[a-z0-9A-Z._-!]{8,}" required>
            </div>
            
          <br>
                
            <div class="box">
              <input type="submit" value="S'inscrire">
            </div>
            <input type="checkbox" name="droit" id="droit" required><label for="droit">En cliquant sur S'inscrire, vous acceptez les <span>Conditions d'utilisation</span> de VulpiZ et vous confirmez avoir lu nos <span>Mention Légales</span></label>

          </div>
        </form>
      </div>

      <a href="/Connexion/connexion.php" class="connexion">Déjà un compte ? Connectez-vous !</a>
    </div>

    <?php include '../Modèles/Footer/footer.php'; ?>
  </body>
</html>
