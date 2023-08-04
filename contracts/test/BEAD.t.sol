// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import 'forge-std/Test.sol';
import 'openzeppelin-contracts/utils/cryptography/ECDSA.sol';

import '../src/BEAD.sol';

contract BEADTest is Test {
    BEAD public bead;

    // addrs 0x1 - 0x5
    bytes32 lizardRoot =
        0x6516e9023c69d23b0e7acfe325d6ac80d903995bfa8e6c21cfd69c29641dcb88;

    string baseURI =
        'ipfs://bafybeiemt555y6bsgkree3ee4o4v52wgvk275hb2ml5mvv4r24viq74vpq/';

    function setUp() public {
        bead = new BEAD(lizardRoot, 1260, baseURI);
    }

    function testMint() public {
        bytes memory sig;
        bytes32[] memory proof;

        bytes32 message = keccak256(
            abi.encodePacked(vm.addr(10), blockhash(block.number))
        );
        bytes32 hash = ECDSA.toEthSignedMessageHash(message);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);
        sig = abi.encodePacked(r, s, v);

        string memory proofData = vm.readFile('./test/proofs/proof-1.json');
        bytes memory proofJson = vm.parseJson(proofData);
        proof = abi.decode(proofJson, (bytes32[]));

        vm.prank(vm.addr(10));
        uint256 start = gasleft();
        bead.mint(
            block.number,
            sig,
            proof,
            vm.addr(10),
            'bead dao represent frfr no cap we out here'
        );
        console.log(start - gasleft());

        assertEq(bead.ownerOf(uint256(hash)), vm.addr(10));
        console.log(bead.tokenURI(uint256(hash)));
    }
}
