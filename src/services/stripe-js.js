import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  toast.error('Informações públicas do Stripe não configuradas corretamente');
}

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return stripeJs;
}
