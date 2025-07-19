const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false,
    },
  });

  // Load React app
  mainWindow.loadURL("http://localhost:5176");
}

app.whenReady().then(() => {
  // Start backend server
  const server = spawn("node", ["server/index.js"], {
    cwd: __dirname,
    shell: true,
  });

  server.stdout.on("data", (data) => console.log(`Server: ${data}`));
  server.stderr.on("data", (data) => console.error(`Server Error: ${data}`));

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
