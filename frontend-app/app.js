// API base URL — uses relative path so Nginx proxies to backend
const API_BASE = '/api';

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Load items from backend on page load
async function loadItems() {
  const container = document.getElementById('itemList');
  if (!container) return;
  try {
    const res = await fetch(`${API_BASE}/items`);
    const { data } = await res.json();
    container.innerHTML = data.map(item => `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p>Failed to load items.</p>';
  }
}

// Contact form — posts to backend
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const [name, email, message] = [...this.querySelectorAll('input, textarea')].map(el => el.value);
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();
    alert(data.message || 'Message sent!');
    this.reset();
  } catch (err) {
    alert('Failed to send message. Please try again.');
  }
});

// Check backend health
async function checkHealth() {
  const el = document.getElementById('healthStatus');
  if (!el) return;
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    el.textContent = `Backend: ${data.message}`;
    el.style.color = '#2ecc71';
  } catch {
    el.textContent = 'Backend: Unreachable';
    el.style.color = '#e74c3c';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadItems();
  checkHealth();
});
