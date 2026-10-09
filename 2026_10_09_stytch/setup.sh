#!/usr/bin/env bash
# One-time (re-runnable) setup: deps, env files, databases, migrations.
set -euo pipefail
cd "$(dirname "$0")"

npm install
npm --prefix consumer/frontend install

for app in provider consumer/backend; do
  [ -d "$app/.venv" ] || python3 -m venv "$app/.venv"
  "$app/.venv/bin/pip" install -q -r "$app/requirements.txt"
  [ -f "$app/.env" ] || cp "$app/.env.example" "$app/.env"
done

npm run db
(cd provider && .venv/bin/python manage.py migrate)
(cd consumer/backend && .venv/bin/python manage.py migrate)

echo
echo "Done. Run: npm run dev"
