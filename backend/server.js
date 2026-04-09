const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_guardian_key';

const dbPath = path.join(__dirname, 'db.json');

// Helper to initialize and read DB
const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

// Helper to save DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password.includes('@')) {
      return res.status(400).json({ message: 'Password must contain an @ symbol.' });
    }

    const db = readDB();

    if (db.users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      completedModules: []
    };

    db.users.push(newUser);
    writeDB(db);

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: newUser.id, username: newUser.username, completedModules: newUser.completedModules } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password.includes('@')) {
      return res.status(400).json({ message: 'Password must contain an @ symbol.' });
    }

    const db = readDB();
    
    const user = db.users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, completedModules: user.completedModules } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Middleware ---
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- Progress Routes ---
app.get('/api/progress', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.completedModules);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/progress/complete', authMiddleware, (req, res) => {
  try {
    const { moduleId } = req.body;
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    if (!db.users[userIndex].completedModules.includes(moduleId)) {
      db.users[userIndex].completedModules.push(moduleId);
      writeDB(db);
    }
    
    res.json(db.users[userIndex].completedModules);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Guardian Path Local JSON Backend running safely on port ${PORT}`);
});
