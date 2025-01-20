import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret._links = {
                self: {
                    href: `${process.env.HOST}games/${ret._id}`
                },
                collection: {
                    href: `${process.env.HOST}games`
                }
            }
            delete ret._id;
        }
    }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

