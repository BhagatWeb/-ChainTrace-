@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #ffffff;      /* Pure White */
  --bg-secondary: #f8fafc;    /* Slate-50 */
  --bg-tertiary: #ffffff;     /* Card background */
  --border-color: #e2e8f0;    /* Slate-200 border */
  --text-primary: #0f172a;    /* Slate-900 */
  --text-secondary: #475569;  /* Slate-600 */
  --accent: #000000;          /* Pure Black */
  --accent-hover: #1e293b;    /* Slate-800 */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #0284c7;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer base {
  ::selection {
    background-color: rgba(0, 0, 0, 0.08);
    color: #000;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
  }
}

@layer components {
  .field-input {
    @apply h-11 w-full rounded-lg border border-slate-200 bg-white
           px-3 text-sm text-slate-900 placeholder:text-slate-400
           focus:border-black focus:outline-none focus:ring-1
           focus:ring-black transition-colors;
  }

  .btn-primary {
    @apply inline-flex h-11 items-center justify-center gap-2 rounded-lg
           bg-black px-5 text-sm font-semibold text-white
           hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60
           transition-all active:scale-[0.98];
  }

  .btn-secondary {
    @apply inline-flex h-11 items-center justify-center gap-2 rounded-lg
           border border-slate-200 bg-white px-5 text-sm font-medium
           text-slate-700 hover:bg-slate-50 hover:text-black
           disabled:cursor-not-allowed disabled:opacity-60 transition-all;
  }

  .btn-danger {
    @apply inline-flex h-11 items-center justify-center gap-2 rounded-lg
           bg-red-50 border border-red-200 px-5 text-sm font-medium
           text-red-700 hover:bg-red-100 hover:text-red-800
           disabled:cursor-not-allowed disabled:opacity-60 transition-all;
  }

  .card {
    @apply rounded-xl border border-slate-200 bg-white p-6
           transition-all hover:border-slate-400;
  }

  .card-interactive {
    @apply card cursor-pointer hover:border-black
           hover:shadow-md hover:shadow-black/5;
  }

  .glass {
    @apply bg-white/95 backdrop-blur-md border border-slate-200;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-black to-slate-600 bg-clip-text text-transparent;
  }

  .status-badge {
    @apply inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
           text-xs font-medium;
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  vertical-align: middle;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.3; }
  100% { transform: scale(0.8); opacity: 0.5; }
}

.animate-status-pulse {
  animation: pulse-ring 2s infinite ease-in-out;
}

.high-air-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.high-air-card:hover {
  border-color: #0f172a;
}



