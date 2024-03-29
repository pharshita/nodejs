const Tesseract = require('tesseract.js');

function extractTextFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'eng',
      {
        preprocess: 'binarize',
      }
    ).then(({ data: { text } }) => {
      resolve(text);
    }).catch((error) => {
      reject(error);
    });
  });
}

function processExtractedText(extractedText) {
    const keyValuePairs = {};
    let currentKey = '';
    let isKeyLine = false;
  
    const lines = extractedText.split('\n');
  
    lines.forEach((line) => {
      if (line.includes('->') && line.split('->').length === 2) {
        const parts = line.split('->').map((str) => str.trim());
        const key = parts[0];
        const value = parts[1];
        currentKey = key;
        console.log(currentKey)
        keyValuePairs[currentKey] = value;
        isKeyLine = true;
      } else if (currentKey && line.trim() !== '') {
        if (isKeyLine) {
          keyValuePairs[currentKey] += ' ' + line.trim();
        }
      } else {
        isKeyLine = false;
      }
    });
  
    return keyValuePairs;
  }
const imagePath = './images/20231113135539935138000000-6.jpg';
extractTextFromImage(imagePath)
  .then((extractedText) => {
 const finalData = processExtractedText(extractedText);
 console.log(finalData)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
