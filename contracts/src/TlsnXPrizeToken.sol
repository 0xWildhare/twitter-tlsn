// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IUltraVerifier} from "./interface/Iplonk_vk.sol";

contract TlsnXPrizeToken is ERC20 {
    IUltraVerifier public verifier;

    constructor(address _verifier) ERC20("TLSN X Prize Token", "TXPT") {
        verifier = IUltraVerifier(_verifier);
    }

    function mint(bytes calldata proof, bytes32 secretHash) external payable {
        bytes32[] memory _publicInputs = new bytes32[](1);
        _publicInputs[0] = secretHash;
        verifier.verify(proof, _publicInputs);
        //upon success mint 100 tokens
        _mint(msg.sender, 100 ether);
    }
}
