import { Hono } from 'hono';
import { setupTwitterObserver } from "@dialectlabs/blinks/ext/twitter";
import { ActionConfig, ActionContext } from "@dialectlabs/blinks";

const app = new Hono();
const RPC_URL = 'https://your-solana-rpc-url'; // Replace with your actual Solana RPC URL

// Setting up the Twitter observer
setupTwitterObserver(new ActionConfig(RPC_URL, {
  signTransaction: async (tx: string, context: ActionContext) => {
    // Simulating returning a valid transaction signature
    return { signature: 'your-signature-here' };
  },
  connect: async (context: ActionContext) => {
    // Simulating returning the connected wallet's public key
    return 'wallet-public-key';
  },
}));

// Blink GET route to display BLOOD token purchase options
app.get('/blink', async (c) => {
  const solPrice = 20; // Mocked SOL price, replace with actual API call for the price
  return c.json({
    label: 'Buy BLOOD',
    description: 'Purchase BLOOD using SOL',
    actions: [
      { amount: 25, sol: (25 / solPrice).toFixed(4), action: 'Buy BLOOD with $25' },
      { amount: 50, sol: (50 / solPrice).toFixed(4), action: 'Buy BLOOD with $50' },
      { amount: 100, sol: (100 / solPrice).toFixed(4), action: 'Buy BLOOD with $100' }
    ]
  });
});

// Blink POST route for handling transactions
app.post('/blink', async (c) => {
  const { amount } = await c.req.json();
  // Simulate transaction processing
  return c.json({
    status: 'success',
    message: `Transaction for ${amount} USD worth of BLOOD initiated.`,
  });
});

// Export the app as the default export
export default app;

