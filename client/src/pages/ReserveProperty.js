import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';

const ReserveProperty = () => {
    const { reserveProperty } = useSelector((state) => state.SearchReducer);
    console.log(reserveProperty);
    const { customer } = useSelector((state) => state.CustomerReducer);
    // const {_id} = reserveProperty;
    const { _id, title, userName, userId } = reserveProperty;
    const customerId = customer._id;
    let reserveAmount = reserveProperty.price * 0.5 / 100;
    const tokenHandler = async (token) => {
        console.log(token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post(`/property_reserve`, { _id }, config);
            console.log(response);
            try {
                const res = await axios.post("/addReserveProperty", { _id, title, userName, userId, customerId }, config);
                console.log(res);
            } catch (error) {
                console.log(error.response);
            }
            alert("reserved");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 100 }}>
            <StripeCheckout
                amount={reserveAmount * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_51KOQYBF6OmXoAHCJyYM1za2zYkn3f4B9nzR9Tt0T6rfW65yuqHTioon1aGQRkXezbKzbby7G13MWflS6uFbSzFsI00pWFn96cj"
                currency="AUTRALIA"
            >
                <button className="btn btn-primary">Pay Now</button>
            </StripeCheckout>
        </div>
    )
}
const reservedHandler = (token, reserveAmount) => {

}
export default ReserveProperty;