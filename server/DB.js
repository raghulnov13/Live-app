const oracledb = require("oracledb");

try {
  oracledb.initOracleClient({
    libDir:
      "C:\\instantclient-basic-windows.x64-23.7.0.25.01\\instantclient_23_7",
  });
  console.log("✅ Oracle client initialized successfully.");
} catch (err) {
  console.error("❌ Oracle client initialization failed:", err);
}

async function getDBConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: "MASTER_USER",
      password: "123456",
      connectString: "10.208.38.90:1903/tnDB01",
    });
    console.log("✅ Oracle DB connection successful.");
    return connection;
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
}

module.exports = { getDBConnection };
