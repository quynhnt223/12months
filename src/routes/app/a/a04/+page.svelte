<script>
  import Flex from "$lib/comp/layout/Flex.svelte";
  import Card1 from "$lib/comp/others2/Card1.svelte";
</script>

<Flex t="MEAL PLAN">
  <Card1 label="Bf" i="sunny" t="Chicken and eggs" time="6:30" />
  <Card1 label="Sn" i="cookie" t="coffee + cake" time="10:30" color="#a1a7ee" />
  <Card1 label="Lu" i="backlight_high" t="Slow cooking Beef + breads" />
  <Card1 label="Sn" i="cookie" t="coffee break" time="12:30" color="#a1a7ee" />
  <Card1 label="Di" i="ramen_dining" t="coffee break" />
  <Card1 label="Pr" i="exercise" t="coffee break" time="3:30" color="#cff117" />
  <Card1 label="Pr" i="cookie" t="coffee break" color="#cff117" />
  <Card1
    label="Or"
    i="hanami_dango"
    t="some cheat meals"
    time="5:30"
    color="#86868d"
  />
</Flex>
