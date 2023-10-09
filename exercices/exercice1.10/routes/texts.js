const express = require('express');
const {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
} = require("../models/textModel")

const router = express.Router();

router.get('/', (req, res) => {
  const allTexts = readAllTexts();
  return res.json(allTexts);
});

router.get('/', (req, res) => {
  const allTexts = readAllTexts(req?.query?.level); 
  return res.json(allTexts);
});

router.get('/:id', (req, res) => {
  const textWithID = readOneText(req?.query?.id);
  if(!textWithID) return res.sendStatus(404).json({error: "Mauvais paramètre"});
  return res.json(textWithID);
});

// Create a text to be added to the TEXTS.
router.post('/', (req, res) => {
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;
  
  if (!content || !level)
    return res.sendStatus(400).json({ error: 'Paramètres invalides' }); 

  const createdText = createOneText(content, level);

  return res.json(createdText);
});

// Delete a text from the TEXTS based on its id
router.delete('/:id', (req, res) => {
  const deletedText = deleteOneText(req.params.id);

  if (!deletedText) return res.sendStatus(404);

  return res.json(deletedText);
});

// Update a text based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const content = req?.body?.content;
  const level = req?.body?.level;

  if ((!level && !content) || level?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedFilm = updateOneText(req.params.id, { level, content });

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});


module.exports = router;
