const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const Inventory = require('./models/inventoryModel');

app.use(cors());

app.use(bodyparser.json({extended: false}));

app.get('/items', (req, res) => {
   Inventory.findAll()
   .then((items) => {
    const data = [];
    for (let i of items) {
      data.push(i.dataValues);
    }
    res.json(data);
  })
  .catch((err) => console.log(err));
});

app.post('/items', (req, res) => {
    const item = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    Inventory.create(({
        item,
        description,
        price,
        quantity
    }))
    .then((result) => res.json(result.dataValues))
    .catch((err) => console.log(err));
})

app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    Inventory.update({quantity: req.body.quantity}, {where: {id: id}})
    .then(() => res.sendStatus('200'))
    .catch(err => console.log(err));
})


sequelize.sync()
.then(() => app.listen(3000))
.catch(err => console.log(err))