<script>
  import Bapp from "../Bapp.svelte";
</script>

<Bapp title="cool" icon="sleep">
  {#snippet children1()}
    <h1>First Section</h1>
    <p>Content for wrap1</p>
  {/snippet}

  {#snippet children2()}
    <h2>Second Section</h2>
    <p>Content for wrap2</p>
  {/snippet}

  {#snippet children3()}
    <h2>Second Section</h2>
    <p>Content for wrap2</p>
  {/snippet}
</Bapp>
