// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

import "../src/Lizard.sol";

contract CounterTest is Test {
    string baseURI = "https://example.com/";
    // addrs 0x1 - 0x5
    bytes32 lizardRoot =
        0x6516e9023c69d23b0e7acfe325d6ac80d903995bfa8e6c21cfd69c29641dcb88;

    function testMint() public {
        Lizard lizard = new Lizard(baseURI, lizardRoot, 1 hours);

        bytes32 hash = ECDSA.toEthSignedMessageHash(
            abi.encodePacked("hello world")
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);
        bytes memory sig = abi.encodePacked(r, s, v);

        string memory proofData = vm.readFile("./test/proofs/proof-1.json");
        bytes memory proofJson = vm.parseJson(proofData);
        bytes32[] memory proof = abi.decode(proofJson, (bytes32[]));

        lizard.mint(vm.addr(1), hash, sig, proof, vm.addr(10));

        assertEq(lizard.ownerOf(1), vm.addr(10));
        assertEq(lizard.balanceOf(vm.addr(10)), 1);

        assertEq(
            lizard.lastMintTimestamp(vm.addr(1), address(this)),
            block.timestamp
        );

        vm.expectRevert();
        lizard.mint(vm.addr(1), hash, sig, proof, vm.addr(10));

        vm.warp(block.timestamp + 2 hours);
        lizard.mint(vm.addr(1), hash, sig, proof, vm.addr(10));

        assertEq(lizard.ownerOf(2), vm.addr(10));
        assertEq(lizard.balanceOf(vm.addr(10)), 2);
    }
}
