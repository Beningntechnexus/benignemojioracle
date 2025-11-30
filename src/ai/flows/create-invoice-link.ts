'use server';

/**
 * @fileOverview Creates a Telegram invoice link for tipping.
 *
 * - createInvoiceLink - A function that generates the invoice link.
 * - CreateInvoiceLinkInput - The input type for the createInvoiceLink function.
 * - CreateInvoiceLinkOutput - The return type for the createInvoiceLink function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreateInvoiceLinkInputSchema = z.object({
  userId: z.number().describe('The Telegram user ID.'),
});
export type CreateInvoiceLinkInput = z.infer<
  typeof CreateInvoiceLinkInputSchema
>;

const CreateInvoiceLinkOutputSchema = z.object({
  invoiceUrl: z.string().describe('The Telegram invoice link.'),
});
export type CreateInvoiceLinkOutput = z.infer<
  typeof CreateInvoiceLinkOutputSchema
>;

export async function createInvoiceLink(
  input: CreateInvoiceLinkInput
): Promise<CreateInvoiceLinkOutput> {
  return createInvoiceLinkFlow(input);
}

const createInvoiceLinkFlow = ai.defineFlow(
  {
    name: 'createInvoiceLinkFlow',
    inputSchema: CreateInvoiceLinkInputSchema,
    outputSchema: CreateInvoiceLinkOutputSchema,
  },
  async ({ userId }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured.');
    }

    const apiUrl = `https://api.telegram.org/bot${botToken}/createInvoiceLink`;

    const invoicePayload = {
      title: 'Tip for the Oracle',
      description: 'A tip for a great fortune!',
      payload: `tip-1-star-for-${userId}`,
      provider_token: '', // Not needed for Stars
      currency: 'XTR',
      prices: [{ label: '1 Star', amount: 1 }],
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoicePayload),
    });

    const data = await response.json();

    if (!data.ok || !data.result) {
      console.error('Telegram API Error:', data);
      throw new Error('Failed to create invoice link.');
    }

    return { invoiceUrl: data.result };
  }
);
