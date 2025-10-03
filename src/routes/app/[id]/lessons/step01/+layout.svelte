<script>
  import { states } from "$lib/states.svelte.js";
  import Icon from "$lib/Icon.svelte";
  import Toggle1 from "../../Toggle1.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  let { children } = $props();
  states.toggle1 = false;
</script>

{@render children()}
<Wrapper2 icon="book" title="Sử dụng tham chiếu đối tượng trong Svelte">
  {#snippet body()}
    <Toggle1 t="Nó là Gì?">
      {#snippet content()}
        <h4>Định nghĩa</h4>
        <h5>Google AI: Đối tượng tham chiếu (Object References)</h5>
        <p>
          An object reference is a pointer or link to an object's location in
          memory, allowing a variable to access and manipulate the actual
          object. In programming, variables hold references rather than the
          entire objects, which are stored elsewhere. This means multiple
          variables can refer to the same object, and any changes made through
          one reference are visible through all others that point to the same
          object.
        </p>
        <br />
        <h5>mdn</h5>
        <p>
          An object reference is a link to an object. Object references can be
          used exactly like the linked objects.
        </p>
        <br />
        <p>
          The concept of object references becomes clear when assigning the same
          object to more than one property. Rather than holding a copy of the
          object, each assigned property holds object references that link to
          the same object so that when the object changes, all properties
          referring to the object reflect the change.
        </p>
      {/snippet}
    </Toggle1>
    <Toggle1 t="giải quyết vấn đề gì?">
      {#snippet content()}
        <h4>Định nghĩa</h4>
      {/snippet}
    </Toggle1>
    <Toggle1 t="mục đích sử dụng"></Toggle1>
    <Toggle1 t="sai lầm 1" c="red1"></Toggle1>
    <Toggle1 t="sai lầm 2" c="red1"></Toggle1>
  {/snippet}
</Wrapper2>
