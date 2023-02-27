// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract Lizard is ERC721, ERC721Burnable, Ownable2Step {
    string baseURI;
    bytes32 lizardRoot;
    uint256 timeLimit;
    uint256 counter;

    // lizard => sender => timstamp
    mapping(address => mapping(address => uint256)) public lastMintTimestamp;

    constructor(
        string memory baseURI_,
        bytes32 _root,
        uint256 _timeLimit
    ) ERC721("Lizard", "LIZ") {
        baseURI = baseURI_;
        lizardRoot = _root;
        timeLimit = _timeLimit;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function setLizardRoot(bytes32 _root) external onlyOwner {
        lizardRoot = _root;
    }

    function setTimeLimit(uint256 _timeLimit) external onlyOwner {
        timeLimit = _timeLimit;
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

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(lizard))));

        bool proofValid = MerkleProof.verifyCalldata(
            lizardProof,
            lizardRoot,
            leaf
        );

        require(proofValid, "Signer is not a lizard");

        address sender = _msgSender();

        uint256 lastMint = lastMintTimestamp[lizard][sender];
        if (lastMint != 0) {
            require(
                block.timestamp > lastMint + timeLimit,
                "Exceeded mint rate limit"
            );
        }

        lastMintTimestamp[lizard][sender] = block.timestamp;

        _safeMint(recipient, ++counter);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
