import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    title: String,
    cards: [String]
})

const deckModel = mongoose.model("Deck", deckSchema);

export default deckModel;