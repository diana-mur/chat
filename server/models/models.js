import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    pass: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
});

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chat_name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false}
});

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING},
    datetime: {type: DataTypes.DATE}
})

const Chat_settings = sequelize.define('chat_settings', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

User.belongsToMany(Chat, {through: Chat_settings})
Chat.belongsToMany(User, {through: Chat_settings})

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)

export default {User, Chat, Chat_settings, Message}