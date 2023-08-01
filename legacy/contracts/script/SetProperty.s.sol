// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/Lizardz.sol";

contract SetPropertyScript is Script {
    Lizardz lizard;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("GOERLI_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Beadz beadz = Beadz(0xBcCBac7d4542AF384f1A8c35EA25af1BD910b090);
        lizard = Lizardz(0x0a357ac2bD496f26e4Ed53543Ce287B8C02DDe9A);

        lizard.setBlockRateLimit(0);

        vm.stopBroadcast();
    }
}
