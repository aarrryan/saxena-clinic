#!/bin/bash
# Double-click to run the Saxena Clinic website on this Mac.
# First run: installs packages and builds (a couple of minutes). Later runs: starts in seconds.
# Close this Terminal window (or press Ctrl+C) to stop the site. Nothing keeps running afterwards.

cd "$(dirname "$0")" || exit 1
pause() { echo; read -n 1 -s -r -p "Press any key to close this window."; echo; }

echo "Saxena Skin and Cosmetic Clinic — local website"
echo "-----------------------------------------------"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js isn't installed on this Mac."
  echo "Install the LTS version from https://nodejs.org, then double-click this file again."
  pause; exit 1
fi
major=$(node -p 'process.versions.node.split(".")[0]')
if [ "$major" -lt 22 ]; then
  echo "Node.js $(node -v) is too old. Install the LTS version from https://nodejs.org, then try again."
  pause; exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing packages (first run only)…"
  npm install --no-audit --no-fund || { echo "Package install failed — check your internet connection."; pause; exit 1; }
fi

if [ ! -f dist/client/index.html ] || [ -n "$(find src public astro.config.mjs package.json -newer dist/client/index.html -print -quit 2>/dev/null)" ]; then
  echo "Building the site…"
  npm run build --silent || { echo "Build failed — see the messages above."; pause; exit 1; }
fi

PORT=4321
while lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT + 1)); done
URL="http://localhost:$PORT/"

PORT=$PORT ENQUIRY_MODE=log node server.mjs &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; echo; echo "Website stopped."; exit 0' INT TERM HUP EXIT

for _ in $(seq 1 50); do curl -s -o /dev/null "$URL" && break; sleep 0.2; done
open "$URL"
echo
echo "The site is running at $URL"
echo "Appointment enquiries are printed here (test mode), not emailed."
echo "Close this window or press Ctrl+C to stop it."
wait $SERVER
