import { AccountRegistry } from "../generated/AccountRegistry/AccountRegistry";
import { Transfer as TransferEvent } from "../generated/Lizardz/Lizardz";
import { Lizard } from "../generated/schema";

import { Address } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Lizard(event.params.tokenId.toString());

  let registryAddress = Address.fromString(
    "0xc49B4a8368B545DECeE584258343bE469E65EAc6"
  );
  let lizardAddress = Address.fromString(
    "0x07F884bFBB6B8e440e746543b4BE87737121A085"
  );

  let registry = AccountRegistry.bind(registryAddress);

  entity.owner = event.params.to;
  entity.account = registry.account(lizardAddress, event.params.tokenId);
  entity.save();
}
