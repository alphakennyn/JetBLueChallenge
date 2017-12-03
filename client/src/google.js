import React, { Component, PropTypes } from 'react';

const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();


export class googleLib extends Component {
//   propTypes: {
//     text: PropTypes.string
//   }

//   constructor() {
//     super();
//     this.state = {text: {}};
//   }



//   data => this.setState({info: data}) 
  render() {
    const document = {
        
        content: this.state.text,
        type: 'PLAIN_TEXT',
    }

    client
        .analyzeSentiment({document: document})
        .then(results => {
            const sentiment = results[0].documentSentiment;
            console.log(`Text: ${this.state.text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment score: ${sentiment.magnitude}`);
    })
    .catch(err => {
        console.error('ERROR: ', err);
    });

    return (
        <div>
            <p>{this.props.Code}</p>
        </div>
    );
  }


}    
