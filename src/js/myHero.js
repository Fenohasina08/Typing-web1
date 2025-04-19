const passage = "My Hero Academia is a Japanese anime and manga series created by Kohei Horikoshi. The story takes place in a world where nearly everyone has a superpower called a Quirk. These abilities vary greatly, and people use them for good or evil. The main character, Izuku Midoriya, is a young boy born without a Quirk, which makes him feel powerless in a society where heroes are admired. Despite this, he dreams of becoming a great hero like his idol, All Might. One day, Izuku meets All Might, who sees potential in him and passes on his own Quirk, One For All. With this power, Izuku enters U.A. High School, a prestigious academy for aspiring heroes. Alongside his classmates, he trains hard, faces dangerous villains, and learns what it truly means to be a hero. The series explores themes of courage, friendship, responsibility, and self-improvement. Each character has a unique personality and backstory, making the world feel rich and alive. My Hero Academia is known for its exciting battles, emotional moments, and powerful messages. It teaches that being a hero isn’t just about having power, but also about making the right choices and helping others. The series continues to inspire fans around the world.";

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
