<script lang="ts">
  import "virtual:windi.css";
  import "./assets/base.css";
  // @ts-ignore
  import { RoundOffMethods } from "./lib/RoundOffMethods.d.ts";

  const methods: string[] = [];

  for (const method in RoundOffMethods) {
    if (isNaN(Number(method))) methods.push(method);
  }

  let decimal = 0;
  let exponent = 0;
  let roundOff = "";

  function handleSubmit() {
    console.log("Hello World");
  }
</script>

<main>
  <p class="text-2xl">
    Decimal-32 Floating Point to Binary and Hexadecimal Converter
  </p>

  <form on:submit|preventDefault={handleSubmit}>
    <label for="decimal">Decimal</label>
    <input id="decimal" type="number" bind:value={decimal} />
    <label for="exponent">Exponent</label>
    <input id="exponent" type="number" bind:value={exponent} />
    <input type="submit" value="" />

    {#each methods as method (method)}
      <input type="radio" bind:group={roundOff} id={method} value={method} />
      <label for={method}>{method}</label>
    {/each}
  </form>
</main>
