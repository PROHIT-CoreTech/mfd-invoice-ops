# MFD Invoice Automation Desktop App (`mfd-invoice-ops`)

[![Electron](https://img.shields.io/badge/Electron-v34.5.8-blue.svg)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-v19.0.0-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.3-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-v6.1.0-646cff.svg)](https://vitejs.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003b57.svg)](https://github.com/WiseLibs/better-sqlite3)
[![Playwright](https://img.shields.io/badge/Playwright-v1.50.1-2ead33.svg)](https://playwright.dev/)

A licensed desktop application for Mutual Fund Distributor (MFD) invoice automation, statement reconciliation, and Tally accounting synchronization.

---

## 🏗️ Tech Stack & Specifications

- **Frontend UI**: React 19 + TypeScript + Vite + Tailwind CSS (`src/renderer`).
- **Main / Backend Process**: Electron + Node.js (`src/main`).
- **Local Storage**: SQLite (`better-sqlite3`) with WAL journal mode targeting `%APPDATA%/MFDInvoiceOps/data.db`.
- **System Integrations**: 
  - **Playwright**: Non-headless browser automation for CAMS & KFintech portal downloads.
  - **Tally Client**: HTTP/XML interface supporting Tally Prime and Tally ERP 9 (default port `9000`).
  - **ExcelJS**: High-performance Excel statement parsing.
- **Packaging**: `electron-builder` with custom Windows Inno Setup (`installer.iss`) configuration.

---

## 📁 Architecture & Directory Structure

```text
mfd-invoice-ops/
├── package.json
├── electron-builder.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── resources/
│   ├── icon.ico
│   └── installer.iss
└── src/
    ├── shared/
    │   ├── types/
    │   │   ├── invoice.ts
    │   │   ├── tally.ts
    │   │   └── audit.ts
    │   └── constants/
    │       └── ipcChannels.ts
    ├── main/
    │   ├── index.ts
    │   ├── preload.ts
    │   ├── ipc/
    │   │   ├── invoiceHandler.ts
    │   │   ├── tallyHandler.ts
    │   │   ├── portalHandler.ts
    │   │   └── profileHandler.ts
    │   ├── database/
    │   │   ├── client.ts
    │   │   ├── auditLogger.ts
    │   │   ├── migrations/
    │   │   └── models/
    │   ├── services/
    │   │   ├── stateMachine.ts
    │   │   ├── invoiceSequencer.ts
    │   │   ├── reconciler.ts
    │   │   └── excelParser.ts
    │   ├── integrations/
    │   │   ├── tally/
    │   │   │   ├── primeClient.ts
    │   │   │   ├── erp9Client.ts
    │   │   │   └── detector.ts
    │   │   ├── portal/
    │   │   │   ├── browser.ts
    │   │   │   ├── camsFlow.ts
    │   │   │   └── kfinFlow.ts
    │   │   └── excel/
    │   │       ├── camsTemplate.ts
    │   │       └── kfinTemplate.ts
    │   └── security/
    │       ├── licenseValidator.ts
    │       └── hardwareInfo.ts
    └── renderer/
        ├── index.html
        ├── main.tsx
        ├── App.tsx
        ├── api/
        │   └── electronAPI.ts
        ├── components/
        │   ├── common/
        │   ├── layout/
        │   └── tables/
        ├── views/
        │   ├── Dashboard.tsx
        │   ├── InvoiceRegistry.tsx
        │   ├── Reconciliation.tsx
        │   ├── TallySync.tsx
        │   ├── Profile.tsx
        │   └── AuditLogs.tsx
        ├── hooks/
        └── assets/
            └── styles/
                └── index.css
```

---

## 🔥 Features Implemented

1. **Type-Safe Preload IPC Bridge**: Exposes safe, typed methods between Electron Main and React Renderer via `window.electronAPI`.
2. **Local SQLite Persistence**: Auto-migrates database schemas on launch and stores persistent audit trail entries (`audit_logs`).
3. **Tally Prime / ERP 9 Sync**: Port detector & XML voucher generation for automated ledger posting.
4. **Portal Automation Engine**: Playwright browser flow launcher for CAMS & KFintech statement fetch.
5. **Modern Glassmorphism UI**: Responsive dark-mode dashboard with interactive views:
   - **Dashboard**: High-level metrics, total invoice volume, and quick creation.
   - **Invoice Registry**: Filterable table tracking invoice states (`DRAFT`, `RECONCILED`, `TALLY_SYNCED`, `SIGNED`, `UPLOADED`).
   - **Reconciliation**: Automated CAMS & KFintech portal browser session triggers.
   - **Tally Integration**: XML server port connection test & sync triggers.
   - **License & Security**: SHA-256 hardware node fingerprinting and license binding.
   - **Audit Trail**: Real-time SQLite log viewer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ or v20+
- npm v9+

### Installation & Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PROHIT-CoreTech/mfd-invoice-ops.git
   cd mfd-invoice-ops
   ```

2. **Install dependencies**:
   ```bash
   npm install --ignore-scripts
   ```

3. **Rebuild native module & Electron binaries**:
   ```bash
   node node_modules/electron/install.js
   npx electron-builder install-app-deps
   ```

4. **Run in development mode**:
   ```bash
   npm run dev
   ```

5. **Build & Type Check**:
   ```bash
   npm run build
   ```

6. **Package Executable Installer**:
   ```bash
   npm run package
   ```

---

## 📄 License
Licensed for MFD Invoice Automation Operations. Proprietary & Confidential.
