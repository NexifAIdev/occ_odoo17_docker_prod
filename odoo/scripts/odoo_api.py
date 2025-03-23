import xmlrpc.client
import json

# When running on your host, use localhost
odoo_url = "http://localhost:8069"
db = "postgres"
username = "admin"
password = "P@$$W0RD"  # as set in odoo.conf

# Authenticate using the XML-RPC common endpoint
common = xmlrpc.client.ServerProxy(f"{odoo_url}/xmlrpc/2/common")
uid = common.authenticate(db, username, password, {})

if not uid:
    raise Exception("Authentication failed!")

# Create the object endpoint proxy
models = xmlrpc.client.ServerProxy(f"{odoo_url}/xmlrpc/2/object")

# Fetch some partner data as an example
partners = models.execute_kw(
    db, uid, password,
    'res.partner', 'search_read',
    [[]], {'fields': ['name', 'email'], 'limit': 10}
)

# Print the result as JSON (for Pentaho to parse if needed)
print(json.dumps(partners, indent=2))