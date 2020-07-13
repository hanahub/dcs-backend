const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const run = async () => {
  const db = await open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  });
  
  await db.exec(`
    CREATE TABLE metrics (
      metric_key TEXT,
      metric_value FLOAT,
      createdAt datetime DEFAULT NULL
    );
  `);
}

run();
