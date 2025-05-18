#!/bin/bash
set -e

echo "[ENTRYPOINT] Reading Docker secrets..."
export ODOO_ADMIN_PASS=$(cat /run/secrets/odoo_admin_password)
export ODOO_DB_USER=$(cat /run/secrets/odoo_db_user)
export ODOO_DB_PASSWORD=$(cat /run/secrets/odoo_db_password)
export DB_HOST=${DB_HOST:-db}
export DB_PORT=${DB_PORT:-5432}

echo "[DEBUG] Admin password: $ODOO_ADMIN_PASS"
echo "[DEBUG] DB user: $ODOO_DB_USER"

echo "[ENTRYPOINT] Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

echo "[ENTRYPOINT] PostgreSQL is up. Proceeding..."
echo "[ENTRYPOINT] Generating Odoo config with envsubst..."
envsubst < /etc/odoo/odoo.conf.template > /etc/odoo/odoo.conf

echo "[ENTRYPOINT] Starting Odoo with config at /etc/odoo/odoo.conf"
exec odoo -c /etc/odoo/odoo.conf