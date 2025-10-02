const axios = require('axios');

// Ця функція допомагає "розшифрувати" дані, що надійшли з форми
const { URLSearchParams } = require('url');

exports.handler = async function(event) {
    try {
        // ✨ КЛЮЧОВЕ ВИПРАВЛЕННЯ:
        // Ми більше не очікуємо JSON від Netlify.
        // Замість цього, ми парсимо дані, що надійшли напряму з форми.
        const formData = new URLSearchParams(event.body);
        const name = formData.get('name') || 'Не вказано';
        const phone = formData.get('phone') || 'Не вказано';
        const product = formData.get('product') || 'Невідома страва';
        // ✨ ОТРИМУЄМО НОВЕ ПОЛЕ "АДРЕСА"
        const address = formData.get('address') || 'Не вказано';
        
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            throw new Error("Секретні ключі Telegram не налаштовано на Netlify.");
        }

        // ✨ ДОДАЄМО АДРЕСУ В ТЕКСТ ПОВІДОМЛЕННЯ
        const message = `🔔 Нове замовлення!\n\n🍽️ Страва: ${product}\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n\n📍 Адреса: ${address}`;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        await axios.post(telegramUrl, {
            chat_id: chatId,
            text: message,
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Повідомлення успішно відправлено" }),
        };

    } catch (error) {
        console.error("Помилка у функції telegram-notifier:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Внутрішня помилка сервера." }),
        };
    }
};