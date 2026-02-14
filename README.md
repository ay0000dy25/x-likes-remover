# x-likes-remover
safe, automated JavaScript tool to remove X likes with built-in rate-limit protection and human-like delays.
# X (Twitter) Likes Remover 🚀

A lightweight, efficient JavaScript tool designed to automate the process of unliking posts on X (formerly Twitter). This script is built with **safety first**, mimicking human behavior to avoid account flags.

## ✨ Key Features
- **🛡️ Rate-Limit Detection:** Automatically detects `429 Too Many Requests` errors and pauses for 90 seconds.
- **⏳ Human-like Delay:** Waits 1.5 seconds between each "unlike" to stay under the radar.
- **🔄 Auto-Pagination:** Automatically scrolls down to load more likes once the current view is cleared.
- **🛑 Smart Termination:** Stops automatically if no more like buttons are found after 8 consecutive checks.

## 🛠️ How to Use
1. Open X (Twitter) and navigate to your **Likes** tab (`twitter.com/YourUsername/likes`).
2. Open your browser's **Developer Tools**:
   - Press `F12` OR `Ctrl + Shift + I` (Windows/Linux)
   - Press `Cmd + Option + I` (Mac)
3. Click on the **Console** tab.
4. Copy the code from [script.js](./script.js) in this repository.
5. Paste it into the console and hit **Enter**.
6. Keep the tab open while the script works its magic.

## ⚠️ Disclaimer
This script is for educational purposes only. Use it at your own risk. Automating actions on X can sometimes lead to temporary account restrictions if used excessively. It is recommended to run this in moderate sessions.
