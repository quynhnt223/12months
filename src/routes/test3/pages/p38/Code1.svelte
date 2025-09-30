<script>
  import { attachDynamicTooltips } from "../../codePop.js";
  const message = {
    t3: "👉 Do you want me to keep the styling inline in JavaScript (as above), or would you rather move it all to CSS for separation of concerns?",
    t1: "hello world. and i reall want to see that ok man",
    t2: "👉 Do you want me to keep the styling inline in JavaScript (as above), or would you rather move it all to CSS for separation of concerns?",
  };
  const code = `<div style="color: rgb(204, 204, 204);background-color: rgb(31, 31, 31);font-family: Consolas, &quot;Courier New&quot;, monospace;font-size: 14px;line-height: 19px;white-space: pre;"><div>{</div><div>&nbsp; &nbsp; <span style="color: #9cdcfe;">"name"</span>: <span style="color: #ce9178;">"12months"</span>,</div><div>&nbsp; &nbsp; <span style="color: #9cdcfe;">"version"</span>: <span style="color: #ce9178;">"0.0.1"</span>,</div><div>&nbsp; &nbsp; <span style="color: #9cdcfe;" id="t2">"lockfileVersion"</span>: <span style="color: #b5cea8;">3</span>,</div><div>&nbsp; &nbsp; <span style="color: #9cdcfe;">"requires"</span>: <span style="color: #569cd6;">true</span>,</div><div>&nbsp; &nbsp; <span style="color: #9cdcfe;">"packages"</span>: {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;">""</span>: {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;">"name"</span>: <span style="color: #ce9178;">"12months"</span>,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;">"version"</span>: <span style="color: #ce9178;">"0.0.1"</span>,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span id="t1">"dependencies"</span>: {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;">"dexie"</span>: <span style="color: #ce9178;">"^4.0.11"</span>,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;">"firebase"</span>: <span style="color: #ce9178;">"^11.10.0"</span>,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #9cdcfe;" id="t3">"svelte-dnd-action"</span>: <span style="color: #ce9178;">"^0.9.65"</span></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },</div></div>`;

  $effect(() => {
    attachDynamicTooltips(
      document.body,
      (id) => message[id] || `Tooltip for ${id}`
    );
  });
</script>

<div class="code" contenteditable="true">{@html code}</div>
<p>Đoạn code này dùng để làm gì?</p>
