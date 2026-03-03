const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Initialize the database connection
require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// --- UPLOADS MANAGEMENT ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

/// --- DEPLOYMENT: SERVE FRONTEND BUILD ---
// 1. Serve static files (CSS, JS, Images) from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// 2. THE NO-PATH FIX: This middleware catches any request that 
// didn't match an API route and sends the React index.html.
app.use((req, res, next) => {
    // If the request is for an API, but wasn't found, move to the next error handler
    if (req.url.startsWith('/api')) {
        return next();
    }
    // Otherwise, send the React app
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 3. Optional: Basic error handler for broken API calls
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 Access system at http://localhost:${PORT}`);
});