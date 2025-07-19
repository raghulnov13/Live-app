// const express = require("express");
// const cors = require("cors");
// const oracledb = require("oracledb");
// require("dotenv").config();

// const { getDBConnection } = require("./DB.js"); // fixed import

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get("/api/routing", async (req, res) => {
//   const { orderNo } = req.query;

//   if (!orderNo) {
//     return res.status(400).json({ error: "Missing orderNo query parameter" });
//   }

//   const sql = `
//     SELECT * FROM NEOLYNC.ROUTING_WIP A 
//     WHERE PSN IN (
//       SELECT PSN FROM MASTER_USER.LASER_PSN_UPLOAD B 
//       WHERE B.ORDER_NUMBER = :orderNo
//     )
//   `;

//   let connection;

//   try {
//     connection = await getDBConnection();
//     const result = await connection.execute(sql, [orderNo], {
//       outFormat: oracledb.OUT_FORMAT_OBJECT,
//     });
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Query error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error("❌ Connection close error:", err);
//       }
//     }
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
require("dotenv").config();
const { getDBConnection } = require("./DB.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- API: Routing Data ---
app.get("/api/routing", async (req, res) => {
  const { orderNo } = req.query;

  if (!orderNo) {
    return res.status(400).json({ error: "Missing orderNo query parameter" });
  }

  const sql = `
    SELECT * FROM NEOLYNC.ROUTING_WIP A
    WHERE PSN IN (
      SELECT PSN FROM MASTER_USER.LASER_PSN_UPLOAD B
      WHERE B.ORDER_NUMBER = :orderNo
    )
  `;

  let connection;
  try {
    connection = await getDBConnection();
    const result = await connection.execute(sql, [orderNo], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Query error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("❌ Connection close error:", err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
