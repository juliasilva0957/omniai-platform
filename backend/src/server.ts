
import express from "express";
import usersRoutes from "./modules/users/users.routes.js";
import conexao from "./config/database.js";
import companiesRoutes from "./modules/companies/companies.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "OmniAI está funcionando!",
        timestamp: new Date()
    });
});

app.use("/users", usersRoutes);
app.use("/companies", companiesRoutes);
app.use("/auth", authRoutes);

async function testarConexao() {
    try {
        const [resultado] = await conexao.query("SELECT 1 AS teste");

        console.log("MySQL conectado com sucesso!");
        console.log(resultado);
    } catch (erro) {
        console.error("Erro ao conectar com MySQL:", erro);
    }
}

testarConexao();


app.listen(3333, () => {
    console.log("OmniAI rodando na porta 3333");
});
