// const oracledb = require("oracledb");

// try {
//   oracledb.initOracleClient({
//     libDir:
//       "C:\\instantclient-basic-windows.x64-23.7.0.25.01\\instantclient_23_7",
//   });
//   console.log("✅ Oracle client initialized successfully.");
// } catch (err) {
//   console.error("❌ Oracle client initialization failed:", err);
// }

// async function getDBConnection() {
//   try {
//     const connection = await oracledb.getConnection({
//       user: "MASTER_USER",
//       password: "123456",
//       connectString: "10.208.38.90:1903/tnDB01",
//     });
//     console.log("✅ Oracle DB connection successful.");
//     return connection;
//   } catch (err) {
//     console.error("❌ DB connection error:", err);
//     throw err;
//   }
// }

// module.exports = { getDBConnection };
const oracledb = require("oracledb");
require("dotenv").config();

// Initialize Oracle Client (only if ORACLE_LIB_DIR is set)
try {
  const libDir = process.env.ORACLE_LIB_DIR;
  if (libDir) {
    oracledb.initOracleClient({ libDir });
    console.log(`✅ Oracle client initialized from ${libDir}`);
  } else {
    console.log("⚠ No ORACLE_LIB_DIR provided, skipping client init.");
  }
} catch (err) {
  console.error("❌ Oracle client initialization failed:", err);
}

async function getDBConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectString: process.env.DB_CONNECT,
    });
    console.log("✅ Oracle DB connection successful.");
    return connection;
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
}

module.exports = { getDBConnection };
