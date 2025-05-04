require("dotenv").config();

const userRoutes = require('../routes/UserRoute');
const musicRoutes = require('../routes/MusicRoute');
const concertRoutes = require('../routes/ConcertRoute');
const artistRoutes = require('../routes/ArtistRoute');
const ticketRoutes = require('../routes/TicketRoute');

const express = require('express');
const cors = require('cors');
const db = require('../config/db');

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
app.get('/api/status', (req, res) => {
    res.status(200).send({ status: "Server is running" });
})

// Update routes to include /api prefix
app.use("/api/user", userRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/concert", concertRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/ticket", ticketRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`🚀 Server is running on PORT ${port}`);
    });
}

module.exports = app;