const assignedCount = document.getElementById('assigned-count');
const completedCount = document.getElementById('completed-count');
const activityList = document.getElementById('activity-list');
const clearHistoryButton = document.getElementById('clear-history');
const themeButton = document.getElementById('theme-button');
const toast = document.getElementById('toast');

let remainingTasks = Number(assignedCount.textContent);
let totalCompleted = Number(completedCount.textContent);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function setCurrentDate() {
  const today = new Date();
  document.getElementById('weekday').textContent = today.toLocaleDateString('en-GB', {
    weekday: 'short'
  }) + ',';
  document.getElementById('full-date').textContent = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function addActivity(taskTitle) {
  const emptyMessage = activityList.querySelector('.empty-message');
  if (emptyMessage) emptyMessage.remove();

  const entry = document.createElement('p');
  entry.className = 'activity-item';
  const time = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  entry.textContent = `You have completed the task “${taskTitle}” at ${time}`;
  activityList.appendChild(entry);
}

document.querySelectorAll('.complete-button').forEach((button) => {
  button.addEventListener('click', () => {
    const taskCard = button.closest('.task-card');
    const taskTitle = taskCard.querySelector('h2').textContent;

    remainingTasks -= 1;
    totalCompleted += 1;
    assignedCount.textContent = remainingTasks;
    completedCount.textContent = totalCompleted;

    button.disabled = true;
    button.textContent = 'Completed ✓';
    taskCard.classList.add('done');
    addActivity(taskTitle);
    showToast('Board updated successfully');

    if (remainingTasks === 0) {
      window.setTimeout(() => alert('Congratulations! You have completed all the current tasks.'), 250);
    }
  });
});

clearHistoryButton.addEventListener('click', () => {
  activityList.replaceChildren();
  const emptyMessage = document.createElement('p');
  emptyMessage.className = 'empty-message';
  emptyMessage.textContent = 'No activity yet. Complete a task to see it here.';
  activityList.appendChild(emptyMessage);
  showToast('Activity history cleared');
});

const backgroundColours = ['#f2f5ff', '#f4fbf7', '#fff8ef', '#f8f2ff', '#effaff', '#fff3f6'];
let colourIndex = 0;

themeButton.addEventListener('click', () => {
  colourIndex = (colourIndex + 1) % backgroundColours.length;
  document.body.style.backgroundColor = backgroundColours[colourIndex];
});

setCurrentDate();
