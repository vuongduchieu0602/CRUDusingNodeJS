const express = require('express');
const route = express.Router();

const service = require('../services/render');
const controller = require('../controller/controller');

//@desc Home
//@method GET /
route.get('/', service.homeRouter);

//@desc Add User
//@method GET /add-user
route.get('/add-user', service.add_user);

//@desc Update User
//@method GET /update-user
route.get('/update-user', service.update_user);

//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;