<script>
  let { cl, i = "timer", cs = "btn" } = $props();
</script>

<button onclick={cl} class={cs}
  ><span class="material-symbols-rounded">{i}</span></button
>

<style>
  button {
    width: 45px;
    height: 45px;
    background: var(--bg2);
    border-radius: 10px;
    color: var(--t1);
    display: grid;
    font-size: 1.75rem;
    cursor: pointer;
    place-content: center;
    box-shadow: inset 0px -1px 1px #171515;
  }
  button .material-symbols-rounded {
    font-size: 1.75rem;
  }
  button:hover {
    background: var(--hv1);
  }
</style>
