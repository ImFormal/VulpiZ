<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/Modèles/Footer/footer.css">
<?php
session_start();

$isUserLoggedIn = isset($_SESSION['user_id']);
?>

<footer>
  <div class="spacer"></div>
  <nav>
    <?php if ($isUserLoggedIn): ?>
      <a href="contact.html">Contact</a>
    <?php endif; ?>
    <a href="mentions-legales.html">Mentions légales</a>
    <a href="cgu.html">CGU</a>
    <a href="politique-confidentialite.html">Politique de confidentialité</a>
    
  </nav>
  <p>&copy; 2024 VulpiZ. Tous droits réservés.</p>
</footer>