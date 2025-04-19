document.addEventListener('DOMContentLoaded', () => {
  function setupDropdown(toggleButtonId, dropdownMenuId) {
    const button = document.getElementById(toggleButtonId);
    const dropdown = document.getElementById(dropdownMenuId);

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !button.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  setupDropdown('play-button', 'play-dropdown');
  setupDropdown('mobile-play-button', 'mobile-play-dropdown');

  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('opacity-100', window.scrollY > 300);
    backToTop.classList.toggle('opacity-0', window.scrollY <= 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const playLink = document.getElementById('playLink');
  if (playLink) {
    playLink.addEventListener('click', () => {
      const submenu = document.getElementById('submenu');
      submenu.classList.toggle('hidden');
    });
  }
});
 
window.addEventListener('load', function() {
  const header = document.querySelector('.header');
  header.classList.add('show');
});

window.addEventListener('load', function() {
  const leftSection = document.getElementById("bienvenu_left");
  const rightSection = document.getElementById("bienvenu_right");

 
  leftSection.classList.add('show');
  rightSection.classList.add('show');
});

