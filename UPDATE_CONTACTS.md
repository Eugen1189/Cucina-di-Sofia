# 📞 Як оновити контактну інформацію

## 🎯 Швидка інструкція

Відкрийте файл **`index.html`** та знайдіть модальне вікно резервації (рядок ~333).

---

## 📝 Що потрібно змінити

### 1. **Телефон**

**Знайдіть:**
```html
<p><a href="tel:+390123456789">+39 012 345 6789</a></p>
```

**Змініть на:**
```html
<p><a href="tel:+39XXXXXXXXX">+39 XXX XXX XXXX</a></p>
```

⚠️ **Важливо:** В `href="tel:..."` пишіть БЕЗ пробілів!

---

### 2. **Адреса**

**Знайдіть:**
```html
<p>Via Roma 123</p>
<p>10121 Torino, Italia</p>
```

**Змініть на:**
```html
<p>Ваша вулиця та номер</p>
<p>Поштовий індекс, Місто, Країна</p>
```

---

### 3. **Години роботи**

**Знайдіть:**
```html
<p>Lunedì - Domenica: 12:00 - 23:00</p>
<p class="info-note">Chiuso il martedì</p>
```

**Змініть на:**
```html
<p>Ваші дні та години</p>
<p class="info-note">Вихідний день (якщо є)</p>
```

---

### 4. **Email**

**Знайдіть:**
```html
<p><a href="mailto:info@cucinadisofia.it">info@cucinadisofia.it</a></p>
```

**Змініть на:**
```html
<p><a href="mailto:ВАШ@EMAIL.it">ВАШ@EMAIL.it</a></p>
```

---

### 5. **Примітка для груп**

**Знайдіть:**
```html
<p>Per gruppi di più di 6 persone, ti preghiamo di contattarci in anticipo.</p>
```

**Змініть на ваші правила:**
```html
<p>Ваші правила для великих груп</p>
```

---

## 🎨 Додаткові покращення (опціонально)

### Додати Google Maps:

**Вставте перед `</div>` (кінець reservation-body):**

```html
<div class="map-container">
    <h3>📍 Знайдіть нас на карті</h3>
    <iframe 
        src="https://www.google.com/maps/embed?pb=ВАШ_КОД" 
        width="100%" 
        height="300" 
        style="border:0; border-radius: 12px;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

**Як отримати код:**
1. Відкрийте Google Maps
2. Знайдіть вашу адресу
3. Натисніть "Share" → "Embed a map"
4. Скопіюйте код

---

### Додати соціальні мережі:

**Вставте в `reservation-info`:**

```html
<div class="info-block">
    <h3>📱 Social Media</h3>
    <p>
        <a href="https://instagram.com/ВАША_СТОРІНКА" target="_blank">📷 Instagram</a><br>
        <a href="https://facebook.com/ВАША_СТОРІНКА" target="_blank">👍 Facebook</a><br>
        <a href="https://tripadvisor.com/ВАША_СТОРІНКА" target="_blank">⭐ TripAdvisor</a>
    </p>
</div>
```

---

### Додати WhatsApp:

**Замість/додатково до телефону:**

```html
<div class="info-block">
    <h3>📞 Contatti Rapidi</h3>
    <p>
        <a href="tel:+390123456789">📞 +39 012 345 6789</a><br>
        <a href="https://wa.me/390123456789">💬 WhatsApp</a>
    </p>
</div>
```

---

## 🔍 Де знайти код

**Файл:** `index.html`  
**Рядки:** ~333-374  
**Блок:** `<div id="reservation-modal">`

**Знаки для пошуку:**
```html
<!-- Модальне вікно резервації -->
<div id="reservation-modal"
```

---

## ✅ Після оновлення

1. **Збережіть файл** (Ctrl+S)
2. **Перезавантажте браузер** (Ctrl+Shift+R)
3. **Клікніть "Prenota un tavolo"**
4. **Перевірте всю інформацію**

---

## 📱 Тестування контактів

### Перевірте кликабельність:

1. **Телефон:**
   - Клік має відкрити додаток телефону
   - На mobile має запропонувати зателефонувати

2. **Email:**
   - Клік має відкрити email клієнт
   - Має підставити адресу автоматично

3. **WhatsApp (якщо додали):**
   - Має відкрити WhatsApp
   - З номером вже введеним

---

## 💡 Поради

### Телефон:
- ✅ Використовуйте міжнародний формат (+39...)
- ✅ У `href` БЕЗ пробілів: `tel:+390123456789`
- ✅ У тексті З пробілами для читабельності

### Email:
- ✅ Перевірте, що адреса працює
- ✅ Додайте тему листа (опціонально):
  ```html
  <a href="mailto:info@cucinadisofia.it?subject=Prenotazione">
  ```

### Години роботи:
- ✅ Вкажіть чітко (формат 24h)
- ✅ Вкажіть вихідні дні
- ✅ Вкажіть особливі дати (свята)

---

## 🎉 Готово!

Ваші контакти оновлено!

Відвідувачі тепер легко можуть зв'язатися з вами! 📞✉️

---

*Інструкція створена: 2025-10-07*

