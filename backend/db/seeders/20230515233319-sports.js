'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '123 Park Lane',
      city: 'Elmore',
      state: 'CartoonNetwork',
      country: 'United States',
      lat: 37.7749,
      lng: -118.2437,
      name: 'Regular Show House',
      description: "The Regular Show",
      price: 300.0
    },
    {
      ownerId: 1,
      address: '9809 Margo Street SW',
      city: ' Albuquerque',
      state: 'New Mexico',
      country: 'United States',
      lat: 48.7989,
      lng: -169.2697,
      name: 'Breaking Bad House',
      description: "i am the danger",
      price: 120.0
    },
    {
      ownerId: 2,
      address: '555 Avengers Avenue',
      city: 'New York City',
      state: 'NewYork',
      country: 'United States',
      lat: 34.0522,
      lng: -118.2437,
      name: 'Stark Tower',
      description: "Stark Tower is a famous bu .",
      price: 590.0,
    },
    {
      ownerId: 3,
      address: '12 Cartoon Lane',
      city: 'Elmore',
      state: 'CartoonNetwork',
      country: 'United States',
      lat: 35.679,
      lng: 70.3459,
      name: 'Amazing World of Gumball House',
      description: "The Amazing World of Gumball house is a .",
      price: 599.99
    },
    {
      ownerId: 4,
      address: '124 Island Dr',
      city: 'Dragonball',
      state: 'Hawaii',
      country: 'United States',
      lat: 88.9832,
      lng: 46.3455,
      name: 'Kame House',
      description: 'Warriors are made here!',
      price: 189.99
    },
    {
      ownerId: 5,
      address: '112 Unknown st',
      city: 'Gotham',
      state: 'New Jersey',
      country: 'United States',
      lat: 30.13545,
      lng: 45.78989,
      name: 'Bat Cave',
      description: "The Bat Cave is Batmans.",
      price: 20.99
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
