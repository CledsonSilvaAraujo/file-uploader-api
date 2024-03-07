module.exports = {
    HOST: "localhost",
    USER: "cledson",
    PASSWORD: "3060",
    DB: "dev_bd",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };