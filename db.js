const { Pool } = require('pg');

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Function to initialize tables
async function setupTables() {
  const rankingTable = `
      CREATE TABLE IF NOT EXISTS ranking (
          id VARCHAR(15) PRIMARY KEY,
          login VARCHAR(15),
          logged BOOLEAN,
          campus TEXT,
          streak SMALLINT,
          max_streak SMALLINT,
          points INT,
          day_1 TEXT,
          day_2 TEXT,
          day_3 TEXT,
          day_4 TEXT,
          day_5 TEXT,
          day_6 TEXT,
          day_7 TEXT,
          day_8 TEXT,
          day_9 TEXT,
          day_10 TEXT,
          day_11 TEXT,
          day_12 TEXT,
          day_13 TEXT,
          day_14 TEXT,
          day_15 TEXT,
          day_16 TEXT,
          day_17 TEXT,
          day_18 TEXT,
          day_19 TEXT,
          day_20 TEXT,
          day_21 TEXT,
          day_22 TEXT,
          day_23 TEXT,
          day_24 TEXT,
          day_25 TEXT
      );
  `;

  const useridsTable = `
      CREATE TABLE IF NOT EXISTS userids (
          id VARCHAR(15) PRIMARY KEY,
          login VARCHAR(15),
          campus SMALLINT
      );
  `;

  try {
    // Run both queries
    await pool.query(rankingTable);
    console.log('Table "ranking" created or already exists.');

    await pool.query(useridsTable);
    console.log('Table "userids" created or already exists.');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

// Function to add a user
async function add_user(id, login, campus) {
  const query = `INSERT INTO userids (id, login, campus) VALUES ($1, $2, $3)`;

  try {
    await pool.query(query, [id, login, campus]);
    console.log(`User "${login}" added to DB.`);
  } catch (err) {
    console.error(`Error adding user "${login}":`, err);
  }
}

// Function to delete a user
async function delete_user(login) {
  const query = `DELETE FROM userids WHERE login = $1`;

  try {
    const result = await pool.query(query, [login]);
    if (result.rowCount > 0) {
      console.log(`User with login "${login}" was deleted.`);
    } else {
      console.log(`No user found with login "${login}".`);
    }
  } catch (err) {
    console.error(`Error deleting user "${login}":`, err);
  }
}

// Function to search for a user
async function search_user(login) {
  const query = `SELECT id, login, campus FROM userids WHERE login = $1`;

  try {
    const result = await pool.query(query, [login]);
    if (result.rows.length > 0) {
//      console.log(`User found: ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    } else {
//      console.log(`No user found with login "${login}".`);
      return null;
    }
  } catch (err) {
    console.error(`Error while searching for user ${login}:`, err);
    return null;
  }
}


async function get_all_users() {
  const query = `SELECT id, login, campus FROM userids`;

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      console.log(`Found ${result.rows.length} users.`);
      return result.rows;
    } else {
      console.log('No users found in the database.');
      return [];
    }
  } catch (err) {
    console.error('Error retrieving users:', err);
    throw err; // Re-throw the error to handle it higher up if needed
  }
}



// Close the pool when the app exits
process.on('SIGINT', async () => {
  console.log('Closing database connection pool...');
  await pool.end();
  console.log('Database connection pool closed.');
  process.exit(0);
});






// Export the functions for use in other files
module.exports = {
  setupTables,
  add_user,
  delete_user,
  search_user,
  get_all_users
};


