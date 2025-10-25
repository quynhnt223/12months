<script>
  import Gri from "$lib/comp/layout/Gri.svelte";
  import Grid from "$lib/comp/layout/Grid.svelte";
  import Cr1 from "$lib/comp/others/Cr1.svelte";
  import Cr2 from "$lib/comp/others/Cr2.svelte";
  import Hd1 from "$lib/comp/others/Hd1.svelte";
  import Hd2 from "$lib/comp/others/Hd2.svelte";
  import Hd3 from "$lib/comp/others/Hd3.svelte";
  import Nu1 from "$lib/comp/others/Nu1.svelte";
  import Nu2 from "$lib/comp/others/Nu2.svelte";
  import Nu3 from "$lib/comp/others/Nu3.svelte";
  import Pr1 from "$lib/comp/others/Pr1.svelte";
</script>

<Grid gr={[30, 12]} t="MEAL PLAN">
  <Gri gr="1/1/5/11"
    ><Hd1 t="BREAKFAST" h="6:30"></Hd1><Nu1 n="1268"></Nu1><Cr1
      i="🐓"
      t="chicken + potatoes +fish"
    ></Cr1></Gri
  >
  <Gri gr="1/11/5/21"
    ><Hd1 t="LUNCH" h="11:30"></Hd1><Nu1 n="668"></Nu1><Cr1
      i="🐟"
      t="chicken + potatoes +fish"
    ></Cr1></Gri
  >
  <Gri gr="1/21/5/31"
    ><Hd1 t="DINNER" h="18:30"></Hd1><Nu1 n="568"></Nu1><Cr1
      i="🥩"
      t="grill beef & vegetables"
    ></Cr1></Gri
  >
  <Gri gr="5/1/9/7"
    ><Hd2 t="SNACK 1" h="6:30"></Hd2><Nu2 n="68"></Nu2><Cr2></Cr2></Gri
  >
  <Gri gr="5/7/9/13"
    ><Hd2 t="SNACK 2" h="6:30"></Hd2><Nu2 n="58"></Nu2><Cr2></Cr2></Gri
  >
  <Gri gr="5/13/9/19"
    ><Hd2 t="PRE-FIT" h="6:30"></Hd2><Nu2 n="20"></Nu2><Cr2></Cr2></Gri
  >
  <Gri gr="5/19/9/25"
    ><Hd2 t="AFTER-FIT" h="6:30"></Hd2><Nu2 n="102"></Nu2><Cr2></Cr2></Gri
  >
  <Gri gr="5/25/9/31"
    ><Hd2 t="SNACK 1" h="6:30"></Hd2><Nu2 n="108"></Nu2><Cr2></Cr2></Gri
  >
  <Gri gr="9/1/13/9"
    ><Hd3 t="CALORIES"></Hd3><Nu3 n="0668"></Nu3><Pr1></Pr1></Gri
  >
  <Gri gr="9/9/13/17"
    ><Hd3 t="PROTEINS"></Hd3><Nu3 n="668"></Nu3><Pr1 c="#5c5eff" p={46}
    ></Pr1></Gri
  >
  <Gri gr="9/17/13/24"><Hd3 t="CARBS"></Hd3><Nu3 n="68"></Nu3><Pr1></Pr1></Gri>
  <Gri gr="9/24/13/31"><Hd3 t="FAT"></Hd3><Nu3 n="668"></Nu3><Pr1></Pr1></Gri>
</Grid>
