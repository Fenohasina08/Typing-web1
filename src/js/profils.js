function changeProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const profileImage = document.getElementById('profileImage');
      if (profileImage) {
        profileImage.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}

function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  
  if (!input || !icon) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

document.getElementById("preferencesForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username")?.value;
  const email = document.getElementById("email")?.value;

  if (!username || !email) {
    showNotification('Veuillez remplir tous les champs', 'error');
    return;
  }

  const displayName = document.querySelector('h3.text-xl');
  if (displayName) {
    displayName.textContent = username;
  }

  showNotification('Préférences sauvegardées !', 'success');
});

function showNotification(message, type = 'info') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const notification = document.createElement("div");
  notification.className = `fixed bottom-4 right-4 ${colors[type]} text-white p-4 rounded-lg shadow-lg animate-fade-in`;
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
      ${message}
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('animate-fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}
