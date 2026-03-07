(function () {
  const AUTH_KEY = 'dfaDemoAuth';
  const DEMO_EMAIL = 'demo@dfasystems.com';
  const DEMO_PASSWORD = 'demo123';

  const isLoggedIn = () => localStorage.getItem(AUTH_KEY) === 'true';

  const setLoggedIn = (value) => {
    localStorage.setItem(AUTH_KEY, value ? 'true' : 'false');
  };

  const initLogin = () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      // Demo-only authentication. Replace this with real auth (Firebase, Supabase, or backend session auth).
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setLoggedIn(true);
        message.textContent = 'Login successful. Redirecting...';
        message.className = 'notice success';
        window.location.href = 'private-demos.html';
        return;
      }

      message.textContent = 'Invalid demo credentials.';
      message.className = 'notice error';
      setLoggedIn(false);
    });
  };

  const protectPrivatePage = () => {
    if (document.body.dataset.page !== 'private') return;

    // Client-side guard for demo purposes only. Must be replaced in production with server-side auth checks.
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
    }
  };

  const initLogout = () => {
    const btn = document.getElementById('logoutBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      setLoggedIn(false);
      window.location.href = 'login.html';
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    protectPrivatePage();
    initLogin();
    initLogout();
  });
})();
