'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Address', [{
        updatedOn: new Date(),
        creationDate: new Date(),
        addressId: '10e0e993-b796-4168-b017-2b15b1640ttt',
        streetname: 'Ahornstrasse',
        plzNumber: '8810',
        cityName: 'Zürich',
        countryName: 'Switzerland',
        clientId: '5b8c39b6-39af-4d0a-8c73-57fb8fd62ee2',
        userId: '5555e993-b796-4168-b017-2b15b164086f' 
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Addresss', null, {});

  }
};


