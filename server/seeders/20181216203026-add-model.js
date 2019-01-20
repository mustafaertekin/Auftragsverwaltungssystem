'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('DeviceModel', [{
        updatedOn: new Date(),
        creationDate: new Date(),
        deviceId: '10e0e993-b796-4168-b017-2b15b1640lll',
        deviceModelId: '10e0e993-b796-4168-b017-2b15b1640ttt',
        deviceModelName: 'iPhone 8',
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('DeviceModel', null, {});

  }
};
