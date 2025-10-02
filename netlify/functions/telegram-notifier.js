const axios = require('axios');

exports.handler = async function(event) {
    console.log("--- Функція telegram-notifier запущена ---");

    try {
        const formData = JSON.parse(event.body).payload.data;
        const { name, phone, product } = formData;
        
        console.log("Отримані дані з форми:", formData);

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // ✨ Діагностичні логи ✨
        console.log("Чи існує Bot Token:", !!botToken); // Виведе true або false
        console.log("Чи існує Chat ID:", !!chatId);   // Виведе true або false

        if (!botToken || !chatId) {
            console.error("!!! Помилка: Bot Token або Chat ID не знайдено в налаштуваннях Netlify!");
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Помилка конфігурації сервера." }),
            };
        }

        const message = `🔔 Нове замовлення!\n\n🍽️ Страва: ${product}\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}`;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        console.log("Намагаюсь відправити повідомлення в Telegram...");

        const telegramResponse = await axios.post(telegramUrl, {
            chat_id: chatId,
            text: message,
        });

        // ✨ Лог відповіді від Telegram ✨
        console.log("Відповідь від Telegram API:", telegramResponse.data);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Повідомлення успішно відправлено" }),
        };

    } catch (error) {
        console.error("!!! СТАЛАСЯ КРИТИЧНА ПОМИЛКА:", error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Помилка сервера при відправці." }),
        };
    }
};