const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { validate } = require('webpack');
require('dotenv').config();
const PG_URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: PG_URL,
});
dbActions = {};

dbActions.createTables = async () => {
  try {
    pool.query(`CREATE TABLE IF NOT EXISTS lifts 
          (id SERIAL PRIMARY KEY NOT NULL, 
          lift VARCHAR(250) NOT NULL, 
          reps INTEGER NOT NULL, 
          weight INTEGER NOT NULL, 
          rpe INTEGER, 
          date TIMESTAMP,
          userid INTEGER NOT NULL);`);

    pool.query(`CREATE TABLE IF NOT EXISTS users
      (id SERIAL PRIMARY KEY NOT NULL,
      username VARCHAR(250) UNIQUE NOT NULL,
      password VARCHAR(250) NOT NULL);`);

    pool.query(`CREATE TABLE IF NOT EXISTS sessions
    (id SERIAL PRIMARY KEY NOT NULL,
    cookieval VARCHAR(250) NOT NULL,
    userid INTEGER NOT NULL DEFAULT -1);`);
  } catch (error) {
    console.log(error.log);
  }
};

dbActions.addLift = async (lift, userid) => {
  console.log(lift, userid);
  try {
    const date = new Date();
    const params = [
      lift.lift,
      lift.weight,
      lift.reps,
      lift.rpe,
      date.toUTCString(),
      userid,
    ];
    console.log(params);
    const result = await pool.query(
      `INSERT INTO lifts (lift, weight, reps, rpe, date, userid) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, lift, weight, reps, rpe, date`,
      params,
    );
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

dbActions.deleteLift = async (liftid, userid) => {
  try {
    const result = await pool.query(
      'DELETE FROM lifts WHERE id=$1 and userid=$2',
      [liftid, userid],
    );
  } catch (error) {
    console.log(error);
  }
};

dbActions.getLift = async (lift, userid) => {
  let query = `select * from lifts where 1 = 1`;
  let values = [];
  for (const [key, value] of Object.entries(lift)) {
    if (value !== undefined) {
      if (value.at(0) === '<') {
        query += ` and ${key} < $${values.length + 1}`;
        values.push(value.slice(1));
      } else if (value.at(0) === '>') {
        query += ` and ${key} > $${values.length + 1}`;
        values.push(value.slice(1));
      } else if (value.at(0) === '=') {
        query += ` and ${key} = $${values.length + 1}`;
        values.push(value.slice(1));
      } else {
        query += ` and ${key} = $${values.length + 1}`;
        values.push(value);
      }
    }
  }
  query += ` and userid=$${values.length + 1}`;
  values.push(userid);
  query += ' ORDER BY date DESC';
  const result = await pool.query(query, values);
  return result.rows;
};
dbActions.updateLift = async (id, updateLift, userid) => {
  let query = `UPDATE lifts SET`;
  let values = [id, userid];
  updateLift = Object.keys(updateLift)
    .filter(key => updateLift[key] !== undefined)
    .reduce((cur, key) => Object.assign(cur, { [key]: updateLift[key] }), {});
  first = true;
  for (const [key, value] of Object.entries(updateLift)) {
    if (!first) {
      query += `,`;
    }
    first = false;
    query += ` ${key} = $${values.length + 1}`;
    values.push(value);
  }
  query += ` where id = $1 and userid = $2 RETURNING id, lift, weight, reps, rpe, date`;
  console.log(query, values);
  const result = await pool.query(query, values);
  console.log(result.rows);
  return result.rows;
};

dbActions.addUser = async (username, password) => {
  try {
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(password, saltRounds);
    const query =
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const values = [username, hashpass];
    const result = await pool.query(query, values);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log(error.detail);
    return undefined;
  }
};

dbActions.checkPassword = async (username, password) => {
  try {
    const query = 'SELECT id, password FROM users where username = $1';
    const values = [username];
    const result = await pool.query(query, values);
    const compare = await bcrypt.compare(password, result.rows[0].password);
    console.log('compare', compare);
    console.log(result.rows);
    return result.rows[0].id;
  } catch (error) {
    console.log(error.detail);
  }
};

dbActions.createSession = async id => {
  try {
    const cookieval = id + Date.now();
    console.log(cookieval);
    const query = `INSERT INTO sessions (userid, cookieval) VALUES ($1, $2) RETURNING cookieval`;
    const values = [id, cookieval];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
};
dbActions.checkSession = async cookieval => {
  try {
    const query = `SELECT userid FROM sessions where cookieval = $1`;
    const values = [cookieval];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.log(error.detail);
  }
};
module.exports = dbActions;
