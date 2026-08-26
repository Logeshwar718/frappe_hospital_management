// Copyright (c) 2026, logeshwar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Contact_realtime", {
	refresh(frm) {
        let dialog = new frappe.ui.Dialog({
            title:"First name for contact",
            fields:[
                {
                    label:"Enter first name",
                    fieldname:"first_name",
                    fieldtype:"Data"
                }
            ],
            primary_action_label:"New contact",
            primary_action(values){
                const first_name = values.first_name;
                dialog.hide();

                frappe.route_options = {
                    first_name:first_name
                };
                frappe.new_doc("Contact");
            }
        });
        dialog.show();
	},
});
