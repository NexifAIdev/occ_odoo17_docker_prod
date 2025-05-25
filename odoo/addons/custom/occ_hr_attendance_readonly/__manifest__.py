{
    'name': 'HR Attendance - Readonly Fields',
    'version': '1.0',
    'summary': 'Makes Check In/Out fields read-only in hr.attendance',
    'category': 'Human Resources',
    'depends': ['hr_attendance'],
    'data': [
        'views/hr_attendance_form.xml',
    ],
    'installable': True,
    'application': False,
}