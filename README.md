# Try Web Demo

- [Click to try demo](https://totp-authenticator-cb826.web.app)

# TOTP Authentication App

## Support the Project

If you find this project helpful, you can support its development by making a donation. Your contribution will help maintain and improve the project.

### Donate via USDT TRC20

![USDT TRC20](https://cdn-icons-png.flaticon.com/128/825/825508.png)

**USDT TRC20 Address:** `TUw28XBfuy97smug3gDATQAFzq7St1cnaq`

### Donate via Bitcoin

![Bitcoin](https://cdn-icons-png.flaticon.com/128/5968/5968260.png)

**Bitcoin Address:** `1EtYvfSLXQ9ydA2CwY37MjMUgbU8DB5e37`

### Donate via TON

![TON](https://cdn-icons-png.flaticon.com/128/12114/12114247.png)

**TON Address:** `UQDMWU5uwi-AlWp9QyI8zgrGsThHfYIHfXDaTo7H_w19GuYW`

This is a simple TOTP (Time-based One-Time Password) authentication application implemented in React using react-beautiful-dnd for drag-and-drop functionality. The app supports manual addition of TOTP tokens, importing from a JSON file, and scanning QR codes for quick setup.

# Instructions
##Running the Application

Install dependencies: `npm install` or `npm install --legacy-peer-deps`
Start the development server: `npm start`

# Usage
##Manual Token Addition:

Click on the "Add" button in the top left corner.
Choose "Manual" from the dropdown.
Fill in the label and secret values in the form and submit.

## QR Code Scanning:

Click on the "Add" button in the top left corner.
Choose "Qr Code" from the dropdown.
A modal with a QR code scanner will appear. Scan the QR code of your TOTP token.
Drag and Drop:

Tokens in the list can be reordered using drag-and-drop. Click and drag on the token to the desired position.

## Export/Import:

Click on the "Export TOTP Data" option in the right dropdown to export all tokens to a JSON file.
To import tokens, use the "Import TOTP Data from file" option in the right dropdown and select the JSON file.
Token Actions:

Click on a token to copy its current OTP (One-Time Password) to the clipboard.
Remove a token by clicking on the delete icon.

## Auto-refresh:

Tokens' OTPs are automatically refreshed every 3 seconds.

## Notes
All added tokens are stored locally in the browser's localStorage.
If no tokens are added, a message will indicate that no TOTP tokens have been added yet.
Feel free to contribute to the project and enhance its features!

Technologies Used
- React
- react-beautiful-dnd
- otpauth
- usehooks-ts

