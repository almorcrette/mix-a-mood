const ThesaurusApi = require('../ThesaurusApi');

const EmotionsController = {

    RetrieveSimilarWords (req, res) {
        const thesaurusApi = new ThesaurusApi();
        thesaurusApi.isSimilarTo(req.params.emotion, (similarWords) => {
            res.send(similarWords)
        });
    }
};

module.exports = EmotionsController;
