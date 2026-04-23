const BASE_URL = "https://raw.githubusercontent.com/barbaric7/daa_algorithms/main/";
function getFileFromURL() {
  return window.location.pathname.slice(1);
}

function mapInputToFile(input) {
  if (/^\d+$/.test(input)) {
    return `assignment_${input}.txt`;
  }
  return input; 
}

async function loadAssignment(file = null) {
  const rawInput = file || getFileFromURL();

  if (!rawInput) {
    document.getElementById("output").textContent =
      "👉 Try: 3 or dijkstra.java";
    return;
  }

  const filename = mapInputToFile(rawInput);
  const url = BASE_URL + filename;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      document.getElementById("output").textContent =
        `❌ File not found: ${filename}`;
      return;
    }

    const text = await res.text();
    document.getElementById("output").textContent = text;

  } catch {
    document.getElementById("output").textContent =
      "⚠️ Network error";
  }
}

function loadAssignmentFromInput() {
  const val = document.getElementById("input").value.trim();
  if (val) {
    loadAssignment(val);
  }
}

window.onload = () => loadAssignment();

function copyText() {
  const text = document.getElementById("output").textContent;
  const btn = document.getElementById("copyBtn");

  const showSuccess = () => {
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = "Copy", 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(showSuccess)
      .catch(() => {
        fallbackCopy(text);
        showSuccess();
      });
  } else {
    fallbackCopy(text);
    showSuccess();
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {}
  document.body.removeChild(textarea);
}

// --- NEW FEATURE: Trigger search on typing ---
let typingTimer;
const searchInput = document.getElementById('input');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    // Wait 400ms after the user stops typing to trigger the fetch. 
    // This prevents sending a network request for every single letter typed.
    typingTimer = setTimeout(loadAssignmentFromInput, 400);
  });
}
