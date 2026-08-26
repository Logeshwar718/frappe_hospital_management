# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Items(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		price: DF.Currency
		product_name: DF.Data
		stock_quantity: DF.Int
	# end: auto-generated types

	pass
