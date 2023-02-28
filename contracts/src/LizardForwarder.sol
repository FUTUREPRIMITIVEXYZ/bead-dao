// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/EIP712.sol";

contract LizardForwarder is EIP712 {
    using ECDSA for bytes32;

    struct ForwardRequest {
        address from;
        address to;
        uint256 nonce;
        bytes data;
    }

    bytes32 private constant _TYPEHASH =
        keccak256(
            "ForwardRequest(address from,address to,uint256 nonce,bytes data)"
        );

    mapping(address => uint256) private _nonces;

    constructor() EIP712("LizardForwarder", "0.0.1") {}

    function getNonce(address from) public view returns (uint256) {
        return _nonces[from];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature)
        public
        view
        returns (bool)
    {
        address signer = getMessageHash(req).recover(signature);
        return _nonces[req.from] == req.nonce && signer == req.from;
    }

    function getMessageHash(ForwardRequest calldata req)
        public
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        _TYPEHASH,
                        req.from,
                        req.to,
                        req.nonce,
                        keccak256(req.data)
                    )
                )
            );
    }

    function execute(ForwardRequest calldata req, bytes calldata signature)
        public
        payable
        returns (bool success, bytes memory result)
    {
        require(
            verify(req, signature),
            "LizardForwarder: signature does not match request"
        );
        _nonces[req.from] = req.nonce + 1;

        (success, result) = req.to.call(abi.encodePacked(req.data, req.from));

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
}
