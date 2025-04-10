const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(cors());
app.use(express.json())

const userRoute = require('./routes/userRoute');
const forgotPassRoute = require('./routes/forgotPass');

app.use('/api/auth', userRoute);
app.use('/api/setting', forgotPassRoute); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected...')
    })
    .catch((err) => {
        console.error('Connection failed:', err.message)
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
