// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/Lizard.sol";

contract DeployScript is Script {
    Lizard lizard;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("GOERLI_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        lizard = new Lizard(
            "https://ilovebeadz.xyz/api/metadata/",
            0x148bc89f5f2e63691c5da55bc81aacfe53cfbe36682c4392d12d3779799095e0
        );

        lizard.grantRole(
            lizard.MINTER_ROLE(),
            0xC8712114225D1a8426f07c4a8C5Ef238f8D9be08
        );

        vm.stopBroadcast();
    }
}
