import React, { useCallback, useEffect, useRef } from 'react';
import './App.css';

import { client, applePay, ApplePaySession } from 'braintree-web';

function App() {
  const applePayInstanceFinal = useRef();

  const initial = async () => {
    client.create({
      authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTnpnNE1ERTFOREFzSW1wMGFTSTZJall5TkRRME0yVXhMV1pqT0RBdE5EWXpaaTA0TnpNMExUTXpPRGt4TlRZM05XUTFNQ0lzSW5OMVlpSTZJakkxWnpScmFEVm1iVGM1TWpaaU9XUWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pTWpWbk5HdG9OV1p0TnpreU5tSTVaQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENKZExDSnZjSFJwYjI1eklqcDdmWDAuWDBVNVNpNzhMV2pZa0xsQTZ1ZkNPYklvT2N1dHR2RGFmTHFqQmc4dDJRME1BTWp0TzZxamphc1h0S1puSzNRTHYzeUFxcW42d29yT2l1cHlwcDA2c1EiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMjVnNGtoNWZtNzkyNmI5ZC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8yNWc0a2g1Zm03OTI2YjlkL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoiMjVnNGtoNWZtNzkyNmI5ZCIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbXSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vMjVnNGtoNWZtNzkyNmI5ZCJ9LCJhcHBsZVBheSI6eyJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmlucXVpcmVyLmRldi5jaGVja291dCIsInN0YXR1cyI6Im1vY2siLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiLCJkaXNjb3ZlciJdfSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOmZhbHNlLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYWxsb3dIdHRwIjp0cnVlLCJkaXNwbGF5TmFtZSI6IlRoZSBQaGlsYWRlbHBoaWEgSW5xdWlyZXIiLCJjbGllbnRJZCI6IkFlX3hqMTN3aElVZWplOVR1VlYwcjNoQ2dRb2lqSHdVUmNXclljbmw2RVdUc0JnWmY0U2hyYkZNWS00TExyenp6M0tIaWsxa2NyanlQNVJ1IiwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiJ0aGVwaGlsYWRlbHBoaWFpbnF1aXJlciIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ=='
    }, (error, clientInstance) => {
      if (error) {
        console.log('ERROR', error);
      }

      applePay.create({ client: clientInstance }, (applePayError, applePayInstance) => {
        if (applePayError) {
          return console.log('Apple pay error', applePayError);
        }

        // applePayInstance?.performValidation()
        // @ts-ignore
        applePayInstanceFinal.current = applePayInstance;
      })
    })
  }

  const handleSubmit = useCallback(() => {
    console.log('Submit clicked', applePayInstanceFinal);
    if (applePayInstanceFinal.current) {
      // @ts-ignore
      const paymentRequest = applePayInstanceFinal.current?.createPaymentRequest({
        total: {
          label: 'Kayo Package',
          amount: '19.99'
        }
      })

      console.log('Package created', paymentRequest);

      // @ts-ignore
      const session: ApplePaySession = new window.ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = function (event: any) {
        // @ts-ignore
        applePayInstanceFinal.current?.performValidation({
          validationURL: event.validationURL,
          displayName: 'My Great Store'
        }, function (validationErr: any, validationData: any) {
          if (validationErr) {
            console.error(validationErr);
            session.abort();
            return;
          }
    
          session.completeMerchantValidation(validationData);
        });
      };

      session.onpaymentauthorized = function (event: any) {
        // @ts-ignore
        applePayInstanceFinal.current?.tokenize({
          token: event.payment.token
        }, function (tokenizeErr: any, tokenizedPayload: any) {
          if (tokenizeErr) {
            console.log('====ERROR on process payment', tokenizeErr);
            alert('Error with payment');
            // @ts-ignore
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            return;
          }
          console.log('Payment completed', tokenizedPayload);
          // @ts-ignore
          session.completePayment(ApplePaySession.STATUS_SUCCESS);
    
          // Send the tokenizedPayload to your server here!
        });
      };

      session.begin();
    }
  }, [applePayInstanceFinal]);

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className="App">
      <button onClick={() => handleSubmit()}>Pay with Apple</button>
      <div>v1.11</div>
    </div>
  );
}

export default App;
