import Stripe from 'stripe';
import packageJson from '../../package.json';
import { toast } from 'react-toastify';

if(process.env.STRIPE_API_KEY === undefined) {
    toast.error('Informações privadas do Stripe não configuradas corretamente');
}

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'Grati',
        version: packageJson.version,
    },
});
