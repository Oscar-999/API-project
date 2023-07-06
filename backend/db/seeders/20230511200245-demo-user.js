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
      // {
      //   firstName: 'Dylan',
      //   lastName: 'Kingston',
      //   email: 'kingdylan@gmail.com',
      //   username: 'dylankinging',
      //   hashedPassword: bcrypt.hashSync('password1')
      // },
      // {
      //   firstName: 'Peter',
      //   lastName: 'Cuh',
      //   email: 'petoe@gmail.com',
      //   username: 'PetierCuh',
      //   hashedPassword: bcrypt.hashSync('password2')
      // },
      // {
      //   firstName: 'Jose',
      //   lastName: 'Jermenaz',
      //   email: 'josej@gmail.com',
      //   username: 'joseman',
      //   hashedPassword: bcrypt.hashSync('password3')
      // }
      {
        firstName: 'Mordecai',
        lastName: 'Yoo',
        email: 'thepark@gmail.com',
        username: 'RigbyMordecai',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'ironman@gmail.com',
        username: 'Ironman',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Gumball',
        lastName: 'Watterson',
        email: 'gumball@gmail.com',
        username: 'Gumball',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Son',
        lastName: 'Goku',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password3')
      },
       {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'bat@gmail.com',
        username: 'Batman',
        hashedPassword: bcrypt.hashSync('password3')
      },
    ], {});
  },
  // 'RigbyMordecai', 'Ironman', 'Gumball', 'Demo-lition', 'Batman'
  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['RigbyMordecai', 'Ironman', 'Gumball', 'Demo-lition', 'Batman'] }
    }, {});
  }
};
