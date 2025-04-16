const notesContainers = document.getElementsByClassName('notes');

for (let n = 0; n < notesContainers.length; n++) {
    const stars = notesContainers[n].getElementsByTagName('span');

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', function () {
            updateStars(i, stars);
        });
    }
}

function updateStars(index, stars) {
    for (let i = 0; i < stars.length; i++) {
        if (i <= index) {
            stars[i].textContent = '★';
        } else {
            stars[i].textContent = '☆';
        }
    }
}

// Pour les cœurs
const heartIcons = document.getElementsByClassName('favoris');

for (let i = 0; i < heartIcons.length; i++) {
    heartIcons[i].addEventListener('click', function () {
        if (heartIcons[i].textContent === '🤍') {
            heartIcons[i].textContent = '❤️';
        } else {
            heartIcons[i].textContent = '🤍';
        }
    });
}
