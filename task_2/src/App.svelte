<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  const currencyElement_one = document.getElementById('currency-one');
  const currencyElement_two = document.getElementById('currency-two');
  const amountElement_one = document.getElementById('amount-one');
  const amountElement_two = document.getElementById('amount-two');


</script>

<main>
  <div class="container">
    <div class="title">
      <h1 class="title__h1">Конвертер валют</h1>
    </div>
    <div class="currency">
      <input type="number" id="amount-one" placeholder="0" value="1">
      <select name="" id="currency-one">
        <option value="USD" selected>USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
    <div class="swap-rate-container">
      <div class="rate" id="rate"></div>
      <button class="btn" id="swap">Обменять!</button>
    </div>
    <div class="currency">
      <input type="number" id="amount-two" placeholder="0">
      <select name="" id="currency-two">
        <option value="USD" >USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="RUB" selected>RUB</option>
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
