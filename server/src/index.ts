import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/dbConfig";
import Deck from "./models/Deck"

const app = express();

app.use(express.json());

app.post("/decks", async(req: Request, res: Response)=>{
    const newDeck = new Deck({
        title: req.body.title
    })
    const createDeck = await newDeck.save();
    res.json(createDeck)
})

app.get("/", (req, res)=>{
    res.send("Hello world")
})

const port = process.env.PORT || 5000;

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
})