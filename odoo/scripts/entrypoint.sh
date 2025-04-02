#!/bin/bash

# Ensure filestore has the correct permissions
mkdir -p /var/lib/odoo/filestore
chown -R odoo:odoo /var/lib/odoo/filestore
chmod -R 777 /var/lib/odoo/filestore

# Execute the main container command (e.g. Odoo)
exec "$@"