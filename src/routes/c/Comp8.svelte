<script>
  let display = $state("0");
  let previousValue = $state(null);
  let operation = $state(null);
  let waitingForOperand = $state(false);

  function inputDigit(digit) {
    if (waitingForOperand) {
      display = String(digit);
      waitingForOperand = false;
    } else {
      display = display === "0" ? String(digit) : display + digit;
    }
  }

  function inputDecimal() {
    if (waitingForOperand) {
      display = "0.";
      waitingForOperand = false;
    } else if (display.indexOf(".") === -1) {
      display = display + ".";
    }
  }

  function clear() {
    display = "0";
    previousValue = null;
    operation = null;
    waitingForOperand = false;
  }

  function performOperation(nextOperation) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      previousValue = inputValue;
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      display = String(newValue);
      previousValue = newValue;
    }

    waitingForOperand = true;
    operation = nextOperation;
  }

  function calculate(left, right, op) {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "×":
        return left * right;
      case "÷":
        return right !== 0 ? left / right : 0;
      default:
        return right;
    }
  }

  function handleEquals() {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      display = String(newValue);
      previousValue = null;
      operation = null;
      waitingForOperand = true;
    }
  }

  const buttons = [
    { label: "C", action: clear, class: "btn-clear" },
    { label: "÷", action: () => performOperation("÷"), class: "btn-operator" },
    { label: "×", action: () => performOperation("×"), class: "btn-operator" },
    { label: "-", action: () => performOperation("-"), class: "btn-operator" },
    { label: "7", action: () => inputDigit(7), class: "btn-number" },
    { label: "8", action: () => inputDigit(8), class: "btn-number" },
    { label: "9", action: () => inputDigit(9), class: "btn-number" },
    { label: "+", action: () => performOperation("+"), class: "btn-operator" },
    { label: "4", action: () => inputDigit(4), class: "btn-number" },
    { label: "5", action: () => inputDigit(5), class: "btn-number" },
    { label: "6", action: () => inputDigit(6), class: "btn-number" },
    { label: "1", action: () => inputDigit(1), class: "btn-number" },
    { label: "2", action: () => inputDigit(2), class: "btn-number" },
    { label: "3", action: () => inputDigit(3), class: "btn-number" },
    { label: "0", action: () => inputDigit(0), class: "btn-number btn-zero" },
    { label: ".", action: inputDecimal, class: "btn-number" },
    { label: "=", action: handleEquals, class: "btn-equals" },
  ];
</script>

<div class="container">
  <div class="calculator">
    <div class="display">
      <div class="previous-operation">
        {#if operation && previousValue !== null}
          {previousValue} {operation}
        {/if}
      </div>
      <div class="current-value">{display}</div>
    </div>

    <div class="buttons">
      {#each buttons as btn}
        <button class="btn {btn.class}" onclick={btn.action}>
          {btn.label}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }

  .calculator {
    background: #2d2d44;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    padding: 24px;
    width: 320px;
  }

  .display {
    background: #1a1a2e;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    text-align: right;
  }

  .previous-operation {
    color: #888;
    font-size: 14px;
    min-height: 20px;
    margin-bottom: 8px;
  }

  .current-value {
    color: white;
    font-size: 48px;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .btn {
    border: none;
    border-radius: 12px;
    font-size: 24px;
    font-weight: 500;
    height: 64px;
    cursor: pointer;
    transition: all 0.15s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .btn:active {
    transform: scale(0.95);
  }

  .btn-number {
    background: #4a4a5e;
    color: white;
  }

  .btn-number:hover {
    background: #5a5a6e;
  }

  .btn-operator {
    background: #ff9500;
    color: white;
  }

  .btn-operator:hover {
    background: #ffaa33;
  }

  .btn-clear {
    background: #ef4444;
    color: white;
  }

  .btn-clear:hover {
    background: #f87171;
  }

  .btn-equals {
    background: #3b82f6;
    color: white;
  }

  .btn-equals:hover {
    background: #60a5fa;
  }

  .btn-zero {
    grid-column: span 2;
  }
</style>
