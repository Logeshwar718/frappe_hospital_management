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

    // When Cart is selected
    cart(frm) {
        calculate_payment(frm);
    },

    // When Pay Amount is entered/changed
    pay_amount(frm) {
        calculate_payment(frm);
    },

    // After Payment is successfully saved
    after_save(frm) {
        update_cart(frm);
    }

});


// --------------------------------------------------
// Calculate Balance in Payment
// --------------------------------------------------

function calculate_payment(frm) {

    let total = frm.doc.balance_amount || 0;
    let paid = frm.doc.pay_amount || 0;

    // Validate payment amount
    if (paid > total) {

        frappe.msgprint(
            "Amount paid cannot be greater than balance amount."
        );

        frm.set_value("pay_amount", 0);

        return;
    }

    // Calculate remaining balance
    let balance = total - paid;

    console.log("Total / Previous Balance:", total);
    console.log("Pay Amount:", paid);
    console.log("New Balance:", balance);

    // Update only the Payment document
    frm.set_value("balance_amount", balance);
}


// --------------------------------------------------
// Update Cart_Products after Payment is saved
// --------------------------------------------------

function update_cart(frm) {

    // Make sure Cart is selected
    if (!frm.doc.cart) {
        console.log("No Cart selected.");
        return;
    }

    // Make sure payment amount exists
    let paid = frm.doc.pay_amount || 0;

    if (paid <= 0) {
        console.log("No payment amount to update.");
        return;
    }

    // Get the latest Cart_Products document
    frappe.db.get_doc(
        "Cart_Products",
        frm.doc.cart
    ).then(res => {

        console.log("Cart:", res);

        // Existing amount paid in Cart
        let old_paid = res.amount_paid || 0;

        // Existing balance in Cart
        let old_balance = res.balance_amount || 0;

        // Calculate new values
        let new_paid = old_paid + paid;
        let new_balance = old_balance - paid;

        console.log("Old Amount Paid:", old_paid);
        console.log("Payment:", paid);
        console.log("New Amount Paid:", new_paid);

        console.log("Old Balance:", old_balance);
        console.log("New Balance:", new_balance);

        // Update Cart_Products
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
