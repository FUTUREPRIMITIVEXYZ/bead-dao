const fs = require("fs");
const path = require("path");
require("dotenv").config();

const stateStore = path.resolve(__dirname, "statestore");
const db = path.resolve(__dirname, "indexing.sqlite");

const config = {
  anchor: {
    "auth-method": "did",
  },
  "http-api": {
    "cors-allowed-origins": [".*"],
    "admin-dids": [process.env.CERAMIC_DID],
  },
  ipfs: {
    mode: "bundled",
  },
  logger: {
    "log-level": 2,
    "log-to-files": false,
  },
  metrics: {
    "metrics-exporter-enabled": false,
  },
  network: {
    name: "testnet-clay",
  },
  node: {
    privateSeedUrl: process.env.CERAMIC_PRIVATE_SEED_URL,
  },
  "state-store": {
    mode: "fs",
    "local-directory": stateStore,
  },
  indexing: {
    db: `sqlite://${db}`,
    "allow-queries-before-historical-sync": true,
    "disable-composedb": false,
    "enable-historical-sync": false,
  },
};

fs.writeFileSync(
  path.resolve(__dirname, "daemon.config.json"),
  JSON.stringify(config)
);
