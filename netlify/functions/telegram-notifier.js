const axios = require('axios');

exports.handler = async function(event) {
    // Отримуємо дані з форми, які нам передає Netlify
    const formData = JSON.parse(event.body).payload.data;
    const { name, phone, product } = formData;

    // Беремо секретні ключі з налаштувань Netlify (безпечний спосіб)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Форматуємо повідомлення
    const message = `🔔 Нове замовлення!\n\n🍽️ Страва: ${product}\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}`;

    // Формуємо URL для відправки в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        // Відправляємо повідомлення в Telegram
        await axios.post(telegramUrl, {
            chat_id: chatId,
            text: message,
        });

        // Повертаємо успішну відповідь Netlify
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Повідомлення успішно відправлено" }),
        };
    } catch (error) {
        console.error("Помилка відправки в Telegram:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Помилка сервера" }),
        };
    }
};