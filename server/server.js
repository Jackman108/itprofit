const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import validateForm from '../src/validation';

const app = express();

const port = 9090;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/registration", (req, res) => {
    console.log("Received data:", req.body);

    // Проверка наличия ошибок в данных
    const errors = validateForm(req.body);

    // Если есть ошибки, возвращаем объект с ошибками
    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            status: "error",
            fields: errors
        });
        return;
    }

    // В противном случае, возвращаем успешный статус
    res.status(200).json({
        status: "success",
        msg: "You are registered"
    });
});

app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});