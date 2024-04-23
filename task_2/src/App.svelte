<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div class="container">
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
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    height: 100vh;
    margin: 0;
    padding: 20px;
  }
  .container {
    background-color: #fff;
  }
</style>
