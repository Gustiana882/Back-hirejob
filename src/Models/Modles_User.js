const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnec');

class Customer {
  constructor() {
    this.table = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      roles: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
  }

  add(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.table.findOne({
        where: {
          email,
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  edit(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          email: data.email,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          email: data.email,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Customer();
