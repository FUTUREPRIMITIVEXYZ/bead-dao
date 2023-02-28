// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/Lizard.sol";
import "../src/LizardForwarder.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("GOERLI_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        LizardForwarder forwarder = new LizardForwarder();
        Lizard lizard = new Lizard(
            "https://ilovebeadz.xyz/api/metadata/",
            0x148bc89f5f2e63691c5da55bc81aacfe53cfbe36682c4392d12d3779799095e0,
            300,
            address(forwarder)
        );

        vm.stopBroadcast();
    }
}
