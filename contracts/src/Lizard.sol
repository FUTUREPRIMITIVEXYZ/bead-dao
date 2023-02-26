// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract Lizard is ERC721, ERC721Burnable, Ownable2Step {
    string baseURI;
    bytes32 lizardRoot;
    uint256 counter;

    // lizard => sender => timstamp
    mapping(address => mapping(address => uint256)) lastMintTimestamp;

    constructor(string memory baseURI_, bytes32 _root) ERC721("Lizard", "LIZ") {
        baseURI = baseURI_;
        lizardRoot = _root;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function setLizardRoot(bytes32 _root) external onlyOwner {
        lizardRoot = _root;
    }

    function mint(
        address lizard,
        bytes32 lizardHash,
        bytes calldata lizardSignature,
        bytes32[] calldata lizardProof,
        address recipient
    ) public onlyOwner {
        (address signer, ECDSA.RecoverError error) = ECDSA.tryRecover(
            lizardHash,
            lizardSignature
        );

        require(
            error == ECDSA.RecoverError.NoError,
            "Error validating signature"
        );
        require(signer == lizard, "Signer not authorized");

        bool proofValid = MerkleProof.verify(
            lizardProof,
            lizardRoot,
            keccak256(abi.encodePacked(lizard))
        );

        require(proofValid, "Signer is not a lizard");

        address sender = _msgSender();

        require(
            lastMintTimestamp[lizard][sender] < block.timestamp + 1 hours,
            "Exceeded mint rate limit"
        );

        _safeMint(recipient, ++counter);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
