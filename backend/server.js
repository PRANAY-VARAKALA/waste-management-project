const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Middleware for basic auth
const basicAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || auth !== 'Basic ' + Buffer.from('admin:password123').toString('base64')) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

// API Routes
app.get('/requests', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/requests', basicAuth, (req, res) => {
    const { location } = req.body;
    let data = readData();
    const newRequest = {
        id: Date.now(), // Unique ID based on timestamp
        location,
        status: 'Pending'
    };
    data.push(newRequest);
    writeData(data);
    res.json(newRequest);
});

app.put('/requests/:id', basicAuth, (req, res) => {
    const { id } = req.params;
    const { location, status } = req.body;
    let data = readData();
    const request = data.find(req => req.id == id);
    if (request) {
        if (location) request.location = location;
        if (status) request.status = status;
        writeData(data);
        res.json(request);
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

app.delete('/requests/:id', basicAuth, (req, res) => {
    const { id } = req.params;
    let data = readData();
    const index = data.findIndex(req => req.id == id);
    if (index !== -1) {
        data.splice(index, 1);
        writeData(data);
        res.json({ message: 'Request deleted' });
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
