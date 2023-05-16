'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.ubagroup.com/57-marina/wp-content/uploads/sites/4/2021/11/Vacation-tips.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?cs=srgb&dl=pexels-recal-media-60217.jpg&fm=jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.beaches.com/blog/content/images/2020/05/Beaches-Turks-Caicos-Family-Walk-Beach.jpg',
        preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
