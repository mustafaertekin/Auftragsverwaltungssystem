'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Company', [{
        companyId: "10e0e993-b796-4168-b017-2b15b1640ccc",
        name: "AVS",
        addressId: "10e0e993-b796-4168-b017-2b15b1640ddd",
        creationDate: new Date(),
        updatedOn: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Company', null, {});

  }
};
