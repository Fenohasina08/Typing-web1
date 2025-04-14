document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const levels = [
      { 
        id: 1,
        title: "Niveau 1: Touches F & J - Position de base",
        keys: ['f', 'j'],
        sequence: "fjfjfjjfjfjfjjfjjf"
      },
      { 
        id: 2,
        title: "Niveau 2: Touches D & K",
        keys: ['d', 'k', 'f', 'j'],
        sequence: "dkdkffjjdkdkffjjdk"
      },
      { 
        id: 3,
        title: "Niveau 3: Touches S & L",
        keys: ['s', 'l', 'f', 'j'],
        sequence: "slslffjjslslffjjsl"
      },
      { 
        id: 4,
        title: "Niveau 4: Touches A & ;",
        keys: ['a', ';', 'f', 'j'],
        sequence: "a;a;ffj;a;a;ffj;a;"
      },
      { 
        id: 5,
        title: "Niveau 5: Touches G & H",
        keys: ['g', 'h', 'f', 'j'],
        sequence: "ghghffjjghghffjjgh"
      },
      { 
        id: 6,
        title: "Niveau 6: Mots courts",
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        sequence: "asdfghjkl;sadjakhadfad"
      },
      { 
        id: 7,
        title: "Niveau 7: Lettres E & I",
        keys: ['e', 'i', 'f', 'j'],
        sequence: "eifjeifjeifjeijfei"
      },
      { 
        id: 8,
        title: "Niveau 8: Mots avec espaces",
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'e', 'i', ' '],
        sequence: "desk file half sail jade lake"
      },
      { 
        id: 9,
        title: "Niveau 9: Phrases simples",
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'e', 'i', ' '],
        sequence: "he said she said high field"
      },
      { 
        id: 10,
        title: "Niveau 10: Paragraphe complet",
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'e', 'i', ' ', '.', ','],
        sequence: "the fast fall leaf is red. the high hill has shade. dad had a good idea."
      }
    ];
    
    // State
    let currentLevelIndex = 0;
    let currentLevel = levels[currentLevelIndex];
    let sequence = currentLevel.sequence;
    let currentPosition = 0;
    let errors = 0;
    let startTime = null;
    let completedKeys = 0;
    let levelCompleted = false;
    
    // DOM Elements
    const keyboardContainer = document.getElementById('keyboard-container');
    const keyboardEl = document.getElementById('keyboard');
    const progressEl = document.getElementById('progress');
    const accuracyEl = document.getElementById('accuracy');
    const wpmEl = document.getElementById('wpm');
    const progressPctEl = document.getElementById('progress-pct');
    const restartBtn = document.getElementById('restart-btn');
    const levelSelectorEl = document.getElementById('level-selector');
    const levelDescriptionEl = document.getElementById('level-description');
    const nextBtnContainer = document.getElementById('next-btn-container');
    const nextBtn = document.getElementById('next-btn');
    const handsContainer = document.getElementById('hands-container');
    
    // Initialize level selector
    function initLevelSelector() {
      levelSelectorEl.innerHTML = '';
      
      levels.forEach((level, index) => {
        const levelBtn = document.createElement('button');
        levelBtn.className = `py-1 px-3 text-sm rounded transition ${currentLevelIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`;
        levelBtn.textContent = `Niveau ${level.id}`;
        levelBtn.addEventListener('click', () => {
          changeLevel(index);
        });
        levelSelectorEl.appendChild(levelBtn);
      });
    }
    
    // Initialize keyboard layout
    function initKeyboard() {
      keyboardEl.innerHTML = '';
      keyboardEl.className = 'grid grid-cols-14 gap-1 bg-gray-100 rounded-lg p-4';
      
      const keyLayout = [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Menu', 'Ctrl'
      ];
      
      keyLayout.forEach(key => {
        const keyEl = document.createElement('div');
        keyEl.className = 'flex items-center justify-center bg-white rounded shadow text-gray-700 h-10 text-sm';
        
        // Spécificités pour la barre d’espace
        if (key === ' ') {
          keyEl.innerHTML = '&nbsp;';
          keyEl.dataset.key = ' ';
        } else {
          keyEl.textContent = key;
          keyEl.dataset.key = key.toLowerCase();
        }
        
        // Ajustement de la largeur pour certaines touches
        if (key === 'Backspace') keyEl.className += ' col-span-2';
        if (key === 'Tab') keyEl.className += ' col-span-2';
        if (key === 'Caps') keyEl.className += ' col-span-2';
        if (key === 'Enter') keyEl.className += ' col-span-2';
        if (key === 'Shift') keyEl.className += ' col-span-2';
        if (key === ' ') keyEl.className += ' col-span-4';
        
        // Mise en surbrillance des touches actives pour le niveau
        if (currentLevel.keys.includes(key.toLowerCase()) || (key === ' ' && currentLevel.keys.includes(' '))) {
          keyEl.className = keyEl.className.replace('bg-white', 'bg-blue-100 ring-2 ring-blue-400');
        }
        
        keyboardEl.appendChild(keyEl);
      });
    }
    
    // Initialize progress display
    function initProgress() {
      progressEl.innerHTML = '';
      
      for (let i = 0; i < sequence.length; i++) {
        const keyBox = document.createElement('div');
        keyBox.className = 'w-12 h-12 border-2 relative flex items-center justify-center text-xl';
        
        // Cas particulier pour un espace
        if (sequence[i] === ' ') {
          keyBox.innerHTML = '<span class="border-b-2 border-gray-400 w-6"></span>';
          keyBox.className += ' border-gray-300 text-gray-500';
        } else {
          keyBox.textContent = sequence[i];
          keyBox.className += ' border-gray-300 text-gray-500';
        }
        
        if (i === currentPosition) {
          keyBox.className = keyBox.className.replace('border-gray-300', 'border-blue-500 border-b-4');
        } else if (i < currentPosition) {
          keyBox.className = keyBox.className.replace('border-gray-300', 'border-green-500 bg-green-50');
          const checkmark = document.createElement('div');
          checkmark.className = 'absolute -top-6 text-green-500 text-lg';
          checkmark.textContent = '✓';
          keyBox.appendChild(checkmark);
        }
        
        progressEl.appendChild(keyBox);
      }
    }
    
    // Initialize hands visualization
    function initHands() {
      handsContainer.innerHTML = `
        <svg viewBox="0 0 650 200" class="w-full h-40 mt-8">
          <!-- Left hand -->
          <path d="M100,180 C60,120 50,80 70,40 C75,30 90,20 100,30 C110,40 105,80 105,100 Z" 
                fill="none" stroke="#888" stroke-width="2" id="left-pinky" />
          <path d="M150,190 C120,140 110,100 125,50 C130,40 145,30 155,40 C165,50 160,90 160,110 Z" 
                fill="none" stroke="#888" stroke-width="2" id="left-ring" />
          <path d="M200,195 C180,150 170,110 185,50 C190,40 205,30 215,40 C225,50 220,90 220,120 Z" 
                fill="none" stroke="#888" stroke-width="2" id="left-middle" />
          <path d="M250,190 C230,150 220,110 235,45 C240,35 255,25 265,35 C275,45 270,85 270,115 Z" 
                fill="none" stroke="#888" stroke-width="2" id="left-index" />
          
          <!-- Thumbs -->
          <path d="M300,150 C320,130 330,100 320,80 C310,60 290,60 280,70" 
                fill="none" stroke="#888" stroke-width="2" id="left-thumb" />
          <path d="M350,150 C330,130 320,100 330,80 C340,60 360,60 370,70" 
                fill="none" stroke="#888" stroke-width="2" id="right-thumb" />
          
          <!-- Right hand -->
          <path d="M400,190 C420,150 430,110 415,45 C410,35 395,25 385,35 C375,45 380,85 380,115 Z" 
                fill="none" stroke="#888" stroke-width="2" id="right-index" />
          <path d="M450,195 C470,150 480,110 465,50 C460,40 445,30 435,40 C425,50 430,90 430,120 Z" 
                fill="none" stroke="#888" stroke-width="2" id="right-middle" />
          <path d="M500,190 C530,140 540,100 525,50 C520,40 505,30 495,40 C485,50 490,90 490,110 Z" 
                fill="none" stroke="#888" stroke-width="2" id="right-ring" />
          <path d="M550,180 C590,120 600,80 580,40 C575,30 560,20 550,30 C540,40 545,80 545,100 Z" 
                fill="none" stroke="#888" stroke-width="2" id="right-pinky" />
        </svg>
      `;
    }
    
    // Update progress display
    function updateProgress() {
      document.querySelectorAll('#progress > div').forEach((box, index) => {
        box.className = box.className
          .replace('border-blue-500 border-b-4', 'border-gray-300')
          .replace('border-green-500 bg-green-50', 'border-gray-300');
        
        const checkmark = box.querySelector('div');
        if (checkmark) box.removeChild(checkmark);
        
        if (index === currentPosition) {
          box.className = box.className.replace('border-gray-300', 'border-blue-500 border-b-4');
        } else if (index < currentPosition) {
          box.className = box.className.replace('border-gray-300', 'border-green-500 bg-green-50');
          const checkmark = document.createElement('div');
          checkmark.className = 'absolute -top-6 text-green-500 text-lg';
          checkmark.textContent = '✓';
          box.appendChild(checkmark);
        }
      });
    }
    
    // Update statistics display
    function updateStats() {
      const accuracy = completedKeys > 0 
        ? Math.round((completedKeys - errors) / completedKeys * 100) 
        : 100;
      accuracyEl.textContent = `${accuracy}%`;
      
      if (startTime) {
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        const words = completedKeys / 5;
        const wpm = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
        wpmEl.textContent = wpm;
      }
      
      const progress = Math.round((currentPosition / sequence.length) * 100);
      progressPctEl.textContent = `${progress}%`;
    }
    
    // Highlight the active finger
    function highlightFinger(key) {
      document.querySelectorAll('path').forEach(path => {
        path.setAttribute('stroke', '#888');
        path.setAttribute('stroke-width', '2');
      });
      
      let fingerId = null;
      switch(key) {
        case 'a':
        case 'q':
        case 'z':
        case '1':
          fingerId = 'left-pinky';
          break;
        case 's':
        case 'w':
        case 'x':
        case '2':
          fingerId = 'left-ring';
          break;
        case 'd':
        case 'e':
        case 'c':
        case '3':
          fingerId = 'left-middle';
          break;
        case 'f':
        case 'r':
        case 'v':
        case '4':
        case '5':
          fingerId = 'left-index';
          break;
        case ' ':
          fingerId = 'left-thumb';
          document.getElementById('right-thumb').setAttribute('stroke', '#3b82f6');
          document.getElementById('right-thumb').setAttribute('stroke-width', '3');
          break;
        case 'j':
        case 'u':
        case 'm':
        case '6':
        case '7':
          fingerId = 'right-index';
          break;
        case 'k':
        case 'i':
        case ',':
        case '8':
          fingerId = 'right-middle';
          break;
        case 'l':
        case 'o':
        case '.':
        case '9':
          fingerId = 'right-ring';
          break;
        case ';':
        case 'p':
        case '/':
        case '0':
          fingerId = 'right-pinky';
          break;
      }
      
      if (fingerId) {
        const finger = document.getElementById(fingerId);
        if (finger) {
          finger.setAttribute('stroke', '#3b82f6');
          finger.setAttribute('stroke-width', '3');
        }
      }
    }
    
    // Gestion unifiée des événements clavier avec "keydown"
    function handleKey(e) {
      if (levelCompleted) return;
      
      if (!startTime) {
        startTime = Date.now();
      }
      
      // Normalisation de la touche pressée pour l'espace
      let pressedKey = e.key;
      if (pressedKey === "Spacebar" || pressedKey === " ") {
        pressedKey = " ";
        e.preventDefault(); // Empêche le défilement de page lors de l'appui sur espace
      }
      pressedKey = pressedKey.toLowerCase();
      
      const expectedKey = sequence[currentPosition];
      
      // Animation sur le clavier
      document.querySelectorAll('[data-key]').forEach(key => {
        if ((key.dataset.key === pressedKey) || (pressedKey === ' ' && key.dataset.key === ' ')) {
          key.classList.remove('bg-blue-100', 'bg-white');
          key.classList.add('bg-blue-200');
          
          setTimeout(() => {
            if (currentLevel.keys.includes(pressedKey) || (pressedKey === ' ' && currentLevel.keys.includes(' '))) {
              key.classList.remove('bg-blue-200');
              key.classList.add('bg-blue-100', 'ring-2', 'ring-blue-400');
            } else {
              key.classList.remove('bg-blue-200');
              key.classList.add('bg-white');
            }
          }, 200);
        }
      });
      
      highlightFinger(pressedKey);
      
      if (pressedKey === expectedKey) {
        currentPosition++;
        completedKeys++;
        updateProgress();
        updateStats();
        
        if (currentPosition >= sequence.length) {
          levelCompleted = true;
          handleLevelComplete();
        }
      } else {
        errors++;
        updateStats();
      }
    }
    
    // Un seul écouteur d'événement "keydown" pour gérer toute la saisie
    document.addEventListener('keydown', handleKey);
    
    // Traitement de la fin de niveau
    function handleLevelComplete() {
      if (currentLevelIndex < levels.length - 1) {
        nextBtnContainer.classList.remove('hidden');
        nextBtn.focus();
      } else {
        window.location.href = './felicitations.html'
      }
    }
    
    
    // Changer de niveau
    function changeLevel(levelIndex) {
      currentLevelIndex = levelIndex;
      currentLevel = levels[currentLevelIndex];
      sequence = currentLevel.sequence;
      levelDescriptionEl.textContent = currentLevel.title;
      
      resetExercise();
      
      document.querySelectorAll('#level-selector button').forEach((btn, idx) => {
        if (idx === currentLevelIndex) {
          btn.className = btn.className.replace('bg-gray-200 hover:bg-gray-300 text-gray-700', 'bg-blue-500 text-white');
        } else {
          btn.className = btn.className.replace('bg-blue-500 text-white', 'bg-gray-200 hover:bg-gray-300 text-gray-700');
        }
      });
      
      nextBtnContainer.classList.add('hidden');
      initKeyboard();
    }
    
    // Passage au niveau suivant
    function nextLevel() {
      if (currentLevelIndex < levels.length - 1) {
        changeLevel(currentLevelIndex + 1);
      }
    }
    
    // Réinitialiser l'exercice
    function resetExercise() {
      currentPosition = 0;
      errors = 0;
      completedKeys = 0;
      startTime = null;
      levelCompleted = false;
      initProgress();
      updateStats();
    }
    
    // Écouteurs pour les boutons "Recommencer" et "Niveau Suivant"
    restartBtn.addEventListener('click', resetExercise);
    nextBtn.addEventListener('click', nextLevel);
    
    // Initialisations
    initLevelSelector();
    initKeyboard();
    initProgress();
    initHands();
  });
  