const { Pool } = require('pg');
const { validate } = require('webpack');
require('dotenv').config();
const PG_URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: PG_URL,
});
dbActions = {};

dbActions.createTable = async () => {
  const result = await pool.query(`CREATE TABLE IF NOT EXISTS lifts 
        (id SERIAL PRIMARY KEY NOT NULL, 
        lift VARCHAR(250) NOT NULL, 
        reps INTEGER NOT NULL, 
        weight INTEGER NOT NULL, 
        rpe INTEGER, 
        time TIMESTAMP);`);
};

dbActions.addLift = async lift => {
  const date = new Date();
  const params = [
    lift.lift,
    lift.weight,
    lift.reps,
    lift.rpe,
    date.toUTCString(),
  ];
  const result = await pool.query(
    `INSERT INTO lifts (lift, weight, reps, rpe, time) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, lift, weight, reps, rpe, time`,
    params,
  );
  return result.rows;
};

dbActions.deleteLift = async liftid => {
  const result = await pool.query('DELETE FROM lifts WHERE id=$1', [liftid]);
};

dbActions.getLift = async lift => {
  let query = `select * from lifts where 1 = 1`;
  let values = [];
  for (const [key, value] of Object.entries(lift)) {
    if (value !== undefined) {
      query += ` and ${key} = $${values.length + 1}`;
      values.push(value);
    }
  }
  query += ' ORDER BY date';
  const result = await pool.query(query, values);
  return result.rows;
};
dbActions.updateLift = async (id, updateLift) => {
  let query = `UPDATE lifts SET`;
  let values = [id];
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
  query += ` where id = $1 RETURNING id, lift, weight, reps, rpe, time`;
  console.log(query, values);
  const result = await pool.query(query, values);
  console.log(result.rows);
  return result.rows;
};
module.exports = dbActions;
