<script lang="ts">
  import "virtual:windi.css";
  import "./assets/base.css";
  import { RoundOffMethods } from "./lib/RoundOffMethods";
  import { convert } from "./lib/converter";
  import OutputDiv from "./lib/OutputDiv.svelte";

  const methods: string[] = [];
  for (const method in RoundOffMethods) {
    methods.push(method);
  }

  let decimal = "0";
  let exponent = "0";
  let roundOff = RoundOffMethods.Truncate;
  let errors = {
    decimal: false,
    exponent: false,
  };

  let results = {
    bin: "",
    hex: "",
  };

  function handleSubmit() {
    if (!decimal) {
      errors.decimal = true;
    }

    if (!exponent) {
      errors.exponent = true;
    }

    if (!errors.decimal && !errors.exponent) {
      results = convert(decimal, parseInt(exponent), roundOff);
    }
  }

  function handleReset() {
    decimal = "0";
    exponent = "0";
    roundOff = RoundOffMethods.Truncate;
    results = {
      bin: "",
      hex: "",
    };
  }

  function copyValues() {
    navigator.clipboard.writeText(`BIN\n${results.bin}\nHEX\n${results.hex}\n`);
  }
</script>

<main>
  <p class="text-4xl text-center font-bold my-16">
    Decimal-32 Floating Point to Binary and Hexadecimal Converter
  </p>

  <form
    on:submit|preventDefault={handleSubmit}
    class="mx-auto w-full max-w-xl p-6 rounded-lg shadow-lg"
  >
    <div class="flex flex-wrap mb-4">
      <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
        <label class="label" for="decimal">Decimal</label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
          class:error={errors.decimal}
          id="decimal"
          bind:value={decimal}
          on:change={() => (errors.decimal = false)}
        />
        <p class="error" class:invisible={!errors.decimal}>
          Please fill out this field.
        </p>
      </div>
      <div class="w-full md:w-1/2 px-2">
        <label class="label" for="exponent">Exponent</label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          class:error={errors.exponent}
          id="exponent"
          bind:value={exponent}
          on:change={() => (errors.exponent = false)}
        />
        <p class="error" class:invisible={!errors.exponent}>
          Please fill out this field.
        </p>
      </div>
    </div>
    <p class="label px-2">Round Off Method</p>
    <div class="flex flex-wrap mb-8 w-full justify-between md:px-2">
      {#each methods as method (method)}
        <input
          type="radio"
          id={method}
          bind:group={roundOff}
          value={method}
          class="hidden"
        />
        <label
          for={method}
          class="btn bg-gray-300 text-gray-600 active:bg-blue-700 active:text-white"
          class:selected={roundOff.toString() == method}
        >
          {method}
        </label>
      {/each}
    </div>
    <div class="flex flex-wrap justify-between mb-2 px-2">
      <button
        class="btn active:bg-gray-700 hover:bg-gray-600 bg-gray-500 
      text-white disabled:(opacity-50 cursor-not-allowed hover:bg-gray-500)"
        on:click|preventDefault={copyValues}
        disabled={!results.hex}>Copy Result to Clipboard</button
      >
      <div>
        <input
          class="btn reset mr-2"
          type="reset"
          on:click|preventDefault={handleReset}
        />
        <input class="btn submit" type="submit" value="Convert" />
      </div>
    </div>
  </form>

  <div class="my-10">
    <OutputDiv title={"Hex"} value={results.hex} />
    <OutputDiv title={"Bin"} value={results.bin} />
  </div>
</main>
