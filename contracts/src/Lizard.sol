// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/metatx/ERC2771Context.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract Lizard is ERC721, ERC721Burnable, ERC2771Context, Ownable2Step {
    using ECDSA for bytes32;

    string baseURI;
    bytes32 lizardRoot;
    uint256 rateLimit;
    uint256 counter;

    // lizard => sender => block number
    mapping(address => mapping(address => uint256)) public lastMintBlockNumber;

    constructor(
        string memory baseURI_,
        bytes32 _root,
        uint256 _rateLimit,
        address trustedForwarder
    ) ERC721("Lizard", "LIZ") ERC2771Context(trustedForwarder) {
        baseURI = baseURI_;
        lizardRoot = _root;
        rateLimit = _rateLimit;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function setLizardRoot(bytes32 _root) external onlyOwner {
        lizardRoot = _root;
    }

    function setRateLimit(uint256 _rateLimit) external onlyOwner {
        rateLimit = _rateLimit;
    }

    function getMessageHash(address recipient, uint256 blockNumber)
        public
        view
        returns (bytes32)
    {
        return
            keccak256(abi.encodePacked(recipient, blockhash(blockNumber)))
                .toEthSignedMessageHash();
    }

    function mint(
        address lizard,
        uint256 signatureBlockNumber,
        bytes calldata lizardSignature,
        bytes32[] calldata lizardProof,
        address recipient
    ) public {
        bytes32 messageHash = getMessageHash(recipient, signatureBlockNumber);
        address signer = messageHash.recover(lizardSignature);

        require(signer == lizard, "Signer not authorized");

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(lizard))));

        bool proofValid = MerkleProof.verifyCalldata(
            lizardProof,
            lizardRoot,
            leaf
        );

        require(proofValid, "Signer is not a lizard");

        address sender = _msgSender();

        uint256 lastMint = lastMintBlockNumber[lizard][sender];
        if (lastMint != 0) {
            require(
                block.number > lastMint + rateLimit,
                "Exceeded mint rate limit"
            );
        }

        lastMintBlockNumber[lizard][sender] = block.number;

        _safeMint(recipient, ++counter);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _msgSender()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }
}
