async function loadReminder() {
  try {
    const response = await fetch('reminders.json');
    const data = await response.json();
    const random = data[Math.floor(Math.random() * data.length)];

    document.getElementById('type').textContent = random.type || '';
    document.getElementById('text').textContent = random.text || '';
    document.getElementById('translation').textContent = random.translation || '';
    document.getElementById('ref').textContent = random.reference || '';

  } catch (error) {
    console.error('❌ Failed to load reminder:', error);
    document.getElementById('text').textContent = 'Unable to load reminder. Please check your internet connection.';
  }
}


window.addEventListener('DOMContentLoaded', () => {
  loadReminder();

  document.getElementById('new-reminder').addEventListener('click', loadReminder);
});



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('❌ Service Worker registration failed:', err));
  });
}



let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  
  e.preventDefault();
  deferredPrompt = e;

  
  const installBox = document.getElementById('install-prompt');
  if (installBox) installBox.style.display = 'block';

  
  document.getElementById('install-btn').addEventListener('click', () => {
    installBox.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('✅ User accepted the install');
      } else {
        console.log('❌ User dismissed the install');
      }
      deferredPrompt = null;
    });
  });

 
  document.getElementById('dismiss-btn').addEventListener('click', () => {
    installBox.style.display = 'none';
  });
});