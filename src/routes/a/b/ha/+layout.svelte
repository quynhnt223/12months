<script>
  import Layout1 from "$lib/design/comp/layouts/Layout1.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout1 img="/b/habit" icon="habit" title="Good Habits" top="330"></Layout1>
