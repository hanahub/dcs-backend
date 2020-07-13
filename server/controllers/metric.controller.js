const httpStatus = require('http-status');
const moment = require('moment');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

exports.sum = async (req, res) => {
  const db = await open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  });

  const metric_key = req.params.key;
  let result = null;

  try {
    result = await db.get(`
      SELECT SUM(metric_value) as sum FROM metrics
      WHERE metric_key = :metric_key AND createdAt >= datetime('now','-1 hours')
    `, {
      ':metric_key': metric_key
    });
  } catch (e) {
    console.log(e);
  }
  
  return res.status(httpStatus.OK).json({value: result['sum'] || 0});
};

exports.log = async (req, res) => {
  const db = await open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  });

  const value = Math.round(req.body.value);
  const key = req.params.key;
  const createdAt = moment().utc().format('YYYY-MM-DD H:m:s');

  console.log(createdAt);
  try {
    const sql = `INSERT INTO metrics (metric_key, metric_value, createdAt) VALUES ('${key}', '${value}', '${createdAt}')`;
    await db.exec(sql);
  } catch (e) {
    console.log(e);
  }
 
  return res.status(httpStatus.OK).json({});
};
