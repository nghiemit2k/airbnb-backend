import {
    Body,
    Controller,
    Headers,
    HttpException,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common';
import { Public } from '../../common/decorator/public.decorator';
import { StripeService } from './stripe.service';
import { RequestWithRawBody } from '../../raw-body.middleware';
@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }
    @Post('create-product')
    async createProduct(@Body() body: { name: string; description: string }) {
        return this.stripeService.createProduct(body.name, body.description);
    }
    @Post('create-price')
    async createPrice(
        @Body() body: { productId: string; unitAmount: number; currency: string },
    ) {
        return this.stripeService.createPrice(
            body.productId,
            body.unitAmount,
            body.currency,
        );
    }
    @Public()
    @Post('create-checkout-session')
    async createCheckoutSession(@Body() body: { amount: number }) {
        return this.stripeService.createCheckoutSession(body.amount * 100);
    }
    @Public()
    @Post('webhook')
    async handleStripeWebhook(
        @Req() req: RequestWithRawBody,
        @Headers('stripe-signature') signature: string,
    ) {
        console.log('request', req.rawBody);
        console.log('🚀 ~ StripeController ~ signature:', signature);
        const rawBody = req.rawBody;
        console.log('🚀 ~ StripeController ~ rawBody:', rawBody);
        try {
            const event = this.stripeService.stripe.webhooks.constructEvent(
                rawBody,
                signature,
                'whsec_x92Vt4JGsltB8SEAyzHa80HCgRdf71Fk',
            );
            // Handle the event based on its type
            await this.stripeService.handleWebhookEvent(event);
            return {
                message: 'Received webhook',
            };
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            throw new HttpException(
                'Webhook signature verification failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    // @Post('webhook')
    // async handleWebhook(@Req() req: Request, @Res() res: Response) {
    //   const sig = req.headers['stripe-signature'] as string;
    //   const endpointSecret = 'whsec_4AbeRcrRh8xpCHbBn5ptzRcw1Z1rBgAQ';
    //   let event;
    //   try {
    //     event = this.stripeService.stripe.webhooks.constructEvent(
    //       req.body,
    //       sig,
    //       endpointSecret,
    //     );
    //   } catch (err) {
    //     console.error('Webhook signature verification failed.', err.message);
    //     return res
    //       .status(HttpStatus.BAD_REQUEST)
    //       .send(`Webhook Error: ${err.message}`);
    //   }
    //   await this.stripeService.handleWebhookEvent(event);
    //   res.status(HttpStatus.OK).send('Received webhook');
    // }
}