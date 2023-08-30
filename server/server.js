const path = require('path');
const express = require('express');

dbActions = require('./squeekwill/dbActions');
const app = express();
const PORT = 3000;
app.use('/', express.json());

dbActions.createTable();
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/lift', async (req, res) => {
  console.log('hello');
  const { lift, reps, weight, rpe } = req.body;
  const newLift = { lift, reps, weight, rpe };
  result = await dbActions.addLift(newLift);
  res.status(200).json(result);
});

app.delete('/api/lift/:id', async (req, res) => {
  const id = req.params.id;
  result = await dbActions.deleteLift(id);
  res.status(200).json(result);
});

app.put('/api/lift/:id', async (req, res) => {
  console.log('hello');
  const id = req.params.id;
  const { lift, reps, weight, rpe } = req.body;
  const updateLift = { lift, reps, weight, rpe };
  console.log(updateLift);
  result = await dbActions.updateLift(id, updateLift);
  res.status(200).json(result);
});
app.get('/api/lift', async (req, res) => {
  const { lift, reps, weight, rpe } = req.body;
  const findLift = { lift, reps, weight, rpe };
  result = await dbActions.getLift(findLift);
  res.status(200).json(result);
});

app.listen(PORT);
