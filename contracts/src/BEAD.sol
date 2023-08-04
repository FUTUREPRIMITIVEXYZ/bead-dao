pragma solidity ^0.8.17;

import 'openzeppelin-contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-contracts/access/Ownable.sol';
import 'openzeppelin-contracts/utils/cryptography/ECDSA.sol';
import 'openzeppelin-contracts/utils/cryptography/MerkleProof.sol';
import 'openzeppelin-contracts/utils/Strings.sol';
import 'openzeppelin-contracts/utils/Base64.sol';

// ✍️ FUTURE PRIMITIVE

contract BEAD is ERC721, Ownable {
    using ECDSA for bytes32;
    using Strings for uint256;

    bytes32 public immutable lizardRoot;
    uint256 public immutable editionCount;
    string public baseURI;
    mapping(uint256 => string) messages;

    constructor(
        bytes32 _lizardRoot,
        uint256 _editionCount,
        string memory _baseURI
    ) ERC721('BEAD DAO', 'BEAD') {
        lizardRoot = _lizardRoot;
        editionCount = _editionCount;
        baseURI = _baseURI;
    }

    function mint(
        uint256 blockNumber,
        bytes calldata signature,
        bytes32[] calldata proof,
        address recipient,
        string memory message
    ) external {
        bytes32 messageHash = keccak256(
            abi.encodePacked(recipient, blockhash(blockNumber))
        ).toEthSignedMessageHash();
        address signer = messageHash.recover(signature);

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(signer))));

        bool proofValid = MerkleProof.verifyCalldata(proof, lizardRoot, leaf);

        require(proofValid, 'Signer is not a lizard');

        uint256 tokenId = uint256(messageHash);
        if (bytes(message).length > 0) {
            messages[tokenId] = message;
        }
        _safeMint(recipient, uint256(messageHash));
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory message = messages[tokenId];

        if (bytes(message).length == 0) {
            message = unicode'ᗷEᗩᗪ ᗪᗩO';
        }

        uint256 beadId = (tokenId % editionCount) + 1;

        bytes memory dataURI = abi.encodePacked(
            '{',
            '"name": "',
            message,
            '",',
            '"description": "',
            unicode'ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz',
            '",',
            '"image": "',
            string(abi.encodePacked(baseURI, beadId.toString())),
            '.png',
            '"',
            '}'
        );

        return
            string(
                abi.encodePacked('data:application/json;base64,', Base64.encode(dataURI))
            );
    }
}
