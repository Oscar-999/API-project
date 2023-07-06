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
      description: "The Regular Show House is a vibrant and eccentric residence located in Elmore. With its charmingly weathered exterior and a lawn adorned with quirky ornaments, it reflects the show's playful nature. Inside, each room is filled with mismatched furniture, colorful decor, and a unique style that represents the characters' personalities. From the bustling kitchen to the chaotic bedrooms and the mysterious basement, the house is a delightful and imaginative backdrop for the show's zany adventures.",
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
      description: "The Breaking Bad house: Where chemistry meets chaos, where the aroma of danger lingers in the air, and where even the roof has an intense, gripping storyline. It's a home that will blow your mind, quite literally.",
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
      description: "Stark Tower is a famous building located in the heart of a bustling city. It is a tall and sleek structure that stands out in the skyline. Originally owned by the renowned inventor and superhero Tony Stark, also known as Iron Man, the tower served as his personal residence and headquarters. It was designed with state-of-the-art technology and had various advanced features, making it a symbol of innovation. Stark Tower was equipped with a spacious lab for scientific research, a luxurious penthouse for Tony Stark, and high-tech facilities for crime-fighting. Over the years, it became a prominent landmark and a symbol of superhero presence in the city.",
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
      description: "The Amazing World of Gumball house is a colorful and ever-changing suburban home in the fictional town of Elmore. It serves as the backdrop for the comedic and imaginative adventures of Gumball and his family. Each room has its own unique personality, filled with whimsical elements that contribute to the show's humor and creativity.",
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
      description: "The Bat Cave is Batman's secret underground headquarters located beneath Wayne Manor. It's a vast, dimly lit cave complex that serves as a high-tech sanctuary and base of operations for the Dark Knight and his allies.",
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
