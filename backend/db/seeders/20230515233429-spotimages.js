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
        url: 'https://i.pinimg.com/originals/1c/56/5b/1c565b959ea86817a5b60f5b0261f16b.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.redd.it/gf94vegmlg851.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.animationmagazine.net/wordpress/wp-content/uploads/Regular-Show-post6.jpg',
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
        url: 'https://www.cheatsheet.com/wp-content/uploads/2021/06/Walter-and-Skyler-White.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.looper.com/img/gallery/why-swimming-pools-mean-more-than-you-think-in-breaking-bad/swimming-pools-highlight-walter-whites-destruction-1617202104.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/albuquerque/Breaking-Bad-RV-Tours-1110-91c4927d5056a36_91c493cc-5056-a36a-09ce5b8798d97612.jpg',
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
        url: "https://m.media-amazon.com/images/M/MV5BNjk3YWQzZTAtYTkxZi00Y2VhLWI2NmYtNTE0YjQzZTMyMmZlXkEyXkFqcGdeQXVyMTM5NjAwNjYz._V1_.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://lightbox-prod.imgix.net/images/uploads/1521404578673-the-amazing-world-of-gumball_1920x1080_16x9.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.pinimg.com/originals/1d/ed/1c/1ded1c99a3f01ea79332f0fe848f5b4e.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://c4.wallpaperflare.com/wallpaper/365/740/884/gumball-cartoon-network-cartoon-hd-wallpaper-thumb.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://external-preview.redd.it/ja2rwASy69ySlG3q_Brb8RhD7Sq2gzUEqSxxAbomVS8.png?auto=webp&s=d94d3cd074c7933031287abca2bcfc9735c1c8a6",
        preview: true
      },
      {
        spotId: 5,
        url: "https://p.turbosquid.com/ts-thumb/t5/Oc9V7r/Tt/0001/png/1635836341/1920x1080/fit_q87/d61999c379b40f3ba93aafff95f1d8c4b6ee12d0/0001.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://1.bp.blogspot.com/-zJDq1wt5rpw/TtUOBl_QxNI/AAAAAAAAGrs/YZKFfFgQoNc/s1600/dbz2-02.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.pinimg.com/originals/ba/64/43/ba6443d734e7b480ffc2e0e47800a21f.png",
        preview: false
      },{
        spotId: 5,
        url: "https://www.ggrecon.com/media/ytidezbo/fortnite-a-familiar-training-location-how-to-visit.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://upload.wikimedia.org/wikipedia/en/3/37/Batcave-Batman1.png",
        preview: true
      },
      {
        spotId: 6,
        url: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/05/Batcave-1.jpg",
        preview: false
      }, {
        spotId: 6,
        url: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2012/08/article-2183250-145EF361000005DC-491_964x588.jpg",
        preview: false
      },{
        spotId: 6,
        url: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/6naGLsQszrynVK8nTCrr6WZnlK4FKF.jpg",
        preview: false
      },{
        spotId: 6,
        url: "https://media.architecturaldigest.com/photos/6228fa1eb39072781eaf9e39/master/w_1600%2Cc_limit/FBT1XK.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1144772846627864707/Screenshot_2023-08-25_181804.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1144772239200362496/b7a3e518ec2ea5993798fdcf57601d95fb9df813v2_hq.png",
        preview: false
      }, {
        spotId: 7,
        url: "https://images-ext-1.discordapp.net/external/t8QNlaAwtQnwG6tZZ3RHmg5Lw_5i9ofKXPa0IP8bxpc/https/oyster.ignimgs.com/mediawiki/apis.ign.com/spongebob-squarepants-battle-for-bikini-bottom-rehydrated/0/05/SpongeBob_SquarePants_Battle_For_Bikini_Bottom_-_Rehydrated_20200613133414.png",
        preview: false
      },{
        spotId: 7,
        url: "https://images-ext-1.discordapp.net/external/eYUtAlVO_P0byR6JvAax0k1WA431XTYKGiM4wgQXdHQ/https/i.pinimg.com/1200x/7b/a9/bb/7ba9bb34424092cad9159040625c3e26.jpg",
        preview: false
      },{
        spotId: 7,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1144772412886491257/spongebob27s-big-red-chair-in-house.png",
        preview: false
      },
      //Spot 8
      {
        spotId: 8,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145117207777509506/simpsonsfamilyhouse-56a009fa3df78cafda9fbc8b.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145116577725956166/742_Evergreen_Terrace.png",
        preview: false
      }, {
        spotId: 8,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145117432470589600/Screenshot_2023-08-26_170635.png",
        preview: false
      },{
        spotId: 8,
        url: "https://images-ext-2.discordapp.net/external/Z7wO5IZWdogKwHoSLSrV8sOYWTj3AoeM1wugWGkcmzo/https/www.collater.al/wp-content/uploads/2019/07/i-Simpson-The-Simpsons-Collater.al-9f-1024x707.jpg",
        preview: false
      },{
        spotId: 8,
        url: "https://images-ext-2.discordapp.net/external/KulzdH0RKbM0CmcheNp6NUqIW7YYgslx0IwuqJNbNmg/https/cdn.mos.cms.futurecdn.net/CFubit7V5muExqJPkbjRwg.jpg",
        preview: false
      },

      //Spot 9
      {
        spotId: 9,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145138129653739611/Screenshot_2023-08-26_182833.png",
        preview: true
      },
      {
        spotId: 9,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145138130073178233/Screenshot_2023-08-26_182849.png",
        preview: false
      }, {
        spotId: 9,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145138130425495632/Screenshot_2023-08-26_182914.png",
        preview: false
      },{
        spotId: 9,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145138130962370581/Screenshot_2023-08-26_182927.png",
        preview: false
      },{
        spotId: 9,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145138131738312746/Screenshot_2023-08-26_182954.png",
        preview: false
      },

      //Spot 10
      {
        spotId: 10,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145137032939704340/Screenshot_2023-08-26_182401.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145137034030223400/Screenshot_2023-08-26_182457.png",
        preview: false
      }, {
        spotId: 10,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145137033484972062/Screenshot_2023-08-26_182421.png",
        preview: false
      },{
        spotId: 10,
        url: "https://images-ext-1.discordapp.net/external/v2rT2cUc59HrTyT5agFqf7gpe9hz6O4sGu6qfFw-3Po/https/mir-s3-cdn-cf.behance.net/project_modules/max_1200/cc117d107478815.5fa84771528fe.jpg",
        preview: false
      },{
        spotId: 10,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145137195108282478/Screenshot_2023-08-26_182615.png",
        preview: false
      },

      //Spot 11
      {
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145136427542269962/Screenshot_2023-08-26_182142.png",
        preview: true
      },
      {
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145136427886198936/Screenshot_2023-08-26_182209.png",
        preview: false
      }, {
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145136428746022922/Screenshot_2023-08-26_182245.png",
        preview: false
      },{
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145136428192387182/Screenshot_2023-08-26_182218.png",
        preview: false
      },{
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145136428465012836/Screenshot_2023-08-26_182231.png",
        preview: false
      },


      //Spot 12
      {
        spotId: 12,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145129222432620575/Screenshot_2023-08-26_175431.png",
        preview: true
      },
      {
        spotId: 12,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145129060738015363/Screenshot_2023-08-26_175353.png",
        preview: false
      }, {
        spotId: 12,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145128729861959720/Screenshot_2023-08-26_175225.png",
        preview: false
      },{
        spotId: 12,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145129406742929489/Screenshot_2023-08-26_175516.png",
        preview: false
      },{
        spotId: 12,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145129536875413514/Screenshot_2023-08-26_175549.png",
        preview: false
      },


      {
        spotId: 13,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145132222710558760/Screenshot_2023-08-26_180542.png",
        preview: true
      },
      {
        spotId: 13,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145132223054487675/Screenshot_2023-08-26_180555.png",
        preview: false
      }, {
        spotId: 13,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145132223356473446/Screenshot_2023-08-26_180612.png",
        preview: false
      },{
        spotId: 13,
        url: "https://images-ext-2.discordapp.net/external/ylbsX3ZVrkSVyOAsDXQ3DFDfKUfsxGnmPTx2rbP5QAY/https/www.theadvertiser.com/gcdn/-mm-/6d46f0a03148c87ce3989a311abc6d55d0153ee9/c%3D0-302-3264-2146/local/-/media/2015/11/17/LAGroup/LafayetteLA/635833823197834471-home1.jpg",
        preview: false
      },{
        spotId: 13,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145131892396531782/Screenshot_2023-08-26_180510.png",
        preview: false
      },


      {
        spotId: 14,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145130667567497226/Screenshot_2023-08-26_175958.png",
        preview: true
      },
      {
        spotId: 14,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145130668205015110/Screenshot_2023-08-26_175852.png",
        preview: false
      }, {
        spotId: 14,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145130667907240016/Screenshot_2023-08-26_175910.png",
        preview: false
      },{
        spotId: 14,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145130747250868305/Screenshot_2023-08-26_175810.png",
        preview: false
      },{
        spotId: 14,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145130747561254912/Screenshot_2023-08-26_175739.png",
        preview: false
      },


      {
        spotId: 15,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145123519374573680/Screenshot_2023-08-26_173151.png",
        preview: true
      },
      {
        spotId: 15,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145124350018736198/Screenshot_2023-08-26_173512.png",
        preview: false
      }, {
        spotId: 15,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145124171706273913/Screenshot_2023-08-26_173428.png",
        preview: false
      },{
        spotId: 15,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145123941740978288/image.png",
        preview: false
      },{
        spotId: 15,
        url: "https://media.discordapp.net/attachments/1101728106638741525/1145123803014385714/Screenshot_2023-08-26_173256.png",
        preview: false
      },

      {
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/GGW0x7hJzXUxvXdVdFb9MPnflIuTnIdEJtRa8cdOjy0/https/c4.wallpaperflare.com/wallpaper/308/366/395/adventure-time-hd-adventure-time-finn-s-house-wallpaper-preview.jpg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://images-ext-1.discordapp.net/external/bbzxpF31Cw-g1h69k3Ur7en0vCDI-gJECIGwyhtj7fo/https/mir-s3-cdn-cf.behance.net/project_modules/max_1200/e262a340330989.5783bc9ada54f.jpg",
        preview: false
      }, {
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/BZBpMKTTJ9XywflkSiDyA2U-HctmT4heZYbarKLJgi4/https/i.pinimg.com/originals/89/fc/cc/89fccca43accec7535e4f2ae6498922f.jpg",
        preview: false
      },{
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/ube5xlFQLT2GF5eKML1LRzy3uSzdHK94Mc-Pd1dqAes/https/i.pinimg.com/1200x/6c/7f/80/6c7f805e418b517b69f228ae0ad01a98.jpg",
        preview: false
      },{
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/Pkira3Tc3GChWHHKbe0Uy8aAD9QIx-7snwi50lvnP4o/https/i.pinimg.com/originals/96/66/c8/9666c82eed4161b39fe088fa3136bbc6.jpg",
        preview: false
      },
    ], {})
  },
// sdf
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
      spotId: { [Op.in]: [1, 2, 3,4,5,6, 7,8,9, 10,11,12, 13,14,15,16] }
    }, {})
  }
};
