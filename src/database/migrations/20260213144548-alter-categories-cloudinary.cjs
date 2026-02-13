'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'path');

    await queryInterface.addColumn('categories', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('categories', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.addColumn('categories', 'path', {
      type: Sequelize.STRING,
    });

    await queryInterface.removeColumn('categories', 'image_url');
    await queryInterface.removeColumn('categories', 'public_id');
  }
};