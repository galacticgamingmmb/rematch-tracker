import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.get('/rango', (req, res) => {
    const data = fs.readFileSync('data.txt', 'utf-8');
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
