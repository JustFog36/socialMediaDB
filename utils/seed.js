const connection = require('../config/connection')
const { User, Thought } = require('../models')
const {
    getRandomUsername,
    getRandomEmail,
    getRandomThought,
    getRandomReaction
} = require('./data')

connection.on('error', err => err)

connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray()
    if (userCheck.length) {
        await connection.dropCollection('users')
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray()
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts')
    }

    const users = []
    const thoughts = []

    for (let i = 0; i < 20; i++) {
        const username = getRandomUsername()
        const email = getRandomEmail()

        users.push({
            username,
            email
        })

        const reactions = []
        for (let i=0; i < Math.floor(Math.random() * 4 + 1); i++) {
            const rndmReaction = getRandomReaction()
            const reactionObj = {
                reactionBody: rndmReaction,
                username: username
            }
            reactions.push(reactionObj)
        }

        const thoughtText = []
        for (let i=0; i < Math.floor(Math.random() * 4 + 1); i++) {
            const rndmThought = getRandomThought()
            thoughtText.push(rndmThought)
        }

        thoughts.push({
            thoughtText,
            username,
            reactions
        })
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.log('Data has been seeded.')
    process.exit(0)
})