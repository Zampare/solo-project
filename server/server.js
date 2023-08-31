const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const sessionHandler = require('./sessionHandler');
const dbActions = require('./squeekwill/dbActions');
const app = express();
const PORT = 3000;
app.use('/', express.json());
app.use(cookieParser());
dbActions.createTables();

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const result = await dbActions.addUser(username, password);
  if (result.length > 0) {
    const id = result[0].id;
    const cookie = await dbActions.createSession(id);
    res.cookie('session', `${cookie.cookieval}`, {
      httpOnly: true,
      overwrite: true,
    });
    res.status(200).send();
  } else {
    res.status(409).send('username already exists');
  }
});

app.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;
  const id = await dbActions.checkPassword(username, password);

  if (id) {
    const cookie = await dbActions.createSession(id);
    res.cookie('session', `${cookie.cookieval}`, {
      httpOnly: true,
      overwrite: true,
    });
    res.status(200).send();
  } else {
    res.status(401).send('invalid username or password');
  }
});

app.post('/api/signout', (req, res) => {});

app.use('/api/lift', sessionHandler.isLoggedIn);

app.post('/api/lift', async (req, res) => {
  const { lift, reps, weight, rpe } = req.body;
  const newLift = { lift, reps, weight, rpe };
  result = await dbActions.addLift(newLift, res.locals.userid);
  res.status(200).json(result);
});

app.delete('/api/lift/:id', async (req, res) => {
  const id = req.params.id;
  result = await dbActions.deleteLift(id, res.locals.userid);
  res.status(200).json(result);
});

app.put('/api/lift/:id', async (req, res) => {
  const id = req.params.id;
  const { lift, reps, weight, rpe } = req.body;
  const updateLift = { lift, reps, weight, rpe };
  result = await dbActions.updateLift(id, updateLift, res.locals.userid);
  res.status(200).json(result);
});

app.get('/api/lift', async (req, res) => {
  const { lift, reps, weight, rpe } = req.query;
  const findLift = { lift, reps, weight, rpe };
  try {
    result = await dbActions.getLift(findLift, res.locals.userid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(PORT);
