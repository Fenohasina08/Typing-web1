const passage = "Today is a good day to have a good day. It may sound simple, but this phrase reminds us of the power of mindset. Each morning brings a fresh start, a new opportunity to choose positivity and purpose. While we can’t always control what happens to us, we can choose how we react. A good day isn’t defined by perfection, but by how we face challenges with a strong spirit and an open heart. Smiling at someone, helping a friend, or taking a moment to appreciate small joys can turn an ordinary day into something special. When we decide to be present, grateful, and kind, the world feels lighter and more hopeful. Life moves fast, but slowing down to breathe, to reflect, and to connect with others can make all the difference. Today might bring surprises, successes, or even struggles — but through it all, we can still decide to see the good. We can still make today meaningful. So, whether it’s a quiet day or a busy one, let’s embrace it fully. After all, today is a good day to have a good day — and that starts with us.";

let startTime, totalWords, wordsTyped, correctWords;

document.getElementById('word-to-type').textContent = passage;

document.getElementById('user-input').addEventListener('input', function () {
  if (!startTime) startTime = Date.now();
  const userInput = this.value;
  wordsTyped = userInput.split(/\s+/).length;

  const passageWords = passage.split(/\s+/);
  const userWords = userInput.split(/\s+/);

  correctWords = 0;
  let accuracy = 0;
  let progressPct = 0;

  let typedWordsHTML = "";
  for (let i = 0; i < userWords.length; i++) {
    const typedWord = userWords[i];
    const correctWord = passageWords[i] || "";
    if (typedWord === correctWord) {
      correctWords++;
      typedWordsHTML += `<span class="text-green-500">${typedWord}</span> `;
    } else {
      typedWordsHTML += `<span class="text-red-500">${typedWord}</span> `;
    }
  }

  document.getElementById('word-to-type').innerHTML = passageWords.slice(0, userWords.length).map((word, index) => {
    return index < userWords.length
      ? `<span class="${userWords[index] === word ? 'text-green-500' : 'text-red-500'}">${word}</span>`
      : word;
  }).join(" ");

  accuracy = ((correctWords / wordsTyped) * 100) || 0;
  progressPct = ((wordsTyped / passageWords.length) * 100).toFixed(2);
  updateStats(accuracy, progressPct);
});

function updateStats(accuracy, progressPct) {
  const elapsedTime = (Date.now() - startTime) / 1000;
  const wpm = Math.floor((wordsTyped / elapsedTime) * 60);

  document.getElementById('wpm').textContent = wpm;
  document.getElementById('accuracy').textContent = accuracy.toFixed(2) + '%';
  document.getElementById('progress-pct').textContent = progressPct + '%';

  if (wordsTyped >= passage.split(/\s+/).length) {
    document.getElementById('user-input').disabled = true;
    alert("Well done! You've completed the passage.");
  }
}

document.getElementById('restart-btn').addEventListener('click', function () {
  document.getElementById('user-input').value = '';
  document.getElementById('user-input').disabled = false;
  startTime = null;
  wordsTyped = 0;
  correctWords = 0;
  document.getElementById('word-to-type').textContent = passage;
  updateStats(0, 0);
});
