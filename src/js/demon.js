const passage = "Demon Slayer is a Japanese anime and manga series written by Koyoharu Gotouge. It follows the story of Tanjiro Kamado, a kind-hearted boy who sells charcoal to support his family. One day, he returns home to find his family slaughtered by demons, and his sister Nezuko turned into a demon. Determined to avenge his family and save his sister, Tanjiro joins the Demon Slayer Corps, an organization dedicated to hunting demons and protecting humanity. The story explores themes of courage, grief, family bonds, and perseverance. Each character has a unique background, with their own traumas and motivations that drive their actions. The series is known for its emotional storytelling, intense battles, and stunning animation. As Tanjiro meets new allies like Zenitsu and Inosuke, he learns more about demon powers and the origins of their leader, Muzan Kibutsuji. The breathing techniques, sword styles, and demon abilities add depth to the combat system. Demon Slayer stands out not only for its action but also for its humanity and heart. It reminds us of the importance of kindness and determination in the face of overwhelming darkness. With its powerful characters and compelling plot, Demon Slayer has become one of the most beloved anime series of all time.";

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
