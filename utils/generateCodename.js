const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

function generateCodename() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-',
    style: 'capital'
  }); // e.g., "Witty-Lion"
}

module.exports = generateCodename;