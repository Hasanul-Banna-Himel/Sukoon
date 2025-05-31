let reminders = [];

async function loadReminders() {
  const response = await fetch('reminders.json');
  reminders = await response.json();
  loadReminder();
}

function loadReminder() {
  if (reminders.length === 0) return;
  const random = reminders[Math.floor(Math.random() * reminders.length)];

  document.getElementById('type').textContent = random.type;
  document.getElementById('text').textContent = random.text;
  document.getElementById('translation').textContent = random.translation;
  document.getElementById('reference').textContent = `— ${random.reference}`;
}

window.onload = loadReminders;
