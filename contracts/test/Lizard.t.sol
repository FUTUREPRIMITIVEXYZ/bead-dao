// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/metatx/MinimalForwarder.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

import "../src/Lizard.sol";
import "../src/LizardForwarder.sol";

contract CounterTest is Test {
    string baseURI = "https://example.com/";
    // addrs 0x1 - 0x5
    bytes32 lizardRoot =
        0x6516e9023c69d23b0e7acfe325d6ac80d903995bfa8e6c21cfd69c29641dcb88;

    function testMint() public {
        LizardForwarder forwarder = new LizardForwarder();

        Lizard lizard = new Lizard(
            baseURI,
            lizardRoot,
            300,
            address(forwarder)
        );

        bytes memory sig;
        bytes32[] memory proof;

        {
            bytes32 hash = lizard.getMessageHash(vm.addr(10), block.number);
            (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);
            sig = abi.encodePacked(r, s, v);

            string memory proofData = vm.readFile("./test/proofs/proof-1.json");
            bytes memory proofJson = vm.parseJson(proofData);
            proof = abi.decode(proofJson, (bytes32[]));

            lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10));

            assertEq(lizard.ownerOf(1), vm.addr(10));
            assertEq(lizard.balanceOf(vm.addr(10)), 1);

            assertEq(
                lizard.lastMintBlockNumber(vm.addr(1), address(this)),
                block.number
            );

            vm.expectRevert();
            lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10));

            vm.roll(block.number + 301);
            lizard.mint(vm.addr(1), block.number, sig, proof, vm.addr(10));

            assertEq(lizard.ownerOf(2), vm.addr(10));
            assertEq(lizard.balanceOf(vm.addr(10)), 2);
        }

        LizardForwarder.ForwardRequest memory request = LizardForwarder
            .ForwardRequest(
                vm.addr(10),
                address(lizard),
                forwarder.getNonce(vm.addr(10)),
                abi.encodeWithSignature(
                    "mint(address,uint256,bytes,bytes32[],address)",
                    vm.addr(1),
                    block.number,
                    sig,
                    proof,
                    vm.addr(10)
                )
            );

        bytes32 forwarderHash = forwarder.getMessageHash(request);
        (uint8 vF, bytes32 rF, bytes32 sF) = vm.sign(10, forwarderHash);
        bytes memory requestSig = abi.encodePacked(rF, sF, vF);

        console.logBytes32(forwarderHash);
        console.logBytes(requestSig);
        console.log(forwarder.verify(request, requestSig));

        assertEq(forwarder.verify(request, requestSig), true);

        console.log(vm.addr(10));

        vm.roll(block.number + 301);
        uint256 start = gasleft();
        forwarder.execute(request, requestSig);
        console.log(start - gasleft());

        assertEq(lizard.ownerOf(3), vm.addr(10));
        assertEq(lizard.balanceOf(vm.addr(10)), 3);
    }
}
