<script>
  import { db } from "$lib/config/firebase.js";
  import { collection, addDoc, getDocs } from "firebase/firestore";

  let items = [];

  async function addItem() {
    const ref = collection(db, "testCollection");
    await addDoc(ref, {
      name: "Test " + Math.floor(Math.random() * 100),
      createdAt: Date.now(),
    });
    await loadItems();
  }

  async function loadItems() {
    const snapshot = await getDocs(collection(db, "testCollection"));
    items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // Run on load
  loadItems();
</script>

<h2>Firestore Test</h2>
<button on:click={addItem}>Add Random Item</button>

<ul>
  {#each items as item}
    <li>{item.name} — {new Date(item.createdAt).toLocaleString()}</li>
  {/each}
</ul>
