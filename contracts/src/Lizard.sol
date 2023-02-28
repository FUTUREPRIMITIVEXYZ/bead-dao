// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/access/AccessControl.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract Lizard is ERC721, ERC721Burnable, Ownable2Step, AccessControl {
    using ECDSA for bytes32;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string baseURI;
    bytes32 lizardRoot;
    uint256 counter;

    mapping(address => bool) public minted;

    constructor(string memory baseURI_, bytes32 _root) ERC721("Lizard", "LIZ") {
        baseURI = baseURI_;
        lizardRoot = _root;
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
    ) public onlyRole(MINTER_ROLE) {
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

        require(!minted[recipient], "Already minted");

        minted[recipient] = true;

        _safeMint(recipient, ++counter);
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
