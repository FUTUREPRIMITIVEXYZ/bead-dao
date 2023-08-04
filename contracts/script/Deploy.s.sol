// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import 'forge-std/Script.sol';
import '../src/BEAD.sol';

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint('PRIVATE_KEY');
        vm.startBroadcast(deployerPrivateKey);

        new BEAD(
            bytes32(0x93d8b96525c9f702e08e4ea485da6457c3cc8782871ca9891c6f847e989a0ae5),
            1260,
            'ipfs://bafybeiemt555y6bsgkree3ee4o4v52wgvk275hb2ml5mvv4r24viq74vpq/'
        );

        vm.stopBroadcast();
    }
}
