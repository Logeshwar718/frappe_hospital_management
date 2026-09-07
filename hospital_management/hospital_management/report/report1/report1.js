frappe.query_reports["report1"] = {
	"filters": [
		{
			"fieldname": "gender",
			"label": "Gender",
			"fieldtype": "Select",
			"options": "\nMale\nFemale\nOther",
            "reqd": 1
		}
	]
};