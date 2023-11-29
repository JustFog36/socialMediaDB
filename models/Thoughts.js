const {Schema, model} = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: [{
            type: String,
            required: true,
            min: 1,
            max: 280
        }],
        createdAt: {
           type: Date,
           default: Date.now(),
           get: date => date.toLocaleString('en-US')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(() => thoughtSchema.obj.reactions.length)

const Thought = model('thoughts', thoughtSchema)

module.exports = Thought