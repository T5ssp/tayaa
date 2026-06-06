# Payment integration

The checkout page is prepared for:

- Cash on delivery
- Bank transfer
- Visa
- Mastercard
- Apple Pay

Current behavior:

- Cash on delivery and bank transfer can create real orders now.
- Visa, Mastercard, and Apple Pay are shown as future secure-gateway options until a provider is connected.
- The order is saved in Firestore with `paymentMethod`.
- The order is marked with a manual `paymentStatus` such as cash on delivery or awaiting bank transfer confirmation.
- The site does **not** collect raw card numbers, CVV, or Apple Pay tokens.

Required for live payments:

1. Choose a payment provider such as Stripe, Thawani, PayTabs, Tap, or another Oman-compatible provider.
2. Create a secure backend endpoint or Firebase Cloud Function.
3. Send cart totals and order ID to that backend.
4. Create a payment session with the provider.
5. Redirect the customer to the provider-hosted checkout or use the provider's secure client SDK.
6. Update `orders/{orderId}.paymentStatus` after webhook confirmation.

Do not process card data directly in GitHub Pages.
