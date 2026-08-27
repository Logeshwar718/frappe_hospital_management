# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Payment(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		balance_amount: DF.Currency
		cart: DF.Link | None
		customer_name: DF.Data | None
		mode_of_payment: DF.Literal["UPI", "Card", "Net Banking"]
		pay_amount: DF.Currency
		payment_status: DF.Literal["Pending", "Partially Paid", "Paid"]
		phone_number: DF.Data | None
		total_amount: DF.Currency
	# end: auto-generated types

	pass
