// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/metatx/MinimalForwarder.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/Create2.sol";

import "../src/Lizardz.sol";

contract Registry is IAccount {
    function account(address tokenContract, uint256 tokenId)
        external
        returns (address)
    {
        return
            Create2.computeAddress(
                keccak256(abi.encode(tokenContract, tokenId)),
                ""
            );
    }
}

contract CounterTest is Test {
    string baseURI = "https://example.com/";
    // addrs 0x1 - 0x5
    bytes32 lizardRoot =
        0x6516e9023c69d23b0e7acfe325d6ac80d903995bfa8e6c21cfd69c29641dcb88;

    function testMint() public {
        IAccount registry = new Registry();
        Beadz beadz = new Beadz();
        Lizardz lizard = new Lizardz(baseURI, lizardRoot, beadz, registry);

        lizard.grantRole(lizard.MINTER_ROLE(), address(this));
        beadz.grantRole(beadz.MINTER_ROLE(), address(lizard));

        bytes memory sig;
        bytes32[] memory proof;

        bytes32 hash = lizard.getMessageHash(vm.addr(10), block.number);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);
        sig = abi.encodePacked(r, s, v);

        string memory proofData = vm.readFile("./test/proofs/proof-1.json");
        bytes memory proofJson = vm.parseJson(proofData);
        proof = abi.decode(proofJson, (bytes32[]));

        lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10), 0);

        address tba = registry.account(address(lizard), 1);

        assertEq(
            lizard.lastMintBlockNumber(vm.addr(1), vm.addr(10)),
            block.number
        );
        assertEq(lizard.ownerOf(1), vm.addr(10));
        assertEq(lizard.balanceOf(vm.addr(10)), 1);
        assertEq(beadz.balanceOf(tba, 0), 1);

        vm.expectRevert();
        lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10), 1);

        vm.roll(block.number + 301);
        lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10), 1);

        assertEq(
            lizard.lastMintBlockNumber(vm.addr(1), vm.addr(10)),
            block.number
        );
        assertEq(lizard.ownerOf(1), vm.addr(10));
        assertEq(lizard.balanceOf(vm.addr(10)), 1);
        assertEq(beadz.balanceOf(tba, 0), 2);
    }
}
