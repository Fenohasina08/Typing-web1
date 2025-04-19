const passage = "Changing the world is a dream shared by many, but few succeed in making it a reality. This book explores the different aspects of change, from the individual to society. It describes how every action, no matter how small, can have a significant impact on the world. The book discusses the challenges encountered in this process: personal obstacles, social resistance, and systems that hinder innovation. However, it also highlights inspiring examples of individuals and movements that have managed to transform their realities. Through powerful stories, the author shows that it is possible to make a real difference, even in difficult circumstances. The book encourages us to have a clear vision and persevere despite setbacks, while emphasizing the importance of collaboration and mutual support to create lasting change. In the end, the goal is to remind us that everyone has a role to play in building a fairer, more compassionate, and sustainable world. This book inspires us to believe in our power to create change and motivates us to take action for a better future.";

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
