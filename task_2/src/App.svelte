<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { onMount } from 'svelte';

  let amountFrom = 1;
  let currencyFrom = 'USD';
  let currencyTo = 'EUR';
  let amountTo = 0;
  let currencies = ['RUB', 'EUR', 'USD', 'KZT', 'CNY', 'JPY', 'BRL'];

  // Выполняет запрос обменного курса и пересчитывает сумму в другой валюте
  async function convertCurrency() {
    // пытаемся получить данные об обменном курсе
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/db77e297e714e7f9a5902e42/latest/${currencyFrom}`);
      // парсим полученные данные в JSON
      const data = await response.json();
      // извлекаем обменный курс из JSON
      const exchangeRate = data.conversion_rates[currencyTo];
      // пересчитываем сумму в другой валюте
      amountTo = (amountFrom * exchangeRate).toFixed(2);
    } catch (error) {
      // в случае ошибки выводим сообщение в консоль
      console.error('Ошибка при получении данных:', error);
    }
  }

  // Вызывается при монтировании компонента и вызывает convertCurrency
  onMount(convertCurrency);

  // Обработчик изменения выбранной валюты (изменение типа: from или to)
  function handleCurrencyChange(event, type) {
    // меняем выбранную валюту в зависимости от типа (from или to)
    if (type === 'from') {
      currencyFrom = event.target.value;
    } else {
      currencyTo = event.target.value;
    }
    // пересчитываем сумму в другой валюте
    convertCurrency();
  }

  // Обработчик изменения числа в поле (изменение типа: from или to)
  function handleAmountChange(event, type) {
    // меняем значение в зависимости от типа (from или to)
    if (type === 'from') {
      amountFrom = event.target.value;
    } else {
      amountTo = event.target.value;
    }
    // пересчитываем сумму в другой валюте
    convertCurrency();
  }

</script>

<main class="app">
  <div class="app__container">
    <div class="app__header">
      <div class="app__logo-container">
        <img src="https://avatars.githubusercontent.com/u/128232731?s=400&u=f71cd561e85e796d249cd73fbd36be3bc4501d71&v=4" alt="Logo" class="app__logo">
      </div>
      <h1 class="app__title">Конвертер валют</h1>
    </div>
    <div class="app__form">
      <div class="form__row">
        <input type="number" bind:value={amountFrom} on:input={(e) => handleAmountChange(e, 'from')} class="form__input form__input--from"/>
        <select bind:value={currencyFrom} on:change={(e) => handleCurrencyChange(e, 'from')} class="form__select">
          {#each currencies as currency}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </div>
      <div class="form__row">
        <input type="number" bind:value={amountTo} on:input={(e) => handleAmountChange(e, 'to')} class="form__input form__input--to"/>
        <select bind:value={currencyTo} on:change={(e) => handleCurrencyChange(e, 'to')} class="form__select">
          {#each currencies as currency}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class="app__footer">
    <div class="footer__signature">
      <p class="footer__text">Создано с помощью</p>
      <p class="footer__author">Tiltusha</p>
    </div>
  </div>
</main>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to bottom right, #7f7fd5, #86a8d8, #8493c7, #5c6bc0, #8e24aa, #ab47bc);
    animation: fadeIn 1s ease-in-out forwards;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .app__container {
    margin: 0 auto;
    max-width: 400px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .app__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    animation: fadeIn 1.5s ease-in-out forwards;
  }
  .app__logo-container {
    animation: pulse 1.5s infinite;
    padding-right: 10px;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .app__logo {
    height: 50px;
    animation: fadeIn 1.5s ease-in-out forwards;
  }
  .app__title {
    font-size: 24px;
    font-weight: 600;
    animation: printText 2s ease-in forwards;
  }
  @keyframes printText {
    from {
      color: transparent;
    }
    to {
      color: #fff;
    }
  }
  .app__form {
    display: flex;
    flex-direction: column;
    animation: fadeIn 1.5s ease-in-out forwards;
  }
  .form__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
    animation: fadeIn 2s ease-in-out forwards;
  }
  .form__input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 24px;
    background-color: #fff;
    color: #333;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    animation: animateInput 1s ease-in-out forwards;
    outline: none;
  }
  @keyframes animateInput {
    0% {
      transform: scale(0.9);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .form__select {
    padding: 10px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    appearance: none;
    font-size: 20px;
    font-weight: 600;
    color: #484848;
    animation: fadeIn 2s ease-in-out forwards;
    outline: none;
    
  }
  .form__input--from {
    animation-delay: 0.2s;
  }
  .form__input--to {
    animation-delay: 0.4s;
  }
  .app__footer {
    display: flex;
    justify-content: center;
    animation: fadeIn 2s ease-in-out forwards;
  }
  .footer__signature {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .footer__text {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 10px;
    animation: fadeIn 2s ease-in-out forwards;
  }
  .footer__author {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    animation: fadeIn 2s ease-in-out forwards;
  }
</style>




