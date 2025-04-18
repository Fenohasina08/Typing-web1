// menu.js

document.addEventListener('DOMContentLoaded', () => {
  
    // Desktop dropdown
    const playButton = document.getElementById('play-button');
    const playDropdown = document.getElementById('play-dropdown');
  
    playButton.addEventListener('click', (e) => {
      e.stopPropagation();
      playDropdown.classList.toggle('hidden');
    });
  
    document.addEventListener('click', (e) => {
      if (!playDropdown.contains(e.target) && !playButton.contains(e.target)) {
        playDropdown.classList.add('hidden');
      }
    });
  
    // Mobile dropdown
    const mobilePlayButton = document.getElementById('mobile-play-button');
    const mobilePlayDropdown = document.getElementById('mobile-play-dropdown');
  
    mobilePlayButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobilePlayDropdown.classList.toggle('hidden');
    });
  
    document.addEventListener('click', (e) => {
      if (!mobilePlayDropdown.contains(e.target) && !mobilePlayButton.contains(e.target)) {
        mobilePlayDropdown.classList.add('hidden');
      }
    });
    const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove('opacity-0');
      backToTop.classList.add('opacity-100');
    } else {
      backToTop.classList.remove('opacity-100');
      backToTop.classList.add('opacity-0');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  document.getElementById('playLink').addEventListener('click', function() {
    const submenu = document.getElementById('submenu');
    submenu.classList.toggle('hidden'); // Utilise 'hidden' pour masquer ou afficher
  });
  
  });
  