<script>
  import { data } from "./data/comp28.js";
  import List from "./comp/List.svelte";
  import Chant from "./comp/Chant.svelte";

  // Normalize data to array format
  const steps = Array.isArray(data)
    ? data
    : Object.entries(data).map(([key, val]) => ({ key, ...val }));

  let activeIndex = $state(0);

  // Get label for a step
  function getStepLabel(step, index) {
    return step.step || step.type || step.key || `Step ${index + 1}`;
  }
  // Get label for a step
  function getStepName(step, index) {
    return step.name || step.type || step.key || `Step ${index + 1}`;
  }

  // Get current active step
  function getCurrentStep() {
    return steps[activeIndex] || {};
  }

  function setActiveStep(index) {
    activeIndex = index;
  }
</script>

<div class="wrapper">
  <div class="header">
    <h3>{getStepName(getCurrentStep(), activeIndex)}</h3>
  </div>
  <div class="content-area" aria-live="polite">
    {#key activeIndex}
      {@const currentStep = getCurrentStep()}

      <div class="content">
        {#if currentStep.type === "list"}
          <List />
        {:else if currentStep.type === "chant"}
          <Chant></Chant>
        {:else}
          <div class="generic-content">
            {currentStep.content || JSON.stringify(currentStep)}
          </div>
        {/if}
      </div>
    {/key}
  </div>

  <!-- Step Navigation -->
  <nav class="step-navigation" role="tablist" aria-label="Steps">
    {#each steps as step, index}
      <button
        class="step-button pop1"
        class:active={index === activeIndex}
        onclick={() => setActiveStep(index)}
        role="tab"
        aria-selected={index === activeIndex}
        aria-controls="step-content"
      >
        {getStepLabel(step, index)}
      </button>
    {/each}
  </nav>
</div>

<style>
  .wrapper {
    margin: 0 auto;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    background: #37383d;
    box-shadow: inset 0px 2px 1px #5b5f6b;
  }
  .header {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 8px;
    background: rgba(55, 56, 61, 0.7);
    backdrop-filter: blur(6px);
    border-radius: 6px;
  }

  .content-area {
    flex: 1;
    margin-bottom: 10px;
    color: #fff;
    overflow: auto;
    height: calc(100% - 55px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: auto;
    margin-top: -36px;
    padding-top: 42px;
  }

  .content {
    width: 100%;
    height: 100%;
  }

  .header h3 {
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    color: #c1b8b8;
    padding: 8px;
    padding-left: 12px;
    padding-right: 12px;
    background: #2f2e35;
    background: #54555c;
    box-shadow:
      0px 1px 1px #2d333a,
      inset 0px -1px 1px #292b2e,
      inset 0px 1px 0px #83818e;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .generic-content {
    color: #ddd;
    white-space: pre-wrap;
    line-height: 1.6;
  }

  /* Step Navigation Styles */
  .step-navigation {
    height: 68px;
    display: flex;
    gap: 5px;
  }

  .step-button {
    flex: 1;
    height: 100%;
    border-radius: 5px;
    font-size: 36px;
    font-weight: 800;
    color: var(--gr1);
    background: #37383d;
    border: 1px solid rgba(255, 255, 255, 0.03);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.12s ease,
      background 0.12s ease,
      color 0.12s ease;
  }

  .step-button:hover {
    transform: translateY(-2px);
  }

  .step-button.active {
    background: var(--gr1);
    color: #000000;
  }
</style>
