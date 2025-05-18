# __manifest__.py

{
    'name': 'OCC Developer Mode Enhancer',
    'version': '1.0.0',
    'category': 'Tools',
    'summary': 'Adds developer-only menu entries for Overtime management',
    'description': """
This module displays "Overtime" and "Overtime Request" menu items 
only when Developer Mode is active. It helps separate development 
features from regular user access in OCC Odoo environments.
""",
    'author': 'NexifAI Solutions(Freelance)',
    'website': 'https://github.com/NexifAIdev',
    'depends': ['base', 'occ_overtime','ohrms_overtime'],
    'data': [
        'security/dev_mode_groups.xml',
        'views/dev_mode_toggle_view.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}