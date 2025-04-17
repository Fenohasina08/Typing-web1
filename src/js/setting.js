document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour basculer entre le mode sombre et clair
    const themeButton = document.getElementById('theme-toggle');
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
    });
  
    // Fonction pour ajuster la taille de la police
    const fontSizeSelect = document.getElementById('font-size');
    fontSizeSelect.addEventListener('change', () => {
      const selectedSize = fontSizeSelect.value;
      document.body.style.fontSize = selectedSize === 'small' ? '14px' : selectedSize === 'large' ? '20px' : '16px';
    });
  
    // Fonction pour activer/désactiver le son
    const soundToggle = document.getElementById('sound-toggle');
    soundToggle.addEventListener('change', () => {
      const isSoundOn = soundToggle.checked;
      // Remplacer par la logique de gestion du son pour la dactylographie
      if (isSoundOn) {
        console.log('Le son est activé');
      } else {
        console.log('Le son est désactivé');
      }
    });
  });
  