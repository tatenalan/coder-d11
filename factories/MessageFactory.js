const faker = require('faker')

const createFakers = async (req, res) => {
    let messages = [];
    for (let index = 1; index <= 5; index++) {
        messages.push({
            author: {
                id:index,
                firstName: faker.name.firstName(),
                lastName:faker.name.lastName(),
                age: faker.datatype.number(),
                alias: faker.name.firstName(),
                avatar: faker.image.image(),
                date: faker.datatype.datetime()
            },
            text: faker.lorem.sentence()
        })
    }   

    if (req.baseUrl == '/api/messages') {
        res.send(messages)  
    } else {
        res.render('messagesTest', {messages});
    }
}

module.exports = { createFakers }