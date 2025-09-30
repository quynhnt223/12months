class C01 {
  data = $state([]);

  add(item) {
    const newItem = {
      id: item?.id ?? Date.now(), // auto-generate if not passed
      who: item?.who ?? "who?",
      score: item?.score ?? "no",
    };

    this.data.push(newItem);
  }
}

export const c01 = new C01();
