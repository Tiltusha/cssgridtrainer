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

<main>
  <div class="container">
    <div class="title">
      <h1 class="title__h1">Конвертер валют</h1>
    </div>
    <div class="currency">
      <input type="number" bind:value={amountFrom} on:input={(e) => handleAmountChange(e, 'from')} />
      <select bind:value={currencyFrom} on:change={(e) => handleCurrencyChange(e, 'from')}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
    <div class="currency">
      <input type="number" bind:value={amountTo} on:input={(e) => handleAmountChange(e, 'to')} />
      <select bind:value={currencyTo} on:change={(e) => handleCurrencyChange(e, 'to')}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
  </div>
</main>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 20px;
    background-color: pink;
  }
  .title__h1 {
    padding-bottom: 1.5rem;
  }
  .container {
    background-color: #fff;
    padding: 8px 40px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
  .btn {
    color: #fff;
    background-color: pink;
    cursor: pointer;
    border-radius: 5px;
    font-size: 15px;
    padding: 5px 15px;
  }
  .currency {
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .currency select {
    padding: 10px 20px 10px 10px;
    appearance: none;
    border: 1px solid #dedede;
    font-size: 16px;
    background: transparent;
  }
  .currency input {
    border: 0;
    background: transparent;
    font-size: 30px;
    text-align: left;
  }
  .swap-rate-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rate {
    color: #9e9e9e;
    font-size: 14px;
    padding: 0 10px;
  }
  select:focus, input:focus, button:focus {
    outline: 0;
  }
</style>
