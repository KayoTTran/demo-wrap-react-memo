const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "25g4kh5fm7926b9d",
  publicKey: "7px4p3z4y9v43953",
  privateKey: "4fb05fbea000990e8b6e00b27b848ca4"
});


gateway.clientToken.generate({}, (err, response) => {
  // pass clientToken to your front-end
  const clientToken = response.clientToken
  console.log('You client token', clientToken);
});


