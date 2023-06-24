// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract EducationSystem is ERC721 {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   address public government;
   mapping(address => bool) public schools;
   mapping(address => Student) students;
   mapping(uint256 => SchoolNFT) public schoolNFTs;
   mapping(address => uint256[]) public schoolNFTsBySchool;

   struct Student {
      address[] schoolsAllowed;
      uint256[] ownedNFTs;
   }

   struct SchoolNFT {
      uint256 id;
      address schoolAddress;
      address studentAddress;
      uint256 issuedAt;
   }

   uint256 public constant EXPIRY_PERIOD = 30 days;

   constructor() ERC721("EducationSystemNFT", "ESN") {
      government = msg.sender;
   }

   modifier onlyGovernment() {
      require(
         msg.sender == government,
         "Only the government can perform this action"
      );
      _;
   }

   modifier onlySchools() {
      require(schools[msg.sender], "Only a school can perform this action");
      _;
   }

   modifier onlySchoolsOrGoverment() {
       require(schools[msg.sender] || msg.sender == government, "Only a school or the goverment can perform this action");
       _;
   }

   function createSchool(address _schoolAddress) public onlyGovernment {
      schools[_schoolAddress] = true;
   }

   function createStudent(address _studentAddress) public onlyGovernment {
      students[_studentAddress] = Student(
         new address[](0),
         new uint256[](0)
      );
      students[_studentAddress].schoolsAllowed.push(msg.sender);
   }

   function getStudent(address wallet) public view returns (address[] memory, uint256[] memory) {
       return (students[wallet].schoolsAllowed, students[wallet].ownedNFTs);
   }

    function deleteStudent(address _studentAddress) public onlySchoolsOrGoverment {
        delete students[_studentAddress];
    }

    function issueNFT(address _studentAddress) public onlySchoolsOrGoverment {
        uint256 newNFTId = _tokenIds.current() + 1;
        _mint(_studentAddress, newNFTId);
        schoolNFTs[newNFTId] = SchoolNFT(newNFTId, msg.sender, _studentAddress, block.timestamp);
        schoolNFTsBySchool[msg.sender].push(newNFTId);
        students[_studentAddress].ownedNFTs.push(newNFTId);
        _tokenIds.increment();
    }

    function destroyNFT(uint256 _tokenId) public onlySchools {
        require(
            block.timestamp <= schoolNFTs[_tokenId].issuedAt + EXPIRY_PERIOD,
            "The expiry period for destroying this NFT has passed"
        );
        _burn(_tokenId);
        delete schoolNFTs[_tokenId];
    }

    function getSchoolNFTs(uint256 id) public view returns (address, address, uint256) {
       return (schoolNFTs[id].schoolAddress, schoolNFTs[id].studentAddress, schoolNFTs[id].issuedAt);
    }

    function seeOwnedNFTs(
        address _studentAddress
    ) public view returns (uint256[] memory) {
        return students[_studentAddress].ownedNFTs;
    }

    function seeNFTOrigin(uint256 _tokenId) public view returns (address) {
        return schoolNFTs[_tokenId].schoolAddress;
    }
}