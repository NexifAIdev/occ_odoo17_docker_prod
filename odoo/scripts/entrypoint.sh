#!/bin/bash
set -e

echo ">> Ensuring filestore directory exists..."
mkdir -p /var/lib/odoo/filestore || true

echo ">> Trying to set permissions..."
chmod -R 777 /var/lib/odoo/filestore || echo "⚠️ Warning: Failed to chmod /var/lib/odoo/filestore"

if [ "$ODOO_DB" ]; then
  mkdir -p /var/lib/odoo/filestore/$ODOO_DB || true
  chmod -R 777 /var/lib/odoo/filestore/$ODOO_DB || echo "⚠️ Warning: Failed to chmod $ODOO_DB"
fi

echo ">> Starting Odoo with CMD: $@"
exec "$@"