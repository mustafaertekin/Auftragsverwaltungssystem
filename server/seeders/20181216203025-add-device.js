'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Device', [{
        updatedOn: new Date(),
        creationDate: new Date(),
        deviceId: '10e0e993-b796-4168-b017-2b15b1640lll',
        deviceName: 'iPhone',
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Device', null, {});

  }
};
