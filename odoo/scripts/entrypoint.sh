#!/bin/bash
set -e

# Ensure filestore directory is present and writable
if [ ! -d "/var/lib/odoo/filestore" ]; then
  mkdir -p /var/lib/odoo/filestore
fi

chmod -R 777 /var/lib/odoo/filestore

# You can also create the db name folder if known (optional)
if [ "$ODOO_DB" ]; then
  mkdir -p /var/lib/odoo/filestore/$ODOO_DB
  chmod -R 777 /var/lib/odoo/filestore/$ODOO_DB
fi

# Run Odoo
exec "$@"