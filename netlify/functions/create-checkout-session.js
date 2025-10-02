// Підключаємо бібліотеку Stripe і передаємо їй наш секретний ключ з налаштувань Netlify
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
    try {
        // У майбутньому сюди можна передавати дані про товар і ціну з фронтенду.
        // Зараз для тренування ми створимо один товар з фіксованою ціною.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur', // Валюта платежу
                        product_data: {
                            name: 'Замовлення з Cucina Italiana',
                        },
                        unit_amount: 2500, // Ціна в найдрібніших одиницях (2500 центів = 25.00 EUR)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // URL, на які Stripe перенаправить користувача після оплати
            success_url: `https://fascinating-souffle-ea05d3.netlify.app/success.html`,
            cancel_url: `https://fascinating-souffle-ea05d3.netlify.app/`,
        });

        // Повертаємо ID сесії фронтенду
        return {
            statusCode: 200,
            body: JSON.stringify({ id: session.id }),
        };
    } catch (error) {
        console.error("Помилка створення сесії Stripe:", error);
        return { statusCode: 500, body: error.toString() };
    }
};
