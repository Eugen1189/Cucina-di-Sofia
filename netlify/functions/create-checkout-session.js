const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
    try {
        const { product_name, quantity = 1 } = JSON.parse(event.body);
        
        if (!product_name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Product name is required' }),
            };
        }

        // Отримуємо ціну з products.js (у реальному проєкті це може бути база даних)
        const productsResponse = await fetch(`${process.env.URL}/.netlify/functions/products`);
        const products = await productsResponse.json();
        
        const productData = products[product_name];
        if (!productData) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Product not found' }),
            };
        }

        // Створюємо Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: productData.price_id,
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL}/cancel`,
            metadata: {
                product_name: product_name,
                product_price: productData.price,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                sessionId: session.id,
                url: session.url 
            }),
        };

    } catch (error) {
        console.error('Stripe checkout error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
