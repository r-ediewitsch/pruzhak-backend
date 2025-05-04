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
app.use(cors());

app.use("/user", userRoutes);
app.use("/music", musicRoutes);
app.use("/concert", concertRoutes);
app.use("/artist", artistRoutes);
app.use("/ticket", ticketRoutes);

module.exports = app;