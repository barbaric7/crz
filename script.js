function getAssignmentFromURL() {
  const path = window.location.pathname.slice(1);
  return path;
}

async function loadAssignment(num = null) {
  const assignment = num || getAssignmentFromURL();

  if (!assignment) return;

  const url = `https://raw.githubusercontent.com/YOUR_USERNAME/my-assignments/main/${assignment}.txt`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      document.getElementById("output").textContent = "❌ Assignment not found";
      return;
    }

    const text = await res.text();
    document.getElementById("output").textContent = text;

  } catch {
    document.getElementById("output").textContent = "⚠️ Network error";
  }
}

// Button click
function loadAssignmentFromInput() {
  const val = document.getElementById("input").value;
  loadAssignment(val);
}

// Auto-load from URL
window.onload = () => loadAssignment();
