// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/access/AccessControl.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";
import "openzeppelin-contracts/security/ReentrancyGuard.sol";

import "./Beadz.sol";

interface IAccount {
    function account(address, uint256) external returns (address);
}

contract Lizardz is
    ERC721,
    ERC721Burnable,
    Ownable2Step,
    AccessControl,
    ReentrancyGuard
{
    using ECDSA for bytes32;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    IAccount immutable registry;

    string baseURI;
    bytes32 lizardRoot;
    uint256 counter;

    uint256 blockRateLimit = 300;
    uint256 beadzPerMint = 1;
    Beadz beadz;

    // signer => recipient => block number
    mapping(address => mapping(address => uint256)) public lastMintBlockNumber;
    mapping(address => bool) public minted;

    constructor(
        string memory baseURI_,
        bytes32 _root,
        Beadz _beadz,
        IAccount _registry
    ) ERC721("Lizardz", "LIZARDZ") {
        baseURI = baseURI_;
        lizardRoot = _root;
        beadz = _beadz;
        registry = _registry;

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setBaseURI(string memory baseURI_)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        baseURI = baseURI_;
    }

    function setLizardRoot(bytes32 _root)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        lizardRoot = _root;
    }

    function setBlockRateLimit(uint256 _blockRateLimit)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        blockRateLimit = _blockRateLimit;
    }

    function setBeadzPerMint(uint256 _beadzPerMint)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        beadzPerMint = _beadzPerMint;
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
        address recipient,
        uint256 recipientToken
    ) public onlyRole(MINTER_ROLE) nonReentrant {
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

        uint256 lastMint = lastMintBlockNumber[signer][recipient];

        require(
            lastMint == 0 || lastMint + 300 < block.number,
            "Exceeded rate limit"
        );

        if (!minted[recipient]) {
            minted[recipient] = true;
            recipientToken = ++counter;
            _safeMint(recipient, recipientToken);
        }

        require(
            ownerOf(recipientToken) == recipient,
            "Invalid recipient token"
        );

        lastMintBlockNumber[signer][recipient] = block.number;

        beadz.mint(
            registry.account(address(this), recipientToken),
            0,
            beadzPerMint,
            ""
        );
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
