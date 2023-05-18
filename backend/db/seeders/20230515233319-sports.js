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
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      lat: 37.7749,
      lng: -118.2437,
      name: 'Cozy Cabin',
      description: 'A beautiful cabin in the woods',
      price: 300.0
    },  
    {
      ownerId: 1,
      address: '123 Jose Dr',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 48.7989,
      lng: -169.2697,
      name: 'Beautiful Resort',
      description: 'Water park near by',
      price: 120.0
    },
    {
      ownerId: 2,
      address: '456 Elm Street',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      lat: 34.0522,
      lng: -118.2437,
      name: 'Luxury Villa',
      description: 'A luxurious villa with stunning views',
      price: 590.0,
    },
    {
      ownerId: 3,
      address: '917 Ohio Street',
      city: 'Joliet',
      state: 'New York',
      country: 'United States',
      lat: 35.679,
      lng: 70.3459,
      name: 'New York House',
      description: 'Great price!',
      price: 599.99
    },
    {
      ownerId: 3,
      address: '124 Hobbs Ave',
      city: 'Joliet',
      state: 'Ohio',
      country: 'United States',
      lat: 88.9832,
      lng: 46.3455,
      name: 'Bad house',
      description: 'Bad price!',
      price: 189.99
    },
    {
      ownerId: 3,
      address: '112 Dance Street',
      city: 'San Jose',
      state: 'Kentucky',
      country: 'United States',
      lat: 30.13545,
      lng: 45.78989,
      name: 'Beach house',
      description: 'Great place!',
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
