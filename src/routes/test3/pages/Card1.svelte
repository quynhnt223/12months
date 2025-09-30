<script>
  let items = $state([]);
</script>

{#snippet sidebar(items)}
  {#each items as item}
    <li>
      {item.label}
      {#if item.children}
        <!-- Gọi lại chính component này để render các cấp con 1.1 1.2.1   -->
        {@render sidebar()}
      {/if}
    </li>
  {/each}
{/snippet}

<!-- render component ở đây (phân cấp 1)-->
{@render sidebar()}
