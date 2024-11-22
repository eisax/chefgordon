
# Kiwabot(NOT MY CODEBASE)

**Kiwabot** is a WhatsApp chatbot built using Node.js and the `whatsapp-web.js` library. It supports multi-stage workflows, user interactions, and easy customization for various use cases.

## Features

- QR code-based WhatsApp authentication.
- Multi-stage conversation flows.
- Easy integration with external APIs using `axios`.
- Modular and scalable code structure.
- Error handling for seamless user experience.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kiwabot.git
   cd kiwabot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the chatbot:

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

4. Scan the QR code displayed in the terminal using your WhatsApp mobile app to link your account.

---

## File Structure

- **src/server.js**: Main entry point for the chatbot.
- **stages/**: Contains stage logic for multi-step conversations.
- **storage.js**: Manages persistent data across sessions.
- **0.js, 1.js, ... 14.js**: Stages of the chatbot conversation.

---

## Configuration

### Dependencies

Below are the libraries used and their purpose:

| Library               | Purpose                                             |
|-----------------------|-----------------------------------------------------|
| `express`             | Web framework for potential API endpoints.          |
| `axios`               | For making HTTP requests to external services.      |
| `whatsapp-web.js`     | WhatsApp Web client for Node.js.                    |
| `qrcode-terminal`     | Displays the QR code for authentication in the CLI. |
| `nodemon`             | Automatically restarts the server during development.|

### Customize Conversation Stages

The chatbot uses a modular design for conversation flows. Each stage is a separate JavaScript file in the `stages/` directory.

#### Example

To customize the **initialStage**, edit the `0.js` file:

```javascript
export const initialStage = {
  exec: async ({ from, message, client }) => {
    // Example response
    return 'Welcome to Kiwabot! How can I assist you today?';
  },
};
```

#### Adding a New Stage

1. Create a new file, e.g., `stages/15.js`:

   ```javascript
   export const fifteen = {
     exec: async ({ from, message, client }) => {
       return 'This is a new stage response!';
     },
   };
   ```

2. Import the new stage in `stages.js`:

   ```javascript
   import { fifteen } from './15.js';
   export { ..., fifteen };
   ```

3. Update the `getStage()` logic in `stages.js` to route users to the new stage.

---

## Troubleshooting

- **QR Code not displayed**:
  Ensure your terminal supports UTF-8 encoding. Resize the terminal if the QR code appears cut off.
  
- **Authentication Failure**:
  Check the `auth_failure` message for specific issues and re-scan the QR code.

- **Unhandled Errors**:
  Review logs for specific issues and ensure all stages return valid responses.

---

## Contributing

Feel free to fork the repository and submit pull requests for enhancements or bug fixes.

---

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
