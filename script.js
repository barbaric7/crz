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
