import React, { useEffect, useState } from 'react';

function loadScript(src) {
		const script = document.createElement('script')
		script.src = src
		script.onload = document.body.appendChild(script);		
}

function Test() {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch('/create/orderId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: '50000',
          }),
        });

        const data = await response.json();

        if (data.id) {
          setOrderId(data.id);
          initializeRazorpay(data.id);
        } else {
          console.log('Failed to create an order.');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    createOrder();
  }, []);

  const initializeRazorpay = async (order_id) => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    const options = {
      key: 'rzp_test_KWOIl1E1t3eaDU',
      amount: 50000,
      currency: 'INR',
      name: 'Nike',
      description: 'Nike football shoes are here !!',
      image:
        'https://w7.pngwing.com/pngs/141/850/png-transparent-nike-logo-movement-brands-nike-thumbnail.png',
      order_id: order_id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);

        const verifyPayment = async () => {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ response }),
            });

            const verificationData = await verifyResponse.json();

            if (verificationData.signatureIsValid === 'true') {
              window.location.href = '/success';
            } else {
              alert('Sorry payment failed !!');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        };

        verifyPayment();
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    document.getElementById('rzp-button1').onclick = function (e) {
      rzp1.open();
      e.preventDefault();
    };
  };

  return (
    <div>
      <button id="rzp-button1" onClick={initializeRazorpay}> Pay </button>
    </div>
  );
}

export default Test;
