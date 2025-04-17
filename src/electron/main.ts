import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { isDev } from "./utils.js";

app.on("ready", () => {
  // Get primary display dimensions
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width, // Use full screen width
    height: height, // Use full screen height
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-vue", "index.html"));
  }
});
