const games = [
    { name: "Mario", image: "../images/clavier_euro.png", level: "easy" },
    { name: "Diaspora", image: "", level: "easy"},
    { name: "Tetris", image: "https://via.placeholder.com/200x150", level: "easy" },
    { name: "Tetris", image: "https://via.placeholder.com/200x150", level: "easy" },
    { name: "Tetris", image: "https://via.placeholder.com/200x150", level: "easy" },
    { name: "Zelda", image: "https://via.placeholder.com/200x150", level: "medium" },
    { name: "Zelda", image: "https://via.placeholder.com/200x150", level: "medium" },
    { name: "Zelda", image: "https://via.placeholder.com/200x150", level: "medium" },
    { name: "Zelda", image: "https://via.placeholder.com/200x150", level: "medium" },
    { name: "Zelda", image: "https://via.placeholder.com/200x150", level: "medium" },
    { name: "Dark Souls", image: "https://via.placeholder.com/200x150", level: "hard" },
    { name: "Elden Ring", image: "https://via.placeholder.com/200x150", level: "hard" },
    { name: "Elden Ring", image: "https://via.placeholder.com/200x150", level: "hard" },
    { name: "Elden Ring", image: "https://via.placeholder.com/200x150", level: "hard" },
    { name: "Elden Ring", image: "https://via.placeholder.com/200x150", level: "hard" },
   
    
    
  ];

  const levels = {
    easy: document.getElementById("easy-levels-grid"),
    medium: document.getElementById("medium-levels-grid"),
    hard: document.getElementById("hard-levels-grid"),
    all: document.getElementById("all-levels-grid")
  };

  function createGameCard(game) {
    const card = document.createElement("div");
    card.className = "game-card bg-white";

    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";

    const img = document.createElement("img");
    img.src = game.image;
    img.alt = game.name;

    imgContainer.appendChild(img);

    const name = document.createElement("div");
    name.className = "game-name";
    name.textContent = game.name;

    card.appendChild(imgContainer);
    card.appendChild(name);

    return card;
  }

  games.forEach(game => {
    const card = createGameCard(game);
    levels[game.level].appendChild(card);
    levels.all.appendChild(card.cloneNode(true));
  });