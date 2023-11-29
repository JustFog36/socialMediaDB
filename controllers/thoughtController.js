const { ObjectId } = require('mongoose').Types
const { User, Thought } = require('../models')

module.exports = {
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async getThoughtById (req, res) {
        try {
            const thought = await Thought.findOne( { _id: req.params.thoughtId } )
            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID exists.'})
            }

            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async createNewThought (req, res) {
        try {
            const newThought = await Thought.create(req.body)
            res.json(newThought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async updateThought (req,res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!updatedThought) {
                res.status(404).json({message: 'No thought with that ID exists.'})
            }

            res.json(updatedThought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async deleteThought (req, res) {
        try {
            const thought = await Thought.findOneAndDelete( { _id: req.params.thoughtId } )

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({ message: 'Big Brother has removed your thoughts!'})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body}},
                { runValidators: true, new: true}
            )
            if (!thought) {
                res.status(404).json({message: `Unable to think your thought.`})
            } else {
                res.json(thought)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                {runValidators: true, new: true}
            )
            if (!thought) {
                res.status(404).json({message: `This thought can't be unthought`})
            } else {
                res.json('Reaction removed.')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}