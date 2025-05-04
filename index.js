require("dotenv").config();

const userRoutes = require('./routes/UserRoute');
const musicRoutes = require('./routes/MusicRoute');
const concertRoutes = require('./routes/ConcertRoute');
const artistRoutes = require('./routes/ArtistRoute');

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const port = process.env.PORT;
const app = express();

// connect to database
db.connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);

// status
app.get('/status', (req, res) => {
    res.status(200).send({ status: "Server is running" });
})

app.use("/user", userRoutes);
app.use("/music", musicRoutes);
app.use("/concert", concertRoutes);
app.use("/artist", artistRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on PORT ${port}`);
})