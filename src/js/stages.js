document.addEventListener('DOMContentLoaded', function() {
  const levels = [
    { id: 1,  title: "Niveau 1: Touches F & J - Position de base", keys: ['f','j'],         sequence: "fjfjfjjfjfjfjjfjjf" },
    { id: 2,  title: "Niveau 2: Touches D & K",                keys: ['d','k','f','j'],      sequence: "dkdkffjjdkdkffjjdk" },
    { id: 3,  title: "Niveau 3: Touches S & L",                keys: ['s','l','f','j'],      sequence: "slslffjjslslffjjsl" },
    { id: 4,  title: "Niveau 4: Touches A & ;",                keys: ['a',';','f','j'],      sequence: "a;a;ffj;a;a;ffj;a;" },
    { id: 5,  title: "Niveau 5: Touches G & H",                keys: ['g','h','f','j'],      sequence: "ghghffjjghghffjjgh" },
    { id: 6,  title: "Niveau 6: Mots courts",                  keys: ['a','s','d','f','g','h','j','k','l',';'], sequence: "asdfghjkl;sadjakhadfad" },
    { id: 7,  title: "Niveau 7: Lettres E & I",                keys: ['e','i','f','j'],      sequence: "eifjeifjeifjeijfei" },
    { id: 8,  title: "Niveau 8: Mots avec espaces",            keys: ['a','s','d','f','g','h','j','k','l','e','i',' '], sequence: "desk file half sail jade lake" },
    { id: 9,  title: "Niveau 9: Phrases simples",              keys: ['a','s','d','f','g','h','j','k','l','e','i',' '], sequence: "he said she said high field" },
    { id: 10, title: "Niveau 10: Paragraphe complet",          keys: ['a','s','d','f','g','h','j','k','l','e','i',' ','.',','], sequence: "the fast fall leaf is red. the high hill has shade. dad had a good idea." }
  ];

  let currentLevelIndex = 0;
  let currentLevel = levels[currentLevelIndex];
  let sequence = currentLevel.sequence;
  let currentPosition = 0;
  let errors = 0;
  let startTime = null;
  let completedKeys = 0;
  let levelCompleted = false;

  const keyboardContainer   = document.getElementById('keyboard-container');
  const keyboardEl          = document.getElementById('keyboard');
  const progressEl          = document.getElementById('progress');
  const accuracyEl          = document.getElementById('accuracy');
  const wpmEl               = document.getElementById('wpm');
  const progressPctEl       = document.getElementById('progress-pct');
  const restartBtn          = document.getElementById('restart-btn');
  const levelSelectorEl     = document.getElementById('level-selector');
  const levelDescriptionEl  = document.getElementById('level-description');
  const nextBtnContainer    = document.getElementById('next-btn-container');
  const nextBtn             = document.getElementById('next-btn');
  const handsContainer      = document.getElementById('hands-container');

  function initLevelSelector() {
    levelSelectorEl.innerHTML = '';
    levels.forEach((level, index) => {
      const levelBtn = document.createElement('button');
      levelBtn.className = `py-1 px-3 text-sm rounded transition ${currentLevelIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`;
      levelBtn.textContent = `Niveau ${level.id}`;
      levelBtn.addEventListener('click', () => changeLevel(index));
      levelSelectorEl.appendChild(levelBtn);
    });
  }

  function initKeyboard() {
    keyboardEl.innerHTML = '';
    keyboardEl.className = 'grid grid-cols-14 gap-1 bg-gray-100 rounded-lg p-4';

    const keyLayout = [
      '`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
      'Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\',
      'Caps','a','s','d','f','g','h','j','k','l',';',"'",'Enter',
      'Shift','z','x','c','v','b','n','m',',','.','/','Shift',
      'Ctrl','Win','Alt',' ','Alt','Menu','Ctrl'
    ];

    keyLayout.forEach(key => {
      const keyEl = document.createElement('div');
      keyEl.className = 'flex items-center justify-center bg-white rounded shadow text-gray-700 h-10 text-sm';
      if (key === ' ') {
        keyEl.textContent = '␣';
        keyEl.dataset.key = ' ';
        keyEl.className += ' italic col-span-4';
      } else {
        keyEl.textContent = key;
        keyEl.dataset.key = key.toLowerCase();
      }
      if (['Backspace','Tab','Caps','Enter','Shift'].includes(key)) {
        keyEl.className += ' col-span-2';
      }
      if (currentLevel.keys.includes(keyEl.dataset.key)) {
        keyEl.className = keyEl.className.replace('bg-white','bg-blue-100 ring-2 ring-blue-400');
      }
      keyboardEl.appendChild(keyEl);
    });
  }

  function initProgress() {
    progressEl.innerHTML = '';
    for (let i = 0; i < sequence.length; i++) {
      const keyBox = document.createElement('div');
      keyBox.className = 'w-12 h-12 border-2 relative flex items-center justify-center text-xl border-gray-300 text-gray-500';
      keyBox.textContent = sequence[i] === ' ' ? '␣' : sequence[i];
      if (i === currentPosition) {
        keyBox.className = keyBox.className.replace('border-gray-300','border-blue-500 border-b-4');
      }
      progressEl.appendChild(keyBox);
    }
  }

  function initHands() {
    handsContainer.innerHTML = `
      <svg viewBox="0 0 650 200" class="w-full h-40 mt-8">
        <!-- … tes paths de mains … -->
      </svg>
    `;
  }

  function updateProgress() {
    document.querySelectorAll('#progress > div').forEach((box, index) => {
      box.className = box.className.replace(/border-(blue|green)-.*|bg-green-50/g, 'border-gray-300 text-gray-500');
      box.textContent = sequence[index] === ' ' ? '␣' : sequence[index];
      if (index < currentPosition) {
        box.className = box.className.replace('border-gray-300','border-green-500 bg-green-50');
        const check = document.createElement('div');
        check.className = 'absolute -top-6 text-green-500 text-lg';
        check.textContent = '✓';
        box.appendChild(check);
      } else if (index === currentPosition) {
        box.className = box.className.replace('border-gray-300','border-blue-500 border-b-4');
      }
    });
  }

  function updateStats() {
    const accuracy = completedKeys > 0
      ? Math.round((completedKeys - errors) / completedKeys * 100)
      : 100;
    accuracyEl.textContent = `${accuracy}%`;

    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const words = completedKeys / 5;
      wpmEl.textContent = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
    }
    const progress = Math.round((currentPosition / sequence.length) * 100);
    progressPctEl.textContent = `${progress}%`;
  }

  function highlightFinger(key) {
    document.querySelectorAll('path').forEach(path => {
      path.setAttribute('stroke','#888');
      path.setAttribute('stroke-width','2');
    });
    let fingerId = null;
   
    if (fingerId) {
      const finger = document.getElementById(fingerId);
      finger.setAttribute('stroke','#3b82f6');
      finger.setAttribute('stroke-width','3');
    }
  }

  function handleKey(e) {
    if (levelCompleted) return;
    if (!startTime) startTime = Date.now();

    let pressedKey = e.key === ' ' || e.key === 'Spacebar' ? ' ' : e.key.toLowerCase();
    if (pressedKey === ' ') e.preventDefault();

    document.querySelectorAll('[data-key]').forEach(keyEl => {
      if (keyEl.dataset.key === pressedKey) {
        keyEl.classList.replace('bg-white','bg-blue-200');
        setTimeout(() => keyEl.classList.replace('bg-blue-200','bg-white'), 200);
      }
    });

    const expectedKey = sequence[currentPosition];
    if (pressedKey === expectedKey) {
      currentPosition++;
      completedKeys++;
      updateProgress();
      updateStats();

      if (currentPosition === sequence.length) {
        levelCompleted = true;
        if (currentLevelIndex < levels.length - 1) {
          nextBtnContainer.classList.remove('hidden');
        } else {
          showSnowEffect();
        }
      }
    } else {
      errors++;
    }

    highlightFinger(pressedKey);
  }

 
  function showSnowEffect() {
    const overlay = document.getElementById('snow-overlay');
    overlay.innerHTML = '';
    overlay.classList.remove('hidden');

 
    const msg = document.createElement('div');
    msg.textContent = '🎉 Félicitations ! 🎉';
    msg.className = 'text-4xl font-bold text-blue-800 drop-shadow-lg';
    overlay.appendChild(msg);

 
    const flakesCount = 100;
    for (let i = 0; i < flakesCount; i++) {
      const flake = document.createElement('div');
      flake.className = 'snow-flake';
      const size = 4 + Math.random() * 6;
      flake.style.width  = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left   = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${2 + Math.random()}s`;
      flake.style.animationDelay    = `${Math.random() * 0.5}s`;
      overlay.appendChild(flake);
    }

    // Stop after 3s
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.innerHTML = '';
    }, 3000);
  }

  function changeLevel(levelIndex) {
    currentLevelIndex = levelIndex;
    currentLevel = levels[levelIndex];
    sequence = currentLevel.sequence;
    levelDescriptionEl.textContent = currentLevel.title;
    resetExercise();
    initKeyboard();
    initProgress();
    document.querySelectorAll('#level-selector button').forEach((btn, idx) => {
      btn.className = btn.className.replace(
        idx === levelIndex ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-blue-500 text-white',
        idx === levelIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      );
    });
    nextBtnContainer.classList.add('hidden');
  }

  function nextLevel() {
    if (currentLevelIndex < levels.length - 1) {
      changeLevel(currentLevelIndex + 1);
    }
  }

  function resetExercise() {
    currentPosition = 0;
    errors = 0;
    completedKeys = 0;
    startTime = null;
    levelCompleted = false;
    updateProgress();
    updateStats();
  }

 
  document.addEventListener('keydown', handleKey);
  restartBtn.addEventListener('click', resetExercise);
  nextBtn.addEventListener('click', nextLevel);

 
  initLevelSelector();
  initKeyboard();
  initProgress();
  initHands();
});
