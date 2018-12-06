'use strict';
/**
 * this reference will help you get any modifications done on the database without loosing any data
 * http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
     
      return queryInterface.changeColumn('User', 'creationDate', {
        type: Sequelize.DATE,
        defaultValue: false,
        allowNull: true
      });
     
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('User');
     
  }
};
