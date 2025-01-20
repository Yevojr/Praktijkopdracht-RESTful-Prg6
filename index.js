import express from 'express';
import mongoose from 'mongoose';
// import gamesRouter from './routes/games.js'

const app = express();
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {
    if(req.header('Accept') !== 'application/json' && req.method !== 'OPTIONS') {
        res.status(406).json({error: 'Only JSON is allowed as Accept Header'});
    } else {
        next();
    }
});

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');
    res.status(200).send('Headers are correct.');
});

app.get('/', (req, res) => {
    res.json({message: 'Welcome to my games webservice!'});
});

// app.use("/games", gamesRouter);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Express server listening on port: ' + process.env.EXPRESS_PORT);
});