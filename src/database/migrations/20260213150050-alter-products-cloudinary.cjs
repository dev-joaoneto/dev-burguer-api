'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'path', {
      type: Sequelize.STRING,
    });

    await queryInterface.removeColumn('products', 'image_url');
    await queryInterface.removeColumn('products', 'public_id');
  }
};
