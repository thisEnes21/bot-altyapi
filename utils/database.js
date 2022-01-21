module.exports = () => {

    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite'
    })

    const Tags = sequelize.define('tags', {
        guild_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        prefix: { type: Sequelize.STRING, defaultValue: "!" },
        welcome_message: { type: Sequelize.JSON, defaultValue: { enabled: false, channel_id: "", message: "" } },
        leave_message: { type: Sequelize.JSON, defaultValue: { enabled: false, channel_id: "", message: "" } },
        tag: { type: Sequelize.JSON, defaultValue: { enabled: false, tag_name: "" } },
        link_protect_enabled: { type: Sequelize.BOOLEAN, default: false },
        auto_role: { type: Sequelize.JSON, defaultValue: { enabled: false, role_id: "" } },
        statistic_enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
        statistic_data: { type: Sequelize.JSON, defaultValue: { category_channel_id: "", all_members_channel_id: "", online_members_channel_id: "", record_members_channel_id: "", record_online: 0 } },
        react_role_data: { type: Sequelize.JSON, defaultValue: {}}
    })

    return Tags
}