'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Service', [{
        updatedOn: new Date(),
        creationDate: new Date(),
        modelId: '10e0e993-b796-4168-b017-2b15b1640ttt',
        serviceId: '10e0e993-b796-4168-b017-2b15b1640sss',
        serviceName: 'Screen',
        price: 90,
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Service', null, {});

  }
};
