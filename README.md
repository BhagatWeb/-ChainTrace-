# ⚡ ChainTrace — Cross-Border Supply Chain Milestone Escrow & Financing

ChainTrace is a decentralized trade coordination and financing protocol built on **Stellar Soroban**. It facilitates trustless global trade by allowing Buyers, Suppliers, Logistics Providers, and Inspectors to manage orders, track delivery milestones, dispute shipments, and release financing payments dynamically based on multi-party state-machine verifications.

---

## 📌 Problem & Solution

### The Problem
Cross-border supply chains suffer from severe counterparty risks and operational opacity:
1. **Lack of Payment Security**: Suppliers fear shipping goods without advance payments, while Buyers fear losing funds to untrusted or delayed shipments.
2. **Coarse-Grained Payouts**: Payment terms are often rigid, preventing incremental payouts matching real logistics progress.
3. **Dispute Vulnerabilities**: If goods are damaged or misrouted, funds get locked up indefinitely due to lack of transparent multi-party state resolution.

### The Solution: ChainTrace
ChainTrace establishes trust by locking Buyer funds in an on-chain Escrow vault and releasing them programmatically based on verifiable logistics milestones:
- **Dual-Contract Architecture**: Separation of order metadata (`order-contract`) from the actual fund locking/release mechanisms (`escrow-contract`) for high security.
- **Inter-Contract state updates**: When a verified logistics provider or inspector updates a shipment milestone, the `order-contract` performs a cross-contract invocation to `escrow-contract` to execute payouts.
- **Role-based dashboard**: Granular control panel with custom modules tailored to **Buyers**, **Suppliers**, **Logistics Providers**, and **Inspectors**.

---

## 🚀 Deployed Contracts & Credentials

*   **Order Manager Contract ID**: `CB56DGFX43XUXN2OASKM3SF6I3WWNYUM6KE7HKUKX3JSLZPYQSRQXOHH`
*   **Escrow Vault Contract ID**: `CBAFHUW7TL73RG4KYSL53ZF4N4NCJK76KXL3NHKEDDWE2GPVHA52LJ47`
*   **Stellar Network**: Testnet
*   **Initialization Transaction**: `7fb488cc3a32f6b3e7ff7de9ef652a921d743a129de9d28bc9ef2816ccb21f3a` (cross-linked for automatic milestone payouts)

---

## 📸 Submission Screenshots & Demo Video

*Please replace the placeholders below with your own screenshots and video link before final submission:*

### 📹 Demo Video Link
- [Link to Demo Video (1-2 minutes)]() <!-- Insert your video link here (Google Drive, Loom, YouTube, etc.) -->

### 📱 Mobile Responsive UI
<!-- Drag and drop your mobile view screenshots here -->
*(Upload mobile-responsive UI screenshots here)*

### ⚙️ CI/CD Pipeline Running
<!-- Drag and drop your CI/CD pipeline screenshot here -->
*(Upload CI/CD pipeline screenshot here)*

### 🧪 Test Output (3+ Passing Tests)
<!-- Drag and drop your passing test suite screenshot here -->
*(Upload test suite run screenshot here)*

---

## 🌟 Progressive Features (Level 1, 2, and 3)

### 👛 Level 1: Core Connectivity & Direct Routing
*   **Multi-Wallet Bridge**: Smooth connection and disconnection handling using the Stellar Wallets Kit (Freighter, xBull, Albedo).
*   **Balance Polling**: Real-time display of connected account balances in XLM, utilizing polling to reflect transaction state changes.
*   **Direct Payments (`/transfer`)**: Secure, validated transfer module supporting recipient address check, input guards, and direct Stellar Testnet transaction submissions.

### ⛓️ Level 2: Inter-Contract State Machine
*   **Dual-Contract Architecture**: 
    *   `order-contract`: Stores order parameters (milestones, roles: Buyer, Supplier, Logistics, Inspector).
    *   `escrow-contract`: Holds buyer's locked funds and handles milestone-specific payout distributions.
*   **Milestone State-Machine**: Tracks transitions from `Created` ➔ `Funded` ➔ `Shipped` ➔ `Delivered` ➔ `Completed` or `Disputed`.
*   **Inter-Contract Invocations**: Auto-invokes payment release hooks inside the `escrow-contract` when specific milestones are marked resolved.
*   **Responsive Control Panel**: Clean, dashboard layouts allowing different actors (Buyer, Supplier, Logistics, Inspector) to perform role-restricted actions with load states.

### 📡 Level 3: Event Logs, Tests, and CI/CD Pipelines
*   **Real-time Event Log**: Dynamic stream pulling event topics and values directly from Soroban RPC ledger logs.
*   **Comprehensive Testing**:
    *   **Cargo Unit Tests**: 3 Rust smart contract tests validating lifecycle logic and state changes.
    *   **Vitest Suite**: 12 passing tests verifying utility helper conversions (`stroopsToXlm`, `xlmToStroops`, etc.) and key UI components.
*   **CI/CD Pipeline**: GitHub Action workflows (`ci.yml`) automating contract compilation, Rust testing, Next.js linting, Vitest runs, and production builds.

---

## 🛠️ Technology Stack
*   **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS (Monochromatic zinc dark-mode theme)
*   **Contracts**: Rust (Soroban SDK `22.0.11`)
*   **Stellar Integration**: `@stellar/stellar-sdk` & `@creit.tech/stellar-wallets-kit`
*   **Testing**: Vitest + JSDOM for frontend; Cargo test for Rust contracts

---

## 💻 Local Installation & Getting Started

### 📋 Prerequisites
*   Node.js 18+ or 20+
*   Cargo + Rust Toolchain (with `wasm32-unknown-unknown` target)
*   Freighter Wallet extension installed

### 🛠️ Step-by-Step Setup

1. **Clone the Repository and Navigate to the Directory**:
   ```bash
   git clone https://github.com/BhagatWeb/ChainTrace.git
   cd ChainTrace
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root with the following configuration:
   ```env
   NEXT_PUBLIC_ESCROW_CONTRACT_ID=CBAFHUW7TL73RG4KYSL53ZF4N4NCJK76KXL3NHKEDDWE2GPVHA52LJ47
   NEXT_PUBLIC_ORDER_CONTRACT_ID=CB56DGFX43XUXN2OASKM3SF6I3WWNYUM6KE7HKUKX3JSLZPYQSRQXOHH
   NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Run the Test Suite**:
   *   **Frontend Tests**: `npm run test`
   *   **Rust Contract Tests**:
       ```bash
       cd contracts/order-contract && cargo test
       cd ../escrow-contract && cargo test
       ```

---

## 👨‍💻 Author
**BhagatWeb** — [GitHub](https://github.com/BhagatWeb)

---

## 📄 License
This project is licensed under the MIT License.
