// Copyright (c) 2026, logeshwar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Cart", {
    quantity(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        let total = row.price * row.quantity;
        frappe.model.set_value(cdt, cdn, "total_price", total);
        calculate_cart_total(frm);
    },
    add_product_remove(frm){
        calculate_cart_total(frm);
    }
});

frappe.ui.form.on("Cart_Products",{
    refresh(frm){
        frm.set_df_property("add_product","cannot_add_rows",true);

        frm.add_custom_button("Add Product",function(){
            frappe.call({
                method:"frappe.client.get_list",
                args:{
                    doctype:"Items",
                    fields:[
                        "name",
                        "product_name",
                        "price",
                        "stock_quantity"
                    ]
                },
                callback(r){
                    if (!r.message || r.message.length === 0) {
                        frappe.msgprint("No products available.");
                        return;
                    }
                    let products=r.message;
                    let html=`
                        <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Available</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                    `;
                    products.forEach(function(product, index){
                        html+=`
                            <tr>
                                <td>
                                    <input type="checkbox" class="product-check" data-index="${index}"></input>
                                </td>
                                <td>${product.product_name}</td>
                                <td>${product.price}</td>
                                <td>${product.stock_quantity}</td>
                                <td>
                                    <input
                                        type="number"
                                        class="form-control product-quantity"
                                        data-index="${index}"
                                        value="1"
                                        min="1"
                                        max="${product.stock_quantity}"
                                    ></input>
                                </td>
                            </tr>
                        `;
                    });
                    html+=`
                        </tbody>
                        </table>
                    `;

                    let dialog=new frappe.ui.Dialog({
                        title:"Add Products",
                        fields:[
                            {
                                fieldname:"products_html",
                                fieldtype:"HTML"
                            }
                        ],
                        primary_action_label:"Add",
                        primary_action(){
                            let selected=[];
                            dialog.$wrapper.find(".product-check:checked").each(function(){
                                let index = $(this).data("index");
                                let product = products[index];
                                let quantity=dialog.$wrapper.find('.product-quantity[data-index="' + index + '"]').val();
                                quantity = parseInt(quantity);
                                if(quantity<=0){
                                    frappe.msgprint("Quantity must be greater than 0");
                                    return;
                                }
                                if(quantity>product.stock_quantity){
                                    frappe.msgprint("Not enough quantity");
                                    return;
                                }
                                selected.push({
                                    product:product,
                                    quantity:quantity
                                });
                            });
                            if(selected.length===0){
                                frappe.msgprint("Select atleast 1 product");
                                return;
                            }
                            selected.forEach(function(item){
                                let row=frm.add_child("add_product");
                                row.item_code = item.product.name;
                                row.product_name = item.product.product_name;
                                row.price = item.product.price;
                                row.quantity = item.quantity;
                                row.total_price = item.product.price * item.quantity;
                            });
                            frm.refresh_field("add_product");
                            calculate_cart_total(frm);
                            dialog.hide();
                        }
                    });
                    dialog.fields_dict.products_html.$wrapper.html(html);
                    dialog.show();
                }
            });
        });
    }
});

//Function for calculating the cart total and grand total
function calculate_cart_total(frm){
    let total = 0;
    let grand = 0;
    for (let row of frm.doc.add_product) {
        total = total + row.total_price;
    }
    frm.set_value("cart_total", total);
    frm.set_value("grand_total", total);
    // if(total>=1000000){
    //     grand = total-(total*0.1);
    //     frm.set_value("grand_total", grand);
    // }
    // else{
    //     frm.set_value("grand_total", total);
    // }
    coupon(frm);
}

function coupon(frm){
    if(!frm.doc.coupon_code){
        frappe.msgprint("Not Applied Any Coupon");
        frm.set_value('grand_total',frm.doc.cart_total);
        return;
    }
    frappe.db.get_doc(
        "Discount",
        frm.doc.coupon_code
    ).then( res => {
            if(!res.active){
                frappe.msgprint("Inactive Coupon");
                frm.set_value('grand_total',frm.doc.cart_total);
                return;
            }
            if((frm.doc.cart_total || 0)<res.minimum_amount){
                frappe.msgprint(`please add upto ${res.minimum_amount}`);
                frm.set_value('grand_total',frm.doc.cart_total);
                return;
            }

            let discount_amount = (frm.doc.cart_total)*res.percentage/100;
            let dis_price = frm.doc.cart_total - discount_amount;
            
            frm.set_value('grand_total',dis_price);

            frappe.show_alert({
                message:`Discount applied upto ${res.percentage}%percentage`,
                indicator:"green"
            });
    })
}

frappe.ui.form.on("Cart_Products",{
    coupon_code(frm){
        coupon(frm);
    }
});


//Payment

frappe.ui.form.on("Cart_Products", {
    refresh(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button("Make Payment", function() {
                make_payment(frm);
            });
        }
    },

    grand_total(frm) {
        if (!frm.doc.amount_paid) {
            frm.set_value("amount_paid", 0);
        }
        let balance = frm.doc.grand_total - frm.doc.amount_paid;
        frm.set_value("balance_amount", balance);
    }
});

function make_payment(frm) {
    if (frm.doc.balance_amount <= 0) {
        frappe.msgprint("This cart is already fully paid.");
        return;
    }
    frappe.new_doc("Payment", {
        cart: frm.doc.name,
        customer_name: frm.doc.customer_name,
        phone_number: frm.doc.phone_number,
        total_amount: frm.doc.grand_total,
        balance_amount: frm.doc.balance_amount,
        payment_status: "Pending"
    });
}

frappe.ui.form.on("Cart_Products",{
    refresh(frm){
        if(frm.doc.balance_amount==0){
            frm.remove_custom_button("Make Payment");
        }
    }
});