const BASE_URL = "https://raw.githubusercontent.com/barbaric7/daa_algorithms/main/";

function getAssignmentFromURL() {
  return window.location.pathname.slice(1);
}

async function loadAssignment(num = null) {
  const file = num || getAssignmentFromURL();

  if (!file) {
    document.getElementById("output").textContent =
      "👉 Enter a filename like: knapsack.cpp";
    return;
  }

  const url = BASE_URL + file;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      document.getElementById("output").textContent =
        "❌ File not found\n👉 Check filename (case-sensitive)";
      return;
    }

    const text = await res.text();
    document.getElementById("output").textContent = text;

  } catch (err) {
    document.getElementById("output").textContent =
      "⚠️ Network error or blocked request";
  }
}

// Button support
function loadAssignmentFromInput() {
  const val = document.getElementById("input").value.trim();
  loadAssignment(val);
}

// Auto-load from URL
window.onload = () => loadAssignment();
