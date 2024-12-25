// stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    public stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(
            'sk_test_51QXiFqA1oCi0R4VijWuYqzD8RdNJ3ZDjIJV6Mx2sWcPtPmWXlKm1i9QVjpwxahkn5iJq5aw7xKBdqjbz1dat7FWr00E3XSAKk8',
        );
    }

    async createProduct(name: string, description: string) {
        return this.stripe.products.create({
            name,
            description,
        });
    }

    async createPrice(productId: string, unitAmount: number, currency: string) {
        return this.stripe.prices.create({
            product: productId,
            unit_amount: unitAmount,
            currency,
        });
    }

    // async createCheckoutSession(
    //   priceId: string,
    //   successUrl: string,
    //   cancelUrl: string,
    // ) {
    //   return this.stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         price: priceId,
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     success_url: successUrl,
    //     cancel_url: cancelUrl,
    //   });
    // }

    async createCheckoutSession(amount: number) {
        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // cent
                        product_data: {
                            name: 'Property Rental',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
    }
    // webhook la chay khi user thanh toan thanh cong hay that bai
    async handleWebhookEvent(event: Stripe.Event) {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;
                // Handle successful checkout session
                console.log('Checkout session completed:', session);
                break;
            default:
                console.warn(`Unhandled event type ${event.type}`);
        }
    }
}