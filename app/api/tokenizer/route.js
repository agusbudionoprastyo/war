import { Midtrans } from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
    const { id, customer, itemDetails } = await request.json();

    // Extract customer details
    const { name, ig, email, phone } = customer;

    // Hitung total gross_amount dari itemDetails
    const grossAmount = itemDetails.reduce((total, item) => total + (item.price * item.quantity), 0);

    const parameter = {
        item_details: itemDetails, // Menggunakan itemDetails yang diterima
        transaction_details: {
            order_id: id,
            gross_amount: grossAmount,
        },
        customer_details: {
            first_name: name || '',
            last_name: ig || '',
            email: email || 'customer@dafam.cloud',
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
