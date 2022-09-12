const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database");
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

sequelize.sync().then(() => console.log('Database is ready'));

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.get("/", (req, res) => {
    res.json({message: "API working"});
});

app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server started, listening to port: ${PORT}`)
});

module.exports = app;
