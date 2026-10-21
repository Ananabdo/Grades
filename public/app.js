const gradeGrid = document.getElementById('gradesGrid');
const totalCountEl = document.getElementById('totalCount');
const avgScoreEl = document.getElementById('avgScore');
const passedCountEl = document.getElementById('passedCount');
const ringValueEl = document.getElementById('ringValue');
const performanceTextEl = document.getElementById('performanceText');
const classLabelEl = document.getElementById('classLabel');
const statusTextEl = document.getElementById('statusText');

function renderGradeCard(grade) {
  const score = Number(grade.score || 0);
  const pillClass = score >= 70 ? 'good' : score >= 60 ? 'warn' : 'bad';
  const pillText = score >= 70 ? 'Pass' : score >= 60 ? 'Borderline' : 'Fail';

  return `
    <article class="grade-card">
      <div class="meta">
        <span>${grade.className || 'N/A'}</span>
        <span class="pill ${pillClass}">${pillText}</span>
      </div>
      <strong>${score}</strong>
      <div class="muted">${grade.studentName || 'Unknown student'}</div>
      <div style="margin-top: 10px; color: var(--soft);">${grade.subject || 'Unknown subject'}</div>
    </article>
  `;
}

async function loadGrades() {
  statusTextEl.textContent = 'Fetching data...';
  try {
    const response = await fetch('/grades');
    const grades = await response.json();
    gradeGrid.innerHTML = grades.slice(0, 6).map(renderGradeCard).join('');

    const total = grades.length;
    const average = total
      ? grades.reduce((sum, item) => sum + Number(item.score || 0), 0) / total
      : 0;
    const passed = grades.filter((item) => Number(item.score || 0) >= 70).length;

    totalCountEl.textContent = total;
    avgScoreEl.textContent = average.toFixed(1);
    passedCountEl.textContent = passed;

    const ringPercent = Math.min(100, Math.max(0, average));
    ringValueEl.textContent = `${Math.round(ringPercent)}%`;
    document.querySelector('.ring').style.background = 'conic-gradient(var(--primary) 0 ' + ringPercent + '%, rgba(148, 163, 184, 0.18) ' + ringPercent + '% 100%)';
    performanceTextEl.textContent = average >= 70 ? 'Strong overall performance' : average >= 60 ? 'Steady progress' : 'Needs attention';
    classLabelEl.textContent = grades[0]?.className || 'Class A';
    statusTextEl.textContent = `Loaded ${total} records`;
  } catch (error) {
    statusTextEl.textContent = 'Could not load grades';
    gradeGrid.innerHTML = '<div class="muted">Unable to fetch grade data.</div>';
    console.error(error);
  }
}

document.getElementById('refreshBtn').addEventListener('click', loadGrades);
document.getElementById('apiBtn').addEventListener('click', () => {
  window.location.href = '/grades';
});

loadGrades();
