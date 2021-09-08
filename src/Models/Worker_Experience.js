const { DataTypes } = require("sequelize");
const sequelize = require("../Config/dbConnec");
const worker = require("./Models_Worker");

class WorkerSkill {
  constructor() {
    this.table = sequelize.define(
      "experiences",
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
        position: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        company: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        dateIn: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        dateOut: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
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
    const obj = {
      idWorker: data.idWorker,
      position: data.position,
      company: data.company,
      dateIn: data.dateIn,
      dateOut: data.dateOut,
      description: data.description,
      image: data.image,
    }
    return new Promise((resolve, reject) => {
      this.table
        .create(obj)
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
    const obj = {
      id: data.id,
      idWorker: data.idWorker,
      position: data.position,
      company: data.company,
      dateIn: data.dateIn,
      dateOut: data.dateOut,
      description: data.description,
      image: data.image,
    }
    return new Promise((resolve, reject) => {
      this.table
        .update(data, {
          where: {
            id: data.id,
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
