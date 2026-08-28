const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Example: Get items
app.get('/api/items', (req, res) => {
  const items = [
    { id: 1, name: 'Item One', description: 'First item from backend' },
    { id: 2, name: 'Item Two', description: 'Second item from backend' },
    { id: 3, name: 'Item Three', description: 'Third item from backend' },
  ];
  res.json({ success: true, data: items });
});

// Example: Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }
  // In production, save to DB or send email here
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: `Thanks ${name}, we received your message!` });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: [
      { label: 'Total Users', value: '1,240' },
      { label: 'Items Available', value: '3' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Version', value: 'v2.0' },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
