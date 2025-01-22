import express from "express"
import Game from "../models/Game.js";
import {faker} from "@faker-js/faker";


const router = express.Router();


router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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


router.post('/', async (req, res) => {
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
        console.log(req.body)

        res.status(201).json({message: `${req.body.title} has been created!`});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});


router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, PATCH, OPTIONS');
    res.status(204).send();
});


router.get('/:id', async (req, res) => {
    try
    {
        const game = await Game.findOne({_id:req.params.id})

        if (!game) {
            res.status(404).json({message: `Game not found!`});
        } else {
            res.json({game})
        }

    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

// router.put('/:id', async (req, res) => {
//     try
//     {
//         await Game.
//
//     } catch (e) {
//         console.log(e);
//         res.status(404).send()
//     }
// });

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
        const game = await Game.deleteOne({_id:req.params.id});
        if (!game) {
            res.status(404).json({message: `Game not found!`});
        } else {
            res.status(200).json({message: "Game has been deleted!"});
        }

    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
});
export default router;