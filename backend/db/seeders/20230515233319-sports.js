'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Cozy Cabin',
        description: 'A beautiful cabin in the woods',
        price: 150.0,
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
        price: 500.0,
      },
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
