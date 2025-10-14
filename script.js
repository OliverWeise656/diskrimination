const discriminationAudios = [
  ["te-te", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/te-te.mp3?v=1722453763418"],
  ["ke-ge", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ke-ge.mp3?v=1722453760576"],
  ["ti-ki", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ti-ki.mp3?v=1722453763721"],
  ["go-do", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/go-do.mp3?v=1722453759547"],
  ["me-me", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/me-me.mp3?v=1722453762503"],
  ["to-do", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/to-do.mp3?v=1722453764072"],
  ["na-ma", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/na-ma.mp3?v=1722453762778"],
  ["ge-te", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ge-te.mp3?v=1722453758965"],
  ["ka-pa", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ka-pa.mp3?v=1722453760249"],
  ["be-be", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/be-be.mp3?v=1722453757720"],
  ["do-bo", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/do-bo.mp3?v=1722453758364"],
  ["ki-ki", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ki-ki.mp3?v=1722453760915"],
  ["pu-pu", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/pu-pu.mp3?v=1722453763079"]
];

const identificationAudios = [
  ["gri-kri", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/gri-kri.mp3?v=1722453759863"],
  ["dre-gre", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/dre-kre.mp3?v=1722453758677"],
  ["kna-kna", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/kna-kna.mp3?v=1722453761498"],
  ["tro-kro", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/tro-kro.mp3?v=1722453764365"],
  ["kli-kli", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/kli-kli.mp3?v=1722453761210"],
  ["glu-klu", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/glu-klu.mp3?v=1722453759251"],
  ["kra-tra", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/kra-tra.mp3?v=1722453762199"],
  ["bri-pri", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/bri-pri.mp3?v=1722454372730"],
  ["ble-ple", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/ble-ple.mp3?v=1722453758045"],
  ["kra-gra", "https://cdn.glitch.global/4ddfbf82-7323-4d4b-a5a9-3b5c7a4959d3/kra-gra.mp3?v=1722453761859"]
];

let currentIndex = 0;
let discriminationScore = 0;
let identificationScore = 0;
let currentPhase = "discrimination"; // or "identification"

const startButton = document.getElementById('startButton');
const testArea = document.getElementById('testArea');
const instruction = document.getElementById('instruction');
const sameButton = document.getElementById('sameButton');
const differentButton = document.getElementById('differentButton');
const resultArea = document.getElementById('resultArea');
const resultText = document.getElementById('resultText');

startButton.addEventListener('click', startTest);

sameButton.addEventListener('click', () => handleAnswer(true));
differentButton.addEventListener('click', () => handleAnswer(false));

function startTest() {
  startButton.style.display = 'none';
  testArea.style.display = 'block';
  playNextAudio();
}

function playNextAudio() {
  let currentAudio;
  if (currentPhase === "discrimination") {
    currentAudio = discriminationAudios[currentIndex];
  } else {
    currentAudio = identificationAudios[currentIndex];
  }

  const audio = new Audio(currentAudio[1]);
  audio.play();
}

function handleAnswer(isSame) {
  let currentAudio;
  if (currentPhase === "discrimination") {
    currentAudio = discriminationAudios[currentIndex];
  } else {
    currentAudio = identificationAudios[currentIndex];
  }

  const correctAnswer = currentAudio[0].split('-')[0] === currentAudio[0].split('-')[1];

  if (isSame === correctAnswer) {
    if (currentPhase === "discrimination") {
      discriminationScore++;
    } else {
      identificationScore++;
    }
  }

  currentIndex++;
  if (currentPhase === "discrimination" && currentIndex >= discriminationAudios.length) {
    currentPhase = "identification";
    currentIndex = 0;
  } else if (currentPhase === "identification" && currentIndex >= identificationAudios.length) {
    endTest();
    return;
  }

  playNextAudio();
}

function endTest() {
  testArea.style.display = 'none';
  resultArea.style.display = 'block';
  resultText.textContent = `Ergebnis: \nLautunterscheidung: ${discriminationScore} Punkte\nLautidentifizierung: ${identificationScore} Punkte`;

  setTimeout(() => {
    saveResultsAsPDF();
  }, 5000);
}

function saveResultsAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const timestamp = getFormattedDateTime();

  doc.text("Ergebnisse Lautunterscheidung- und identifizierung", 10, 10);
  doc.text(`Lautunterscheidung: ${discriminationScore} Punkte`, 10, 20);
  doc.text(`Lautidentifizierung: ${identificationScore} Punkte`, 10, 30);
  
  doc.save(`Diskrimination_${timestamp}.pdf`);
  redirectToURL();
}

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

function redirectToURL() {
  window.location.href = "https://dichotischer-hoertest.glitch.me";
}
