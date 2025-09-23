import Razorpay from 'razorpay';
import dotenv from 'dotenv'
dotenv.config()

const instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_KEY })

export async function getRazorpayOrderId(amount,receiptId) {
    try {
        const options = {
            amount,
            currency: "INR",
            receipt: receiptId
        };
        const res = await instance.orders.create(options);
        if(res.status !== 'created'){
            return {
                success:false,
                err:'Bad Gateway'
            }
        }
        return {
            success:true,
            data:res
        }
    } catch (err) {
        console.error("Error creating order:", err);
        return {
            success:false,
            err
        }
    }
}
