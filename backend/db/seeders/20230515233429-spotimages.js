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
        url: 'https://i.pinimg.com/originals/12/e4/f4/12e4f412391c201fffe3d35a59ed2634.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.redd.it/gf94vegmlg851.png',
        preview: false
      }, {
        spotId: 1,
        url: 'https://static.wikia.nocookie.net/theregularshow/images/6/62/S4E07_The_Park_Restroom_Building.png/revision/latest?cb=20150204152706',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://static.wikia.nocookie.net/heroism/images/3/3f/Park_%28Regular_Show%29.png/revision/latest?cb=20220821053303',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://m.media-amazon.com/images/M/MV5BNDQzMmRkOGEtMGM0Mi00OWUwLTgxOGUtZGY0M2JhNTc0YmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.architecturaldigest.com/photos/59df83d8b237417e2f905bff/master/w_1600%2Cc_limit/breaking%2520bad%2520pizza.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://na.rdcpix.com/625946635/a545dc497c1d4e1385851ca5e12f5a14w-c0rd-w832_h468_r4_q80.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.fancypantshomes.com/wp-content/uploads/2020/03/i4vv3chonujt-compressor.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.fancypantshomes.com/wp-content/uploads/2020/03/original_1333066725walts.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://preview.redd.it/p8xyvto7e8p61.jpg?width=640&crop=smart&auto=webp&s=dcf3b456daa8ebd6a2958756830b77e4ea0fb78e',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://heroichollywood.com/wp-content/uploads/2023/05/Avengers-Tower-MCU.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://e0.pxfuel.com/wallpapers/390/958/desktop-wallpaper-artstation-stark-tower-the-avengers-fan-art-binh-le.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: "https://pbs.twimg.com/media/CRR_yZlUAAApUKn.jpg",
        preview: true
      }, {
        spotId: 3,
        url: "https://i.pinimg.com/originals/f3/17/14/f31714a3991ac1d00a2c469ae7684d73.jpg",
        preview: true
      }, {
        spotId: 3,
        url: "https://pm1.aminoapps.com/7773/cedf7f2e71046c56843a6c15e2293e7d6394137br1-2048-852v2_hq.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://static.planetminecraft.com/files/resource_media/screenshot/1418/the_watterson__s_house_by_wani_ramirez-d5pdbol_lrg.jpg",
        preview: true
      },{
        spotId: 4,
        url: "https://static.wikia.nocookie.net/theamazingworldofgumball/images/a/a3/The_Wattersons%27_House.png/revision/latest?cb=20230411072913",
        preview: false
      },
      {
        spotId: 4,
        url: "https://static.wikia.nocookie.net/theamazingworldofgumballfanfic/images/e/e5/WattersonLivingRoom.png/revision/latest/scale-to-width-down/1000?cb=20120402171358",
        preview: false
      },
      {
        spotId: 4,
        url: "https://static.wikia.nocookie.net/theamazingworldofgumballfanfic/images/0/03/Room.jpg/revision/latest?cb=20120402170904",
        preview: false
      },
      {
        spotId: 4,
        url: "https://static.wikia.nocookie.net/theamazingworldofgumballfanfic/images/2/25/Gumball_Flushed.jpg/revision/latest?cb=20120402170817",
        preview: false
      },
      {
        spotId: 5,
        url: "https://external-preview.redd.it/ja2rwASy69ySlG3q_Brb8RhD7Sq2gzUEqSxxAbomVS8.png?auto=webp&s=d94d3cd074c7933031287abca2bcfc9735c1c8a6",
        preview: true
      },
      {
        spotId: 6,
        url: "https://upload.wikimedia.org/wikipedia/en/3/37/Batcave-Batman1.png",
        preview: true
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
