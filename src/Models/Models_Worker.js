const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnec');
const skill = require('./Worker_skill');
const portfolio = require('./Workes_Portfolio');
const contact = require('./Worker_Contact');
const experience = require('./Worker_Experience');

class Worker {
  constructor() {
    this.table = sequelize.define('workers', {
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
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      jobDesk: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      addressWork: {
        type: DataTypes.STRING(128),
        allowNull: true,
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
      description: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    });
    this.table.hasMany(skill.table, {
      foreignKey: 'idWorker',
      as: 'skill'
    });
    this.table.hasMany(experience.table, {
      foreignKey: 'idWorker',
      as: 'experience'
    });
    this.table.hasMany(portfolio.table, {
      foreignKey: 'idWorker',
      as: 'portfolio'
    });
    this.table.hasMany(contact.table, {
      foreignKey: 'idWorker',
      as: 'contact'
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
        include: [
          {
            model: skill.table,
            as: 'skill',
            attributes: {
              exclude: ['id', 'idWorker'],
            }
          },
          {
            model: experience.table,
            as: 'experience',
            attributes: {
              exclude: ['id', 'idWorker'],
            }
          },
          {
            model: portfolio.table,
            as: 'portfolio',
            attributes: {
              exclude: ['id', 'idWorker'],
            }
          },
          {
            model: contact.table,
            as: 'contact',
            attributes: {
              exclude: ['id', 'idWorker'],
            }
          }
        ],
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

module.exports = new Worker();
