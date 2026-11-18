
import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "OmniAI está funcionando!",
        timestamp: new Date()
    });
});

app.listen(3333, () => {
    console.log("OmniAI rodando na porta 3333");
});
