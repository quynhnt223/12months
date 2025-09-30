class Code {
  c1 = `  async load() {
        const saved = await dbd.files.get("sidenav-data");
        if (saved?.data) {
          this.data = saved.data;
          console.log("data loaded");
        }
      }`;
}
export const code = new Code();
