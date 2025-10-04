<script>
  import Coder from "../Coder.svelte";
  import Sidebar5 from "../Sidebar5.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar5
  items={[
    { id: "step01", name: "intro", type: "green" },
    { id: "x7m2Qa", name: "Set up", type: "green" },
    { id: "x9t4Ln", name: "Data", type: "green" },
    { id: "x0p8Dw", name: "login", type: "green" },
    { id: "x3k1Zy", name: "css", type: "green" },
    { id: "x5n7Ec", name: "demo", type: "green" },
    { id: "x2s9Rf", name: "upgrade", type: "green" },
    { id: "x4h0Wp", name: "dash", type: "green" },
    { id: "x8d3Xq", name: "logout", type: "green" },
    { id: "x1c6Vb", name: "helpers", type: "green" },
    { id: "x9z2Nj", name: "icon", type: "green" },
    { id: "x5u4Ta", name: "home", type: "green" },
    { id: "x0a7Hp", name: "error", type: "green" },
    { id: "x6e9Lf", name: "step13", type: "green" },
    { id: "x3v1Gx", name: "step14", type: "green" },
    { id: "x8r5Md", name: "step15", type: "green" },
    { id: "x2j0Qw", name: "step16", type: "green" },
    { id: "x7f9By", name: "step17", type: "green" },
    { id: "x1t8Ks", name: "step18", type: "green" },
    { id: "x4x3Pc", name: "step19", type: "green" },
    { id: "x0n6Um", name: "step20", type: "green" },
    { id: "x5y2Rj", name: "step21", type: "green" },
  ]}
></Sidebar5>
<div class="dwrap"></div>
