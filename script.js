const BASE_URL = "https://raw.githubusercontent.com/barbaric7/daa_algorithms/main/";
function getFileFromURL() {
  return window.location.pathname.slice(1);
}

function mapInputToFile(input) {
  // If user enters number → map to assignment file
  if (/^\d+$/.test(input)) {
    return `assignment_${input}.txt`;
  }
  return input; // otherwise use as-is
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
  loadAssignment(val);
}

window.onload = () => loadAssignment();

function copyText() {
  const text = document.getElementById("output").textContent;

  // Modern method
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

// Fallback method (VERY IMPORTANT)
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Avoid scrolling
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    // silently fail (as you wanted no alerts)
  }

  document.body.removeChild(textarea);
}
