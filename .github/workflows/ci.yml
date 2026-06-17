name: CI/CD Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  rust-tests:
    name: Rust Smart Contract Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Install Rust Toolchain
        uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: stable
          targets: wasm32-unknown-unknown

      - name: Cache Cargo Dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.cargo/bin/
            ~/.cargo/registry/index/
            ~/.cargo/registry/cache/
            ~/.cargo/git/db/
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.toml') }}

      - name: Run Order Contract Tests
        run: |
          cd contracts/order-contract
          cargo test

      - name: Run Escrow Contract Tests
        run: |
          cd contracts/escrow-contract
          cargo test

  frontend-tests:
    name: Next.js Frontend CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Frontend Tests
        run: npm run test

      - name: Run Build
        run: npm run build
        env:
          NEXT_PUBLIC_STELLAR_NETWORK: testnet
          NEXT_PUBLIC_RPC_URL: https://soroban-testnet.stellar.org:443
          NEXT_PUBLIC_ESCROW_CONTRACT_ID: CBAFHUW7TL73RG4KYSL53ZF4N4NCJK76KXL3NHKEDDWE2GPVHA52LJ47
          NEXT_PUBLIC_ORDER_CONTRACT_ID: CB56DGFX43XUXN2OASKM3SF6I3WWNYUM6KE7HKUKX3JSLZPYQSRQXOHH
