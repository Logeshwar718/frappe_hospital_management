# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Cart_Products(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from hospital_management.hospital_management.doctype.cart.cart import Cart

		add_product: DF.Table[Cart]
		cart_total: DF.Currency
		coupon_code: DF.Data | None
		customer_name: DF.Data | None
		grand_total: DF.Currency
		phone_number: DF.Phone | None
	# end: auto-generated types

	def after_insert(self):
		if self.customer_name:
			customer=frappe.db.get_value(
				"Customers",
				{
					"name1":self.customer_name
				},
				"name"
			)

			if customer:
				current_count=frappe.db.get_value(
					"Customers",
					customer,
					"total_order"
				)
				frappe.db.set_value(
					"Customers",
					customer,
					"total_order",
					current_count+1
				)
