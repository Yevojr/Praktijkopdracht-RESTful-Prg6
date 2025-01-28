import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: String, required: false, default: "January 1st, 2000", },
    rating: { type: Number, required: false, default: "0", },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret._links = {
                self: {
                    href: `${process.env.HOST_URL}${ret._id}`
                },
                collection: {
                    href: `${process.env.HOST_URL}`
                }
            }
            delete ret._id;
        }
    }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

