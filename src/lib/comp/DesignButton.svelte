<script>
  import { createEventDispatcher } from "svelte";

  export let text = "Design";
  export let variant = "primary"; // 'primary', 'secondary', 'outline'
  export let size = "medium"; // 'small', 'medium', 'large'
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleClick(event) {
    if (!disabled) {
      dispatch("click", event);
    }
  }
</script>

<button
  class="design-button"
  class:primary={variant === "primary"}
  class:secondary={variant === "secondary"}
  class:outline={variant === "outline"}
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  class:disabled
  on:click={handleClick}
  {disabled}
>
  {text}
</button>

<style>
  .design-button {
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Sizes */
  .small {
    padding: 8px 20px;
    font-size: 14px;
    min-height: 32px;
  }

  .medium {
    padding: 12px 32px;
    font-size: 16px;
    min-height: 44px;
  }

  .large {
    padding: 16px 40px;
    font-size: 18px;
    min-height: 52px;
  }

  /* Variants */
  .primary {
    background: #e91e63;
    color: white;
  }

  .primary:hover:not(.disabled) {
    background: #d81b60;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(233, 30, 99, 0.3);
  }

  .primary:active:not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(233, 30, 99, 0.4);
  }

  .secondary {
    background: #6366f1;
    color: white;
  }

  .secondary:hover:not(.disabled) {
    background: #5855eb;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
  }

  .secondary:active:not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
  }

  .outline {
    background: transparent;
    color: #e91e63;
    border: 2px solid #e91e63;
    box-shadow: none;
  }

  .outline:hover:not(.disabled) {
    background: #e91e63;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 30, 99, 0.2);
  }

  .outline:active:not(.disabled) {
    transform: translateY(0);
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .disabled:hover {
    transform: none !important;
  }
</style>
