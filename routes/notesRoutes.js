const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.use(authMiddleware);

router.post('/createNote' , noteController.createNotes);
router.get('/allNotes' , noteController.getNotes);
router.put('/updateNote/:id' , noteController.updateNote);
router.delete('/deleteNote/:id' , noteController.deleteNote);

module.exports = router;