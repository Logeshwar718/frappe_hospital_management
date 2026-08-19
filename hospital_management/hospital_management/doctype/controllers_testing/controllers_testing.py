# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname

class Controllers_testing(Document):
	def before_save(self):
		if not self.description:
			self.description="Default Description"

	#controller hooks

	def before_insert(self):
		if not self.age:
			self.age=20
		frappe.msgprint("before_inserted hook executed")

	def before_naming(self):
		if not self.branch_code:
			self.branch_code="DF"
		frappe.msgprint("before_naming hook executed")
	
	def autoname(self):
		self.name= make_autoname(f"{self.branch_code}-.####")

	def before_validate(self):
		if not self.name1:
			self.name1="random_user"
		frappe.msgprint("before_validate hook executed")
	
	def validate(self):
		if self.age<18:
			frappe.throw("Age must be greater than 18")
		frappe.msgprint("validate hook executed")

	def after_insert(self):
		frappe.msgprint("Record inserted")