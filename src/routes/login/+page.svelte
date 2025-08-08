<script>
  import Icon from "$lib/Icons.svelte";
  import Svg from "$lib/Svgs.svelte";
  import { goto } from "$app/navigation";
  import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { auth } from "$lib/config/firebase.js";

  let email = $state("");
  let password = $state("");
  let isLogin = $state(true);
  let loading = $state(false);
  let error = $state("");
  let showPassword = $state(false);

  function togglePassword() {
    showPassword = !showPassword;
  }

  async function handleEmailAuth() {
    if (!email || !password) {
      error = "Please fill in all fields";
      return;
    }

    loading = true;
    error = "";

    try {
      let credential;
      if (isLogin) {
        credential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      localStorage.setItem("userId", credential.user.uid);
      goto("/app");
    } catch (err) {
      console.error("Auth error:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="outer-container">
  <div class="logo-wrapper">
    <a class="back-btn" href="/" aria-label="Go back" data-sound="1">
      <Icon name="back" color="#000" />
    </a>
    <div class="logo"><Svg name="logo" width="155" /></div>
  </div>

  <div class="card-container {!isLogin ? 'signup-mode' : ''}">
    <div class="tabs-wrapper">
      <div class="tabs-pill">
        <button
          data-sound="1"
          class="tab-btn {isLogin ? 'active' : ''}"
          onclick={() => (isLogin = true)}
        >
          Login
        </button>
        <button
          data-sound="1"
          class="tab-btn {!isLogin ? 'active' : ''}"
          onclick={() => (isLogin = false)}
        >
          Sign up
        </button>
      </div>
    </div>

    <form
      class="form"
      onsubmit={(e) => {
        e.preventDefault();
        handleEmailAuth();
      }}
    >
      {#if error}
        <div class="error-box">{error}</div>
      {/if}

      <div class="field">
        <input
          type="email"
          value={email}
          oninput={(e) => (email = e.target.value)}
          placeholder="Email"
          class="field-input"
          required
        />
      </div>

      <div class="field password-field">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          oninput={(e) => (password = e.target.value)}
          placeholder="Password"
          class="field-input"
          required
        />
        <button
          type="button"
          data-sound="1"
          class="eye-btn"
          onclick={togglePassword}
          aria-label="Toggle password visibility"
        >
          {#if showPassword}
            <Icon name="eye" />
          {:else}
            <Icon name="eyeoff" color="#6396aaff" />
          {/if}
        </button>
      </div>

      <div class="submit-wrapper">
        <button
          data-sound="1"
          type="submit"
          class="submit-btn"
          disabled={loading}
        >
          {#if loading}
            <span class="spinner"></span>
          {/if}
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
        </button>
      </div>

      <a href="/forgot-password" class="forgot-link">Forgot password</a>
    </form>
  </div>
</div>

<style>
  :root {
    --bg-green: #29f76f;
    --btn-green: #237d4e;
    --btn-signup: #2e4e65ff;
    --white: #ffffff;
    --gray-bg: #e5e5e5;
    --font: sans-serif;
  }

  .outer-container {
    background: var(--bg-green);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    font-family: var(--font);
    position: relative;
  }

  .back-btn {
    position: relative;
    width: 45px;
    height: 45px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 14px;
    box-shadow: var(--shadow1);
    transition: all 0.2s ease;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    max-width: 360px;
    width: 100%;
  }

  .card-container {
    position: relative;
    background: var(--white);
    border-radius: 24px;
    padding: 2rem 1.5rem 2.5rem;
    width: 100%;
    max-width: 360px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .signup-mode .tab-btn.active,
  .signup-mode .submit-btn {
    background: var(--btn-signup);
    color: var(--white);
  }

  .tabs-wrapper {
    position: absolute;
    top: 16px;
    left: 16px;
  }
  .tabs-pill {
    display: inline-flex;
    background: #ebeceeff;
    border-radius: 999px;
    box-shadow: var(--shadow1);
    padding: 4px;
  }
  .tab-btn {
    background: transparent;
    border: none;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--btn-green);
    transition:
      background 0.2s,
      color 0.2s;
  }
  .tab-btn.active {
    background: var(--btn-green);
    color: var(--white);
  }

  .form {
    margin-top: 3rem;
  }
  .field {
    margin-bottom: 1rem;
  }
  .field-input {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border: none;
    border-radius: 999px;
    background: var(--gray-bg);
    font-size: 1rem;
    color: var(--btn-green);
    box-sizing: border-box;
  }
  .field-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(35, 125, 78, 0.3);
  }

  .password-field {
    position: relative;
  }
  .eye-btn {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .eye-icon {
    width: 20px;
    height: 20px;
    color: var(--btn-green);
  }

  .error-box {
    background: #ffe5e5;
    border: 1px solid #f5c2c2;
    color: #a33;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .submit-wrapper {
    margin-top: 1rem;
  }
  .submit-btn {
    display: inline-flex;
    align-items: center;
    height: 36px;
    padding: 0 20px;
    background: var(--btn-green);
    color: var(--white);
    border: none;
    border-radius: 999px;
    font-size: 1rem;
    cursor: pointer;
  }
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--white);
    border-top-color: transparent;
    border-radius: 50%;
    margin-right: 8px;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .forgot-link {
    float: right;
    display: inline;
    margin-top: 2rem;
    font-size: 0.85rem;
    color: var(--btn-green);
    text-decoration: underline;
  }
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 45px;
  }
  .back-btn:hover {
    background: #c2f5dd;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
</style>
