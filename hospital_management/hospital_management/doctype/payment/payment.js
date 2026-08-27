// Copyright (c) 2026, logeshwar and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Payment", {
// 	refresh(frm) {

// 	},
// });

// frappe.ui.form.on("Payment", {
//     cart(frm) {
//         calculate_payment(frm);
//     },
//     pay_amount(frm){
//         calculate_payment(frm);
//     },
   
// });

// function calculate_payment(frm) {
//     let total = frm.doc.balance_amount || 0;
//     let paid = frm.doc.pay_amount || 0;
//     if (paid > total) {
//         frappe.msgprint("Amount paid cannot be greater than total amount.");
//         frm.set_value("pay_amount", 0);
//         return;
//     }
//     let balance = total - paid;

//     console.log(balance);
    
//     frm.set_value("balance_amount", balance);

//     frappe.db.set_value(
//         "Cart_Products",
//         frm.doc.cart,
//         "balance_amount",
//         balance
//     )

//     frappe.db.get_doc(
//     "Cart_Products",
//     frm.doc.cart
//            ).then(res => {
//     let old_paid = res.amount_paid || 0;
//     let new_paid = old_paid + paid;
//     frappe.db.set_value(
//         "Cart_Products",
//         frm.doc.cart,
//         "amount_paid",
//         new_paid
//     );
// });
// }

frappe.ui.form.on("Payment", {
    cart(frm) {
        calculate_payment(frm);
    },
    pay_amount(frm) {
        calculate_payment(frm);
    },
    after_save(frm) {
        update_cart(frm);
    }

});

function calculate_payment(frm) {

    let total = frm.doc.balance_amount || 0;
    let paid = frm.doc.pay_amount || 0;
    if (paid > total) {
        frappe.msgprint(
            "Amount paid cannot be greater than balance amount."
        );
        frm.set_value("pay_amount", 0);
        return;
    }

    let balance = total - paid;
    frm.set_value("balance_amount", balance);
}

function update_cart(frm) {
    if (!frm.doc.cart) {
        console.log("No Cart selected.");
        return;
    }
    let paid = frm.doc.pay_amount || 0;
    if (paid <= 0) {
        console.log("No payment amount to update.");
        return;
    }
    frappe.db.get_doc(
        "Cart_Products",
        frm.doc.cart
    ).then(res => {
        console.log("Cart:", res);
        let old_paid = res.amount_paid || 0;
        let old_balance = res.balance_amount || 0;
        let new_paid = old_paid + paid;
        let new_balance = old_balance - paid;
        frappe.db.set_value(
            "Cart_Products",
            frm.doc.cart,
            {
                amount_paid: new_paid,
                balance_amount: new_balance
            }
        ).then(() => {
            console.log("Cart_Products updated successfully.");
        });
    });
}
