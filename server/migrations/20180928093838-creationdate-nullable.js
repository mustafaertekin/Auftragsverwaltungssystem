'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('User', 'updatedOn', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true
    });
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
