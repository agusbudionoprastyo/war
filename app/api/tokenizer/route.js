import { Midtrans } from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
    const { id, productName, price, quantity, customer } = await request.json();

    // Extract customer details
    const { name, ig, email, phone } = customer;

    const parameter = {
        item_details: [
            {
                id: id,
                name: productName,
                price: price,
                quantity: quantity,
            },
        ],
        transaction_details: {
            order_id: id,
            gross_amount: price * quantity,
        },
        customer_details: {
            first_name: name || '',
            last_name: ig || '',
            email: email || '',
            phone: phone || '',
        },
    };

    try {
        const token = await snap.createTransactionToken(parameter);
        console.log(token);
        return NextResponse.json({ token });
    } catch (error) {
        console.error("Error creating transaction token:", error);
        return NextResponse.json({ error: "Transaction failed." }, { status: 500 });
    }
}