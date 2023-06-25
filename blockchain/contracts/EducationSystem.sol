// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract EducationSystem is ERC721URIStorage {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   address public government;
   mapping(address => bool) public schools;
   mapping(address => Student) students;
   mapping(uint256 => SchoolNFT) public schoolNFTs;
   mapping(address => uint256[]) public schoolNFTsBySchool;
   mapping(uint => string) public ipfsById;
   mapping(address => address[]) public studentsBySchool; // update
   mapping(address => mapping(address => bool)) public allowedSchoolsStatus;
   mapping(address => address[]) public schoolsByStudent;

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

   function createStudent(address _studentAddress, address _schoolAddress) public onlyGovernment {
      students[_studentAddress] = Student(
         new address[](0),
         new uint256[](0)
      );
      students[_studentAddress].schoolsAllowed.push(msg.sender);
      studentsBySchool[_schoolAddress].push(_studentAddress);
      allowedSchoolsStatus[_studentAddress][_schoolAddress] = true;
   }

   function getStudent(address _studentAddress) public view returns (address[] memory, uint256[] memory) {
       return (students[_studentAddress].schoolsAllowed, students[_studentAddress].ownedNFTs);
   }

    function deleteStudent(address _studentAddress) public onlySchoolsOrGoverment {
        delete students[_studentAddress];
    }

    function addStudentToSchool(address _studentAddress, address _schoolAddress) public onlySchoolsOrGoverment {
        Student storage student = students[_studentAddress];
        schoolsByStudent[_studentAddress].push(_schoolAddress);
        studentsBySchool[_schoolAddress].push(_studentAddress);
        student.schoolsAllowed.push(_schoolAddress);
    }

    function removeSchool(address _studentAddress, address _schoolAddress) public {
        Student storage student = students[_studentAddress];
        uint index = 0;
        bool found = false;

        for(uint i = 0; i < student.schoolsAllowed.length; i++) {
            if(student.schoolsAllowed[i] == _schoolAddress) {
                index = i;
                found = true;
                break;
            }
        }

        if(!found) return;

        for (uint i = index; i < student.schoolsAllowed.length - 1; i++){
            student.schoolsAllowed[i] = student.schoolsAllowed[i+1];
        }
        student.schoolsAllowed.pop();
    }

    function issueNFT(address _studentAddress, string memory _tokenURI) public onlySchoolsOrGoverment {
        uint256 newNFTId = _tokenIds.current() + 1;
        _mint(_studentAddress, newNFTId);
        _setTokenURI(newNFTId, _tokenURI);
        schoolNFTs[newNFTId] = SchoolNFT(newNFTId, msg.sender, _studentAddress, block.timestamp);
        schoolNFTsBySchool[msg.sender].push(newNFTId);
        students[_studentAddress].ownedNFTs.push(newNFTId);
        ipfsById[newNFTId] = _tokenURI;
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

    function getSchoolNFTs(uint256 _id) public view returns (address, address, uint256) {
       return (schoolNFTs[_id].schoolAddress, schoolNFTs[_id].studentAddress, schoolNFTs[_id].issuedAt);
    }

    function getIPFSByID(uint _tokenId) public view returns (string memory) {
        return ipfsById[_tokenId];
    }

    function getStudentsBySchool(address _schoolAddress) public view returns (address[] memory) {
        return studentsBySchool[_schoolAddress];
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