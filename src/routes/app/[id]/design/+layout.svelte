<script>
  import Coder from "../Coder.svelte";
  import Sidebar4 from "../Sidebar4.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar4
  steps1={[
    "Color",
    "Shadow",
    "Text",
    "Button",
    "Title",
    "Pop up",
    "Toggle",
    "Slider",
    "Visual",
    "10",
    "11",
  ]}
  steps2={[
    "Card",
    "Motion",
    "Icon",
    "Font",
    "Header",
    "Layout",
    "Wrapper",
    "06",
    "06",
    "06",
    "More",
  ]}
></Sidebar4>
<div class="dwrap"></div>
