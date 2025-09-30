<script>
  import { code } from "../c1.js";
  import Hl1 from "../comp/Hl1.svelte";
</script>

<section class="p20 max600">
  <h1>Building a Recursive Sidebar in svelte 5</h1>
  <h2 id="1">Intro</h2>
  <p>
    menu đệ quy = menu nhiều cấp lồng nhau dạng cây thư mục cha-con lặp đi lặp
    lại. Thường được xây dựng bằng <code>component đệ quy</code>, giúp dễ dàng
    hiển thị cấu trúc phân cấp phức tạp
  </p>
  <br />
  <p>
    <strong>Component đệ quy</strong> là component có thể
    <span class="hl1">gọi lại chính nó trong quá trình render</span> Điều này rất
    hữu ích khi hiển thị dữ liệu phân cấp (cây thư mục, menu nhiều cấp, bình luận
    lồng nhau…).
  </p>
  <br />
  <p>Ví dụ snippet trong Svelte 5 để hiển thị một sidebar đệ quy:</p>

  <div class="code">{@html code.c2}</div>
  <h2 id="2">Step 1: Define Data</h2>
  <p>
    Define data là bước<span class="hl1"> quan trọng như khung nhà</span> vậy
  </p>
  <div class="code">{@html code.c1}</div>

  <h2 id="3">Step 2: Render thử Data</h2>
  <p>
    Mục đích của việc render thử data là giúp ta hình dung data nó flow như thế
    nào. từ đó ta sẽ có những định hình để bắt đầu <code>"play với data"</code>.
    sẽ rất thú vị
  </p>
  <div class="code">{@html code.c1}</div>

  <h2 id="6">Deeply Reactivity</h2>
  <p id="t01">
    <Hl1>Ở svelte 5 runes is so powerful</Hl1> that will handle so much for you in
    reactivity.
  </p>
  <div class="code">{@html code.c3}</div>
</section>

<section class="nav">
  <a href="#1">Intro</a>
  <a href="#2">Step 1: Define Data Structure</a>
  <a href="#3">Step 2: Render thử Data</a>
  <a href="#6">Lesson: Deeply Reactivity</a>
</section>
