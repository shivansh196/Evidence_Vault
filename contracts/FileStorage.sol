// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FileStorage {
    struct File {
        string ipfsHash;    //ipfs hash of the file
        string fileName;
        address owner;
    }

    mapping(uint256 => File) public files;   //Providing numbering indexing and these two state  
    uint256 public fileCount;                //variables are used to manage and keep track of files stored

   
    function addFile(string memory _ipfsHash, string memory _fileName) public {
        fileCount++;
        files[fileCount] = File(_ipfsHash, _fileName, msg.sender);
    }
}
