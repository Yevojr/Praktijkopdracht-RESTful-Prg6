import express from "express"
import Game from "../models/Game.js";
import {faker} from "@faker-js/faker";
import e from "express";

const router = express.Router();


router.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.status(204).send();
})

router.get('/', async (req, res) => {
    const games = await Game.find();

    res.json({
        "items": [games],
        "_links": {
            "self": {
                "href": `${process.env.HOST}games`,
            },
            "collection": {
                "href": `${process.env.HOST}games`,
            }
        }
    })
});

router.options('/seed', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.status(204).send();
});

router.post('/seed', async (req, res) => {
   try
   {
       await Game.deleteMany({});
       // console.log(req.body.amount);

       for (let i = 0; i < req.body.amount; i++) {
           await Game.create({
               title: faker.word.adverb(),
               description: faker.lorem.paragraph({min: 2, max: 5}),
               genre: faker.word.noun(),
               image: faker.image.url(),
               releaseDate: faker.date.anytime(),
               rating: faker.number.int({min: 1, max: 10}),
           });
       }

       res.status(201).json({message: `${req.body.amount} games have been added!`});
   } catch (e) {
       console.log(e);
       res.status(400).send()
   }
});

router.options('/create', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
});

router.post('/create', async (req, res) => {
    try
    {
        await Game.create({
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            image: req.body.image,
            releaseDate: req.body.releaseDate,
            rating: req.body.rating,
        });

        res.status(201).json({message: `${req.body.title} games have been created!`});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});


router.options('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, PATCH, OPTIONS');
    res.status(204).send();
});


router.get('/:id', async (req, res) => {
    try
    {
        const game = await Game.findOne({_id:req.params.id})
        res.json(game)
    } catch (e) {
        console.log(e);
        res.status(404).send()
    }
});

router.put('/:id', async (req, res) => {

});

router.post('/:id', async (req, res) => {
    try
    {
        await Game.updateOne({
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            image: req.body.image,
            releaseDate: req.body.releaseDate,
            rating: req.body.rating,
        });

        res.status(201).json({message: `${req.body.title} has been added!`});

    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
});

router.delete('/:id', async (req, res) => {
    try
    {
        await Game.deleteOne({_id:req.params.id})
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(404).send()
    }
});
export default router;