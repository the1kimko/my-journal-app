const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entries');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/entries', entryRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Journal API running on http://localhost:${PORT}`));
