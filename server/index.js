import express from "express";



const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running in port ${PORT}`));