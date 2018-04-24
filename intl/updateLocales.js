const fs = require('fs');
const globSync = require('glob').sync;
const mkdirpSync = require('mkdirp').sync;

const filePattern = './build/messages/**/*.json';
const outputDir = './locales/';
const localesFileName = 'data.json';

let defaultMessages = globSync(filePattern)
  .map((filename) => {
    return {
      fileContent: fs.readFileSync(filename, 'utf8'),
      filename: `${__dirname}${filename}`
    }
  })
  .map(file => {
    return {
      ...file,
      fileContent: JSON.parse(file.fileContent)
    }
  })
  .reduce((collection, file) => {
    const descriptors = file.fileContent;
    descriptors.forEach(({id, defaultMessage}) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id} in file ${file.filename}`);
      }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

mkdirpSync(outputDir);

const localesDataPath = outputDir + localesFileName;

data = fs.existsSync(localesDataPath) ? JSON.parse(fs.readFileSync(localesDataPath, 'utf8')) : {};

const anotherLanguageTemplate = {};
for(let messageKey in defaultMessages) {
  if(defaultMessages.hasOwnProperty(messageKey)) {
    anotherLanguageTemplate[messageKey] = `__${defaultMessages[messageKey] || messageKey}__`;
  }
}

const updatedData = {
  en: filterKeys(data.en || {}, Object.keys(defaultMessages))
};

for(let languageKey in data) {
  if(!updatedData.hasOwnProperty(languageKey)) {
    updatedData[languageKey] = {
      ...anotherLanguageTemplate,
      ...filterKeys(data[languageKey] || {}, Object.keys(defaultMessages)),
    }
  }
}

function filterKeys(object, keys) {
  const result = {};
  for(let key in object) {
    if(keys.indexOf(key) > -1) {
      result[key] = object[key];
    }
  }
  return result;
}

function isObject(variable) {
  return (!!variable) && (variable.constructor === Object);
}

function sortKeysInObject(unorderedObject) {
  const ordered = {};
  Object.keys(unorderedObject).sort().forEach(function(key) {
    ordered[key] = isObject(unorderedObject[key]) ? sortKeysInObject(unorderedObject[key]) : unorderedObject[key];
  });

  return ordered;
}

fs.writeFileSync(outputDir + localesFileName, JSON.stringify(sortKeysInObject(updatedData), null, 2));