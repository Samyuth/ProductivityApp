const express = require('express');
const fs = require('fs');
const cors=require("cors");

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    fs.readFile("test.txt", 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return;
        }

        res.json({"text": data});
    });
})

app.post("/", (req, res) => {
    const data = req.body.data;

    fs.writeFile('test.txt', data, (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
    
        res.status(200);
      });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));