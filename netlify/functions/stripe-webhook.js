const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.handler = async function(event) {
    try {
        const payload = event.body;
        const sig = event.headers['stripe-signature'];

        // Перевіряємо сигнатуру webhook
        const stripeEndpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        
        let stripeEvent;
        try {
            stripeEvent = stripe.webhooks.constructEvent(payload, sig, stripeEndpointSecret);
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid signature' }),
            };
        }

        // Обробляємо подію успішного платежу
        if (stripeEvent.type === 'checkout.session.completed') {
            const session = stripeEvent.data.object;
            
            console.log('Payment completed for session:', session.id);
            
            // Отримуємо метадані замовлення
            const productName = session.metadata.product_name || 'Italian Dish';
            const customerEmail = session.customer_details.email || 'no email';
            
            // Відправляємо повідомлення в Telegram
            const botToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;
            
            if (botToken && chatId) {
                const message = `💳💰 ПЛАТІЖ STRIPE ПРИЙНЯТО!\n\n🍽️ Страва: ${productName}\n📧 Email клієнта: ${customerEmail}\n💰 Сума: ${session.amount_total / 100} ${session.currency.toUpperCase()}\n🆔 Session ID: ${session.id}`;
                
                await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    chat_id: chatId,
                    text: message,
                });
                
                console.log('Telegram notification sent for Stripe payment');
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };

    } catch (error) {
        console.error('Webhook handling error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Webhook handling failed' }),
        };
    }
};
