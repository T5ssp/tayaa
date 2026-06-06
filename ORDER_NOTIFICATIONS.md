# Order notifications

The storefront saves every authenticated checkout order in Firestore at:

```text
orders/{orderId}
```

It also creates a mail queue document at:

```text
mail/{mailId}
```

The queued email is addressed to:

```text
bader2233062@gmail.com
```

When the customer is signed in with an email account, the site also queues a customer invoice email to the same authenticated email address. Phone-only customers still see the invoice in `account.html`; sending invoices to arbitrary typed emails should be handled by a trusted Cloud Function to avoid abuse.

To make the email send automatically, install and configure Firebase's **Trigger Email** extension in Firebase Console:

1. Open Firebase Console.
2. Go to Extensions.
3. Install **Trigger Email**.
4. Set the mail collection path to `mail`.
5. Configure your SMTP provider.
6. Publish the Firestore rules from `firestore.rules.example`.

Without the extension or a Cloud Function, GitHub Pages can create the Firestore queue document, but it cannot send email by itself.

The Admin Panel also shows order rows and provides manual email/WhatsApp notification links as a fallback.
