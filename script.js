document.getElementById('countdown-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const eventName = document.getElementById('event-name').value;
    const eventDate = new Date(document.getElementById('event-date').value).getTime();
  
    // Show the countdown display
    const display = document.getElementById('countdown-display');
    display.style.display = 'block';
    document.getElementById('event-title').textContent = eventName;
  
    // Countdown logic
    const timer = document.getElementById('timer');
    const updateTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      if (distance < 0) {
        clearInterval(updateTimer);
        timer.textContent = 'Event has ended!';
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  
    // Generate embed code
    const embedCode = `<iframe src="${window.location.href}?event=${encodeURIComponent(eventName)}&date=${encodeURIComponent(eventDate)}" width="300" height="150" frameborder="0"></iframe>`;
    document.getElementById('embed-code').value = embedCode;
  });
  
  // Copy embed code to clipboard
  function copyEmbedCode() {
    const embedCode = document.getElementById('embed-code');
    embedCode.select();
    document.execCommand('copy');
    alert('Embed code copied to clipboard!');
  }
  
  // Handle embedded countdown from URL params (for iframe)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('event') && urlParams.has('date')) {
    const eventName = urlParams.get('event');
    const eventDate = parseInt(urlParams.get('date'));
    document.body.innerHTML = `<h2>${eventName}</h2><div id="timer"></div>`;
    const timer = document.getElementById('timer');
    
    const updateTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      if (distance < 0) {
        clearInterval(updateTimer);
        timer.textContent = 'Event has ended!';
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }