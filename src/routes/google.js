var express = require('express');
var router = express.Router();
const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();

const text= "I loved that we were treated to truffle popcorn upon seating, it was great to snack on something while we studied the menu.";


/* GET all Terminal listing. */
router.get('/', function(req, res, next) {
  // And insert something like this instead:
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    client 
        .analyzeSentiment({document: document})
        .then(results => {
        const sentiment = results[0].documentSentiment;
    
        //console.log(`Text: ${text}`);
        res.json(sentiment);
        // console.log("Sentiment score: " + sentiment.score);
        //console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
        })
        .catch(err => {
        console.error('ERROR:', err);
        });
});





module.exports = router;