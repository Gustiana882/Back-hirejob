const { DataTypes } = require("sequelize");
const sequelize = require("../Config/dbConnec");
const worker = require("./Models_Worker");

class WorkerSkill {
  constructor() {
    this.table = sequelize.define(
      "portfolios",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idWorker: {
          type: DataTypes.INTEGER,
          allowNull: false,
          onDelete: "CASCADE",
          references: {
            model: "workers",
            key: "id",
          },
        },
        nameApp: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        linkRepo: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  }

  add(data) {
    return new Promise((resolve, reject) => {
      this.table
        .create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.table
        .findOne({
          where: {
            email,
          },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getByIdWorker(idWorker) {
    return new Promise((resolve, reject) => {
      this.table
        .findOne({
          where: {
            idWorker,
          },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  edit(data) {
    return new Promise((resolve, reject) => {
      this.table
        .update(data, {
          where: {
            idWorker: data.idWorker,
          },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.table
        .update(data, {
          where: {
            email: data.email,
          },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new WorkerSkill();
