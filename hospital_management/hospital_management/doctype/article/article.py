# Copyright (c) 2026, logeshwar and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Article(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		status: DF.Literal["Not Published", "Published"]
		title: DF.Data | None
	# end: auto-generated types

	pass
