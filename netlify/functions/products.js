exports.handler = async function(event) {
    try {
        // Простий об'єкт з продуктами та їх цінами в Stripe
        const products = {
            'Farfalle Alfredo': {
                name: 'Farfalle Alfredo', 
                price_id: 'price_1PXXXXXX01', // Замініть на вашій real price ID
                price: 1200 // ціна в центах (12.00 EUR)
            },
            'Pizza Margherita': {
                name: 'Pizza Margherita', 
                price_id: 'price_1PXXXXXX02', 
                price: 1500
            },
            'Panini Italiana': {
                name: 'Panini Italiana', 
                price_id: 'price_1PXXXXXX03', 
                price: 800
            },
            'Insalata Caprese': {
                name: 'Insalata Caprese', 
                price_id: 'price_1PXXXXXX04', 
                price: 900
            }
        };

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };

    } catch (error) {
        console.error('Products fetch error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Products fetch failed' }),
        };
    }
};
