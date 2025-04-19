const passage = "Alex and Brett Harris are twin brothers and co-authors of the book 'Do Hard Things,' a bold call for teenagers to rise above society’s low expectations. In their book, they challenge what they call the 'myth of adolescence,' which suggests that the teenage years are meant for fun and irresponsibility. Instead, they argue that young people are capable of achieving meaningful, difficult things — and that doing so leads to personal growth, stronger character, and greater impact. Drawing from personal experiences and stories of other teens, they encourage readers to step out of their comfort zones, take initiative, and lead lives of purpose and responsibility. The core message is clear: doing hard things helps build strength, discipline, and confidence. Their movement, known as The Rebelution — a combination of 'rebellion' and 'revolution' — is a rallying cry for a positive uprising against mediocrity. They also emphasize the importance of faith, integrity, and leadership throughout the teenage years. 'Do Hard Things' has motivated thousands of young people to take action, launch projects, and make a lasting difference. More than just a book, it’s a challenge to live with intention and courage. Alex and Brett believe that age should never be a limit to ambition or impact.";

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
