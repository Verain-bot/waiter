import { RazorpayOptions } from "react-razorpay";
import { UserContextType } from "../context/LoginContext";


export const payUsingRazorPay = (id : string, Razorpay : any, handler_func: (response : any)=> void , user : UserContextType)=>{
    const options : RazorpayOptions = {
        key: process.env.REACT_APP_RZP_KEY as string, // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "ViewOne Digital Solutions",
        description: "Payment for Order #"+id,
        image: "/icon/1080.png",
        order_id: id,
        handler: handler_func,
        prefill: {
          name: user?.first_name + ' ' + user?.last_name,
          email: user?.email,
          contact: user?.username,
        },
        theme: {
          color: "#000000",
        },
      }
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response: any) {
        console.log('FAILED')
        console.log(response)
      });
    
      rzp1.open();
}