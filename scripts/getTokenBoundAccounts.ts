import { ethers } from "ethers";
import fs from "fs";

require("dotenv").config();

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

const accountRegistry = new ethers.Contract(
  registry,
  ["function account(address, uint256) returns (address)"],
  provider
);

const accounts: string[] = [];

async function main() {
  for (let tokenId = 1; tokenId <= 1000; tokenId++) {
    const account = await accountRegistry.callStatic.account(
      process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
      tokenId
    );
    await new Promise((res) => setTimeout(res, 100));
    accounts.push(account);
  }

  fs.writeFileSync("./lizardAccounts.json", JSON.stringify(accounts));
}

main();
