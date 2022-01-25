const Message = require("../../models/Message");

const getAll = async (req, res) => {
    try {
        const messages = await Message.find()
        return messages
    } catch (error) {
        throw new Error(`Error, can't get messages: ${error}`)
    }
}

module.exports = { getAll }