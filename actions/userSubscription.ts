"use server"

import { absoluteUrl } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserSubscription } from '../db/queries';
import { stripe } from "@/lib/stripe";

const returnUrl = absoluteUrl("/shop");

// 課金ポータルへのURLを生成
export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error('ユーザーが見つかりません');
    }

    const userSubscription = await getUserSubscription();
    if(userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl
        });

        return { data: stripeSession.url};
    }
    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "JPY",
                    product_data: {
                        name: "HojoZei Pro",
                        description: "永久ハート",
                    },
                    unit_amount: 100,
                    recurring: {
                        interval: "month"
                    }
                }
            }
        ],
        metadata: {
            userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: stripeSession.url}
};