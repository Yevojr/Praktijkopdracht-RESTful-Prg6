import express from "express"
import Game from "../models/Game.js";
import {faker} from "@faker-js/faker";

const router = express.Router();


router.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.status(204).send();
})

router.get('/', async (req, res) => {
    const games = await Game.find();

    res.json({
        items: [games],
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.status(204).send();
});

router.post('/seed', async (req, res) => {
   try
   {
       await Game.deleteMany({});
       console.log(req.body.amount);

       for (let i = 0; i < req.body.amount; i++) {
           await Game.create({
               title: faker.word.adverb(),
               description: faker.lorem.paragraph({min: 2, max: 5}),
               genre: faker.word.noun(),
           });
       }

       res.json({message: `${req.body.amount} games have been added!`})
   } catch (e) {
       console.log(e);
       res.status(400).send()
   }
})

router.options('/:id', (req, res) => {

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

router.post('/:id', async (req, res) => {

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