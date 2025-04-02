#!/bin/bash

# Try to extract DB name from --db_name parameter
CMD_DB_NAME=$(echo "$@" | grep -oP '(?<=--db_name=)[^ ]+')

# Or fallback to extracting from config file
CONF_DB_NAME=$(grep -oP '(?<=db_name = ).*' /etc/odoo/odoo.conf | head -n1)

# Use fallback default if none detected
DB_NAME="${CMD_DB_NAME:-${CONF_DB_NAME:-odoo}}"

FILESTORE_DIR="/var/lib/odoo/filestore/${DB_NAME}"

echo "📁 Creating filestore directory: $FILESTORE_DIR"
mkdir -p "$FILESTORE_DIR"

echo "🔑 Setting permissions for /var/lib/odoo/filestore"
chown -R 1000:1000 /var/lib/odoo/filestore
chmod -R 777 /var/lib/odoo/filestore

echo "🚀 Starting Odoo with args: $@"
exec odoo "$@"