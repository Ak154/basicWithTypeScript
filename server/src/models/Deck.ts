import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    title: String,
})

const deckModel = mongoose.model("Deck", deckSchema);

export default deckModel;