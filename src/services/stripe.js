import Stripe from 'stripe';
import packageJson from '../../package.json';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    toast.error('Informações do Stripe não configuradas corretamente');
}

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'Grati',
        version: packageJson.version,
    },
});


async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    return stripeJs;
}

export { stripe, getStripeJs };