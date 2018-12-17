'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Address', [{
        addressId: "10e0e993-b796-4168-b017-2b15b1640ddd",
        streetName: "bahnhosfstrasse 23",
        plzNumber: "88888",
        cityName: "Zurich",
        countryName: "Switzerland",
        creationDate: new Date(),
        updatedOn: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Address', null, {});
  }
};
