'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Client', [{
        clientId: '5b8c39b6-39af-4d0a-8c73-57fb8fd62ee2',
        clientSecret: null,
        salutation: 'male',
        firstname: 'Max',
        lastname: 'Mustermann',
        phone: '0987654',
        email: 'max@mustermann.ch',
        isActive: true,
        updatedOn: new Date(),
        creationDate: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Client', null, {});

  }
};


