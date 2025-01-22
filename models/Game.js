import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    image: {type: String, required: false, default: null, },
    releaseDate: { type: String, required: false, default: "January 1st, 2000", },
    rating: { type: Number, required: false, default: "0", },
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret._links = {
                self: {
                    href: `${process.env.HOST}${ret._id}`
                },
                collection: {
                    href: `${process.env.HOST}`
                }
            }
            delete ret._id;
        }
    }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

