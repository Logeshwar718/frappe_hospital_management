# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

# import frappe
# from frappe import _


# def execute(filters: dict | None = None):
# 	"""Return columns and data for the report.

# 	This is the main entry point for the report. It accepts the filters as a
# 	dictionary and should return columns and data. It is called by the framework
# 	every time the report is refreshed or a filter is updated.
# 	"""
# 	columns = get_columns()
# 	data = get_data()

# 	return columns, data

# def execute_snapshot_report(filters: dict | None = None):
# 	"""Return columns and data for the report.

# 	This is the main entry point for snapshot report. When 'Synced
# 	Report' is enabled in report, framework will call this method
# 	every time the report is refreshed or a filter is updated. It
# 	accepts the same filters as normal execute. But a utility method -
# 	get_latest_sync, is also imported.

# 	"""
# 	from frappe.database.duckdb.database import get_latest_sync

# 	columns = get_columns()
# 	data = get_data()

# 	return columns, data

# def get_columns() -> list[dict]:
# 	"""Return columns for the report.

# 	One field definition per column, just like a DocType field definition.
# 	"""
# 	return [
# 		{
# 			"label": _("Column 1"),
# 			"fieldname": "column_1",
# 			"fieldtype": "Data",
# 		},
# 		{
# 			"label": _("Column 2"),
# 			"fieldname": "column_2",
# 			"fieldtype": "Int",
# 		},
# 	]


# def get_data() -> list[list]:
# 	"""Return data for the report.

# 	The report data is a list of rows, with each row being a list of cell values.
# 	"""
# 	return [
# 		["Row 1", 1],
# 		["Row 2", 2],
# 	]

import frappe

def execute(filters=None):
    columns = [
        {
            "label": "Student",
            "fieldname": "student",
            "fieldtype": "Data",
            "width": 120
        },
        {
            "label": "Student Name",
            "fieldname": "student_name",
            "fieldtype": "Data",
            "width": 180
        },
        {
            "label": "Posting Date",
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "width": 120
        },
        {
            "label": "Fee Amount",
            "fieldname": "fee_amount",
            "fieldtype": "Currency",
            "width": 120
        }
    ]

    data = [
        {
            "student": "STU-001",
            "student_name": "Arun Kumar",
            "posting_date": "2026-09-01",
            "fee_amount": 25000
        },
        {
            "student": "STU-002",
            "student_name": "Priya Sharma",
            "posting_date": "2026-09-02",
            "fee_amount": 30000
        },
        {
            "student": "STU-003",
            "student_name": "Rahul Kumar",
            "posting_date": "2026-09-03",
            "fee_amount": 27500
        },
        {
            "student": "STU-004",
            "student_name": "Divya Raj",
            "posting_date": "2026-09-04",
            "fee_amount": 32000
        }
    ]

    return columns, data