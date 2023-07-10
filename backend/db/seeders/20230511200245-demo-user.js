'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Walter',
        lastName: 'White',
        email: 'thedanger@gmail.com',
        username: 'Heisenberg',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'avenger@gmail.com',
        username: 'Ironman',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Gumball',
        lastName: 'Watterson',
        email: 'gum@gmail.com',
        username: 'Gumballboi',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('password123')
      }
    ], {});
  },
  // 'RigbyMordecai', 'Ironman', 'Gumball', 'Demo-lition', 'Batman'
  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Heisenberg', 'Ironman', 'Gumballboi','demouser'] }
    }, {});
  }
};
