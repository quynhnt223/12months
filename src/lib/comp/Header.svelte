<script>
  import Svg from "$lib/Svgs.svelte";
  import Icon from "$lib/Icons.svelte";
</script>

<header class="header">
  <div class="container">
    <!-- Logo section -->
    <div class="logo-section">
      <Svg name="logo" width="186" />
    </div>

    <!-- Auth buttons section -->
    <div class="auth-section">
      <a href="/login" class="sound1 login-btn"
        ><Icon name="power" size="32" color="white" /><span>Login</span></a
      >
    </div>
  </div>
</header>

<style>
  .container {
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-section {
    display: flex;
    align-items: center;
  }

  .auth-section {
    display: flex;
    align-items: center;
  }

  .login-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--gray);
    border: none;
    color: #fff;
    padding: 6px;
    border-radius: 100px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 1px rgb(0 0 0 / 37%);
  }

  .login-btn:hover {
    background: var(--gray2);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .logo-section :global(svg) {
      width: 120px !important;
    }
  }
  :global(.login-btn span) {
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
