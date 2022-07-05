const Expression = require('../expression')

const ExpressionController = {
    Index: (req, res) => {
        Expression.find()
            .then(expressions => res.json(expressions))
            .catch(err => res.status(404).json({ noexpressionsfound: 'No Expressions found' }))
    }

    // UpdateSimilarTo: (req, res) => {
    //     Expression.updateOne(
    //         { }
    //     )
    // }
}

module.exports = ExpressionController;