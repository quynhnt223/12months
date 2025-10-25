<script>
  let { checked = false, theme = "default" } = $props();
  const toggleId = `toggle-${Math.random().toString(36).slice(2, 8)}`;

  function handleChange(e) {
    checked = e.target.checked;
  }
</script>

<div class="toggle-switch {theme}">
  <input
    class="toggle-input"
    id={toggleId}
    type="checkbox"
    bind:checked
    onchange={handleChange}
  />
  <label class="toggle-label" for={toggleId}></label>
</div>

<style>
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 16px;
  }

  .toggle-input {
    display: none;
  }

  .toggle-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 16px;
    background-color: #d9e3de;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 34px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .toggle-label::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: #fff;
    transition: transform 0.3s;
  }

  .toggle-input:checked + .toggle-label {
    background-color: #54fb95;
  }

  .toggle-input:checked + .toggle-label::before {
    transform: translateX(12px);
  }

  /* Light theme */
  .toggle-switch.light .toggle-label {
    background-color: #bebebe;
  }

  .toggle-switch.light .toggle-input:checked + .toggle-label {
    background-color: #9b9b9b;
  }

  .toggle-switch.light .toggle-input:checked + .toggle-label::before {
    transform: translateX(6px);
  }

  /* Dark theme */
  .toggle-switch.dark .toggle-label {
    background-color: #4b4b4b;
  }

  .toggle-switch.dark .toggle-input:checked + .toggle-label {
    background-color: #717171;
  }

  .toggle-switch.dark .toggle-input:checked + .toggle-label::before {
    transform: translateX(16px);
  }
</style>
