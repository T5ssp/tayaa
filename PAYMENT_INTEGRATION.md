# Payment integration

The checkout page is prepared for:

- Visa
- Mastercard
- Apple Pay

Current behavior:

- The user selects a payment method.
- The order is saved in Firestore with `paymentMethod`.
- The order is marked `paymentStatus: "بانتظار ربط بوابة الدفع"`.
- The site does **not** collect raw card numbers, CVV, or Apple Pay tokens.

Required for live payments:

1. Choose a payment provider such as Stripe, Thawani, PayTabs, Tap, or another Oman-compatible provider.
2. Create a secure backend endpoint or Firebase Cloud Function.
3. Send cart totals and order ID to that backend.
4. Create a payment session with the provider.
5. Redirect the customer to the provider-hosted checkout or use the provider's secure client SDK.
6. Update `orders/{orderId}.paymentStatus` after webhook confirmation.

Do not process card data directly in GitHub Pages.
