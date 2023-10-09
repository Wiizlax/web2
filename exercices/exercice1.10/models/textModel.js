const path = require('node:path');
const { v4: uuidv4 } = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/text.json');

const TEXTS_BASE = [
  {
    id: 1,
    content: "Salut je m'apelle Tom",
    level: 'easy',
  },
  {
    id: 2,
    content: 'Suis-je chez ce cher Serge ?',
    level: 'medium',
  },
  {
    id: 3,
    content:
      "Natacha n'attacha pas son chat Pacha qui s'échappa. Cela fâcha Sacha qui chassa Natacha.",
    level: 'hard',
  },
];

function readAllTexts(levelOrder) {
  const orderLevel = levelOrder;
  let orderedTexts;
  const texts = parse(jsonDbPath, TEXTS_BASE);

  if (orderLevel && orderLevel !== 'easy' && orderLevel !== 'hard' && orderLevel !== 'medium') {
    return undefined;
  }

  if (orderLevel) {
    orderedTexts = texts.filter((text) => text.level === levelOrder);
    return orderedTexts;
  }

  return texts;
}

function readOneText(id) {
  const idNumber = id;
  const texts = parse(jsonDbPath, TEXTS_BASE);
  const indexOfTextFound = texts.findIndex((film) => film.id === idNumber);
  if (indexOfTextFound < 0) return undefined;

  return texts[indexOfTextFound];
}

function createOneText(content, level) {
  const texts = parse(jsonDbPath, TEXTS_BASE);

  const newText = {
    id: uuidv4(),
    content,
    level,
  };

  texts.push(newText);

  serialize(jsonDbPath, texts);

  return newText;
}

function deleteOneText(id) {
  const idNumber = id;
  const texts = parse(jsonDbPath, TEXTS_BASE);
  const foundIndex = texts.findIndex((text) => text.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedTexts = texts.splice(foundIndex, 1);
  const deletedText = deletedTexts[0];
  serialize(jsonDbPath, texts);

  return deletedText;
}

function updateOneText(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const texts = parse(jsonDbPath, TEXTS_BASE);

  const foundIndex = texts.findIndex((text) => text.id === idNumber);

  if (texts[foundIndex] === undefined) {
    return createOneText(propertiesToUpdate);
  }
  const updatedText = { ...texts[foundIndex], ...propertiesToUpdate };

  texts[foundIndex] = updatedText;

  serialize(jsonDbPath, texts);

  return updatedText;
}

module.exports = {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText
};
