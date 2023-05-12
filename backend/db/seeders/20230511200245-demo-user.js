
'use strict';


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Jose',
        lastName: 'Doe',
        email: 'jose@user.io',
        username: 'Jose-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Peter',
        lastName: 'Cuh',
        email: 'peter@user.io',
        username: 'Peter1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Danny',
        lastName: 'Frankson',
        email: 'dan@user.io',
        username: 'Dan2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Jose-lition', 'Peter1', 'Dan2'] }
    }, {});
  }
};