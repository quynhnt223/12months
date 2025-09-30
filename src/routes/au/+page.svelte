<script>
  import Icon from "$lib/Icon.svelte";
  import { goto } from "$app/navigation";
  import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { auth } from "$lib/data/firebase.js";

  let email = $state("");
  let password = $state("");
  let authMode = $state("login"); // "login", "signup", "reset"
  let loading = $state(false);
  let error = $state("");
  let success = $state("");
  let showPassword = $state(false);

  function togglePassword() {
    showPassword = !showPassword;
  }

  function setAuthMode(mode) {
    authMode = mode;
    error = "";
    success = "";
    password = "";
  }

  async function handleEmailAuth() {
    if (!email) {
      error = "Please enter your email";
      return;
    }

    if (authMode !== "reset" && !password) {
      error = "Please enter your password";
      return;
    }

    loading = true;
    error = "";
    success = "";

    try {
      let credential;

      if (authMode === "login") {
        credential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("12monthsuser", true);
        goto("/a");
      } else if (authMode === "signup") {
        credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("12monthsuser", true);
        goto("/a");
      } else if (authMode === "reset") {
        await sendPasswordResetEmail(auth, email);
        success = "Password reset email sent! Check your inbox.";
      }
    } catch (err) {
      console.error("Auth error:", err);

      // More user-friendly error messages
      if (err.code === "auth/user-not-found") {
        error = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        error = "Incorrect password";
      } else if (err.code === "auth/email-already-in-use") {
        error = "An account with this email already exists";
      } else if (err.code === "auth/weak-password") {
        error = "Password should be at least 6 characters";
      } else if (err.code === "auth/invalid-email") {
        error = "Invalid email address";
      } else if (err.code === "auth/too-many-requests") {
        error = "Too many attempts. Please try again later";
      } else {
        error = err.message;
      }
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
    <div class="logo">
      <svg
        width="154"
        height="29"
        viewBox="0 0 154 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.368 25V5.232H39.736V25H35.368ZM31.56 8.956V5.232H39.456V8.956H31.56ZM89.896 25.308C88.496 25.308 87.2267 25 86.088 24.384C84.968 23.7493 84.0814 22.8907 83.428 21.808C82.7747 20.7253 82.448 19.512 82.448 18.168C82.448 16.824 82.7747 15.62 83.428 14.556C84.0814 13.492 84.968 12.652 86.088 12.036C87.208 11.4013 88.4774 11.084 89.896 11.084C91.3147 11.084 92.584 11.392 93.704 12.008C94.824 12.624 95.7107 13.4733 96.364 14.556C97.0174 15.62 97.344 16.824 97.344 18.168C97.344 19.512 97.0174 20.7253 96.364 21.808C95.7107 22.8907 94.824 23.7493 93.704 24.384C92.584 25 91.3147 25.308 89.896 25.308ZM89.896 21.416C90.512 21.416 91.0534 21.2853 91.52 21.024C91.9867 20.744 92.3414 20.3613 92.584 19.876C92.8454 19.372 92.976 18.8027 92.976 18.168C92.976 17.5333 92.8454 16.9827 92.584 16.516C92.3227 16.0307 91.9587 15.6573 91.492 15.396C91.044 15.116 90.512 14.976 89.896 14.976C89.2987 14.976 88.7667 15.116 88.3 15.396C87.8334 15.6573 87.4694 16.0307 87.208 16.516C86.9467 17.0013 86.816 17.5613 86.816 18.196C86.816 18.812 86.9467 19.372 87.208 19.876C87.4694 20.3613 87.8334 20.744 88.3 21.024C88.7667 21.2853 89.2987 21.416 89.896 21.416ZM135.508 25V17.244C135.508 16.5347 135.284 15.9653 134.836 15.536C134.406 15.088 133.856 14.864 133.184 14.864C132.717 14.864 132.306 14.9667 131.952 15.172C131.597 15.3587 131.317 15.6387 131.112 16.012C130.906 16.3667 130.804 16.7773 130.804 17.244L129.152 16.432C129.152 15.368 129.376 14.4347 129.824 13.632C130.272 12.8293 130.897 12.2133 131.7 11.784C132.502 11.336 133.426 11.112 134.472 11.112C135.536 11.112 136.469 11.336 137.272 11.784C138.074 12.2133 138.69 12.82 139.12 13.604C139.568 14.3693 139.792 15.2653 139.792 16.292V25H135.508ZM126.52 25V4.672H130.804V25H126.52Z"
          fill="#0D8248"
        />
        <path
          d="M42.254 22.536L49.842 14.696C50.3087 14.2293 50.682 13.8 50.962 13.408C51.242 13.016 51.4474 12.652 51.578 12.316C51.7087 11.9613 51.774 11.6067 51.774 11.252C51.774 10.4867 51.522 9.88933 51.018 9.46C50.5327 9.012 49.8887 8.788 49.086 8.788C48.302 8.788 47.5927 9.00267 46.958 9.432C46.342 9.84267 45.7447 10.524 45.166 11.476L42.226 8.928C43.01 7.60267 44.0087 6.604 45.222 5.932C46.4354 5.26 47.826 4.924 49.394 4.924C50.7567 4.924 51.9327 5.176 52.922 5.68C53.93 6.184 54.7047 6.90267 55.246 7.836C55.806 8.76933 56.086 9.86133 56.086 11.112C56.086 11.896 55.9834 12.624 55.778 13.296C55.5727 13.9493 55.2367 14.6027 54.77 15.256C54.322 15.8907 53.7154 16.5907 52.95 17.356L47.686 22.592L42.254 22.536ZM42.254 25V22.536L45.978 21.248H56.478V25H42.254ZM117.268 25V5.764H121.552V25H117.268ZM114.188 15.032V11.392H124.632V15.032H114.188Z"
          fill="#0D8248"
        />
        <path
          d="M58.8987 25V11.392H63.1827V25H58.8987ZM67.6067 25V17.048C67.6067 16.3573 67.3921 15.8253 66.9627 15.452C66.5521 15.06 66.0387 14.864 65.4227 14.864C64.9934 14.864 64.6107 14.9573 64.2747 15.144C63.9387 15.312 63.6681 15.5547 63.4627 15.872C63.2761 16.1893 63.1827 16.5813 63.1827 17.048L61.5307 16.32C61.5307 15.2373 61.7641 14.3133 62.2307 13.548C62.6974 12.764 63.3321 12.1667 64.1347 11.756C64.9374 11.3267 65.8427 11.112 66.8507 11.112C67.8027 11.112 68.6521 11.3267 69.3987 11.756C70.1641 12.1853 70.7707 12.7827 71.2187 13.548C71.6667 14.3133 71.8907 15.228 71.8907 16.292V25H67.6067ZM76.3147 25V17.048C76.3147 16.3573 76.1001 15.8253 75.6707 15.452C75.2601 15.06 74.7467 14.864 74.1307 14.864C73.7014 14.864 73.3187 14.9573 72.9827 15.144C72.6467 15.312 72.3761 15.5547 72.1707 15.872C71.9841 16.1893 71.8907 16.5813 71.8907 17.048L69.4267 16.712C69.4641 15.5547 69.7347 14.5653 70.2387 13.744C70.7614 12.904 71.4427 12.26 72.2827 11.812C73.1414 11.3453 74.1027 11.112 75.1667 11.112C76.2121 11.112 77.1361 11.336 77.9387 11.784C78.7601 12.2133 79.4041 12.8387 79.8707 13.66C80.3561 14.4627 80.5987 15.4333 80.5987 16.572V25H76.3147Z"
          fill="#0D8248"
        />
        <path
          d="M108.465 25V17.244C108.465 16.5347 108.241 15.9653 107.793 15.536C107.364 15.088 106.813 14.864 106.141 14.864C105.674 14.864 105.264 14.9667 104.909 15.172C104.554 15.3587 104.274 15.6387 104.069 16.012C103.864 16.3667 103.761 16.7773 103.761 17.244L102.109 16.432C102.109 15.368 102.342 14.4347 102.809 13.632C103.276 12.8293 103.92 12.2133 104.741 11.784C105.581 11.336 106.524 11.112 107.569 11.112C108.577 11.112 109.464 11.3547 110.229 11.84C111.013 12.3067 111.629 12.932 112.077 13.716C112.525 14.5 112.749 15.3587 112.749 16.292V25H108.465ZM99.4768 25V11.392H103.761V25H99.4768ZM147.499 25.336C146.697 25.336 145.903 25.2333 145.119 25.028C144.354 24.8227 143.635 24.5333 142.963 24.16C142.31 23.768 141.75 23.32 141.283 22.816L143.719 20.352C144.167 20.8373 144.699 21.22 145.315 21.5C145.931 21.7613 146.603 21.892 147.331 21.892C147.835 21.892 148.218 21.8173 148.479 21.668C148.759 21.5187 148.899 21.3133 148.899 21.052C148.899 20.716 148.731 20.464 148.395 20.296C148.078 20.1093 147.667 19.9507 147.163 19.82C146.659 19.6707 146.127 19.512 145.567 19.344C145.007 19.176 144.475 18.9427 143.971 18.644C143.467 18.3453 143.057 17.9347 142.739 17.412C142.422 16.8707 142.263 16.1893 142.263 15.368C142.263 14.4907 142.487 13.7347 142.935 13.1C143.383 12.4467 144.018 11.9333 144.839 11.56C145.661 11.1867 146.622 11 147.723 11C148.881 11 149.945 11.2053 150.915 11.616C151.905 12.008 152.707 12.596 153.323 13.38L150.887 15.844C150.458 15.34 149.973 14.9853 149.431 14.78C148.909 14.5747 148.395 14.472 147.891 14.472C147.406 14.472 147.042 14.5467 146.799 14.696C146.557 14.8267 146.435 15.0227 146.435 15.284C146.435 15.564 146.594 15.788 146.911 15.956C147.229 16.124 147.639 16.2733 148.143 16.404C148.647 16.5347 149.179 16.6933 149.739 16.88C150.299 17.0667 150.831 17.3187 151.335 17.636C151.839 17.9533 152.25 18.3827 152.567 18.924C152.885 19.4467 153.043 20.1373 153.043 20.996C153.043 22.3213 152.539 23.376 151.531 24.16C150.542 24.944 149.198 25.336 147.499 25.336Z"
          fill="#0D8248"
        />
        <path
          d="M5.81081 4.65094C5.81081 5.85972 6.77884 6.83962 7.97297 6.83962C9.16711 6.83962 10.1351 5.85972 10.1351 4.65094V3.6934H15V4.65094C15 5.85972 15.968 6.83962 17.1622 6.83962C18.3564 6.83962 19.3243 5.85972 19.3243 4.65094V3.6934H20.1351C22.8219 3.6934 25 5.89819 25 8.61792V24.0755C25 26.7952 22.8219 29 20.1351 29H4.86486C2.17808 29 0 26.7952 0 24.0755V8.61792C3.65684e-07 5.89819 2.17808 3.6934 4.86486 3.6934H5.81081V4.65094Z"
          fill="#0D8248"
        />
        <path
          d="M1.75676 10.9434C1.75676 10.4901 2.11977 10.1226 2.56757 10.1226H22.5676C23.0154 10.1226 23.3784 10.4901 23.3784 10.9434V22.1604C23.3784 24.8801 21.2003 27.0849 18.5135 27.0849H6.62162C3.93484 27.0849 1.75676 24.8801 1.75676 22.1604V10.9434Z"
          fill="white"
        />
        <path
          d="M6.89189 13.8844C6.89189 13.1667 6.31712 12.5849 5.60811 12.5849C4.89909 12.5849 4.32432 13.1667 4.32432 13.8844C4.32432 14.6021 4.89909 15.184 5.60811 15.184C6.31712 15.184 6.89189 14.6021 6.89189 13.8844Z"
          fill="#0D8248"
        />
        <path
          d="M11.4865 13.8844C11.4865 13.1667 10.9117 12.5849 10.2027 12.5849C9.49369 12.5849 8.91892 13.1667 8.91892 13.8844C8.91892 14.6021 9.49369 15.184 10.2027 15.184C10.9117 15.184 11.4865 14.6021 11.4865 13.8844Z"
          fill="#0D8248"
        />
        <path
          d="M16.0811 13.8844C16.0811 13.1667 15.5063 12.5849 14.7973 12.5849C14.0883 12.5849 13.5135 13.1667 13.5135 13.8844C13.5135 14.6021 14.0883 15.184 14.7973 15.184C15.5063 15.184 16.0811 14.6021 16.0811 13.8844Z"
          fill="#0D8248"
        />
        <path
          d="M20.6757 13.8844C20.6757 13.1667 20.1009 12.5849 19.3919 12.5849C18.6829 12.5849 18.1081 13.1667 18.1081 13.8844C18.1081 14.6021 18.6829 15.184 19.3919 15.184C20.1009 15.184 20.6757 14.6021 20.6757 13.8844Z"
          fill="#0D8248"
        />
        <path
          d="M6.89189 18.5354C6.89189 17.8177 6.31712 17.2358 5.60811 17.2358C4.89909 17.2358 4.32432 17.8177 4.32432 18.5354C4.32432 19.2531 4.89909 19.8349 5.60811 19.8349C6.31712 19.8349 6.89189 19.2531 6.89189 18.5354Z"
          fill="#0D8248"
        />
        <path
          d="M11.4865 18.5354C11.4865 17.8177 10.9117 17.2358 10.2027 17.2358C9.49369 17.2358 8.91892 17.8177 8.91892 18.5354C8.91892 19.2531 9.49369 19.8349 10.2027 19.8349C10.9117 19.8349 11.4865 19.2531 11.4865 18.5354Z"
          fill="#0D8248"
        />
        <path
          d="M16.0811 18.5354C16.0811 17.8177 15.5063 17.2358 14.7973 17.2358C14.0883 17.2358 13.5135 17.8177 13.5135 18.5354C13.5135 19.2531 14.0883 19.8349 14.7973 19.8349C15.5063 19.8349 16.0811 19.2531 16.0811 18.5354Z"
          fill="#0D8248"
        />
        <path
          d="M20.6757 18.5354C20.6757 17.8177 20.1009 17.2358 19.3919 17.2358C18.6829 17.2358 18.1081 17.8177 18.1081 18.5354C18.1081 19.2531 18.6829 19.8349 19.3919 19.8349C20.1009 19.8349 20.6757 19.2531 20.6757 18.5354Z"
          fill="#0D8248"
        />
        <path
          d="M6.89189 23.1863C6.89189 22.4686 6.31712 21.8868 5.60811 21.8868C4.89909 21.8868 4.32432 22.4686 4.32432 23.1863C4.32432 23.904 4.89909 24.4858 5.60811 24.4858C6.31712 24.4858 6.89189 23.904 6.89189 23.1863Z"
          fill="#0D8248"
        />
        <path
          d="M11.4865 23.1863C11.4865 22.4686 10.9117 21.8868 10.2027 21.8868C9.49369 21.8868 8.91892 22.4686 8.91892 23.1863C8.91892 23.904 9.49369 24.4858 10.2027 24.4858C10.9117 24.4858 11.4865 23.904 11.4865 23.1863Z"
          fill="#0D8248"
        />
        <path
          d="M16.0811 23.1863C16.0811 22.4686 15.5063 21.8868 14.7973 21.8868C14.0883 21.8868 13.5135 22.4686 13.5135 23.1863C13.5135 23.904 14.0883 24.4858 14.7973 24.4858C15.5063 24.4858 16.0811 23.904 16.0811 23.1863Z"
          fill="#0D8248"
        />
        <path
          d="M20.6757 23.1863C20.6757 22.4686 20.1009 21.8868 19.3919 21.8868C18.6829 21.8868 18.1081 22.4686 18.1081 23.1863C18.1081 23.904 18.6829 24.4858 19.3919 24.4858C20.1009 24.4858 20.6757 23.904 20.6757 23.1863Z"
          fill="#0D8248"
        />
        <path
          d="M9.59459 1.57311C9.59459 0.704307 8.89882 0 8.04054 0C7.18226 0 6.48649 0.704307 6.48649 1.57311V4.71934C6.48649 5.58815 7.18226 6.29245 8.04054 6.29245C8.89882 6.29245 9.59459 5.58815 9.59459 4.71934V1.57311Z"
          fill="#0D8248"
        />
        <path
          d="M18.6486 1.57311C18.6486 0.704307 17.9529 0 17.0946 0C16.2363 0 15.5405 0.704307 15.5405 1.57311V4.71934C15.5405 5.58815 16.2363 6.29245 17.0946 6.29245C17.9529 6.29245 18.6486 5.58815 18.6486 4.71934V1.57311Z"
          fill="#0D8248"
        />
      </svg>
    </div>
  </div>

  <div
    class="card-container {authMode === 'signup'
      ? 'signup-mode'
      : authMode === 'reset'
        ? 'reset-mode'
        : ''}"
  >
    <div class="tabs-wrapper">
      <div class="tabs-pill">
        <button
          data-sound="1"
          class="tab-btn {authMode === 'login' ? 'active' : ''}"
          onclick={() => setAuthMode("login")}
        >
          Login
        </button>
        <button
          data-sound="1"
          class="tab-btn {authMode === 'signup' ? 'active' : ''}"
          onclick={() => setAuthMode("signup")}
        >
          Sign up
        </button>
        <button
          data-sound="1"
          class="tab-btn {authMode === 'reset' ? 'active' : ''}"
          onclick={() => setAuthMode("reset")}
        >
          Reset
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

      {#if success}
        <div class="success-box">{success}</div>
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

      {#if authMode !== "reset"}
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
      {/if}

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
          {loading
            ? "Please wait..."
            : authMode === "login"
              ? "Login"
              : authMode === "signup"
                ? "Sign up"
                : "Send Reset Email"}
        </button>
      </div>

      {#if authMode === "login"}
        <button
          type="button"
          class="link-btn"
          onclick={() => setAuthMode("reset")}
        >
          Forgot password?
        </button>
      {:else if authMode === "reset"}
        <button
          type="button"
          class="link-btn"
          onclick={() => setAuthMode("login")}
        >
          Back to login
        </button>
      {/if}
    </form>
  </div>
</div>

<style>
  :root {
    --bg-green: #29f76f;
    --btn-green: #237d4e;
    --btn-signup: #2e4e65ff;
    --btn-reset: #8b5a2b;
    --white: #ffffff;
    --gray-bg: #e5e5e5;
    --font: sans-serif;
  }

  .outer-container {
    background: var(--bg);
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

  .reset-mode .tab-btn.active,
  .reset-mode .submit-btn {
    background: var(--btn-reset);
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
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--btn-green);
    transition:
      background 0.2s,
      color 0.2s;
    min-width: 50px;
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

  .error-box {
    background: #ffe5e5;
    border: 1px solid #f5c2c2;
    color: #a33;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .success-box {
    background: #e8f5e8;
    border: 1px solid #a8d5a8;
    color: #2d5a2d;
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
    transition: all 0.2s ease;
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

  .link-btn {
    background: none;
    border: none;
    color: var(--btn-green);
    cursor: pointer;
    font-size: 0.85rem;
    text-decoration: underline;
    margin-top: 1.5rem;
    float: right;
    transition: color 0.2s ease;
  }

  .link-btn:hover {
    color: #0d5f35;
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

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .tabs-pill {
      padding: 3px;
    }

    .tab-btn {
      padding: 5px 8px;
      font-size: 0.8rem;
      min-width: 45px;
    }

    .card-container {
      margin: 0 1rem;
      max-width: calc(100vw - 2rem);
    }
  }
</style>
