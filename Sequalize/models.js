const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequalize');

const UserModel = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
}

const User = sequelize.define('userInfo', UserModel,{
  freezeTableName: true
});

const MessageModel = {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message:{
    type: DataTypes.STRING
  },
  timeStamp:{
    type: DataTypes.STRING
  },
}

const Message = sequelize.define("messages",MessageModel,{
  freezeTableName: true
})
const VideoModel = {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING
  },
  timeStamp:{
    type: DataTypes.STRING
  },
}

const Video = sequelize.define("videos",VideoModel,{
  freezeTableName: true
})

module.exports = {User,Message,Video}