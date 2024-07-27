const express = require('express')
// const { faker } = require('@faker-js/faker')
const UsersService = require('../services/users.service')

const router = express.Router()

const service = new UsersService()

router.get('/',async  (req, res) => {
  const users = await service.find()
  res.json(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    image: faker.image.imageUrl(),
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Creation',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Update',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted element',
    id
  });
});

module.exports = router
