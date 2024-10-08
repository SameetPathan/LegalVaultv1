// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    struct Profile {
        string fullName;
        string phoneNumber;
        string emailId;
        string userAddress;
        string userType;
    }

    mapping(address => Profile) public profiles;
    address[] public allProfileIds;

    event ProfileCreated(address indexed userId, string fullName, string userType);
    event ProfileUpdated(address indexed userId, string fullName, string userType);

    function createProfile(
        string memory _fullName,
        string memory _phoneNumber,
        string memory _emailId,
        string memory _userAddress,
        string memory _userType
    ) external {
        require(bytes(_fullName).length > 0, "Full Name cannot be empty");
        require(bytes(profiles[msg.sender].fullName).length == 0, "Profile already exists");

        Profile storage newProfile = profiles[msg.sender];
        newProfile.fullName = _fullName;
        newProfile.phoneNumber = _phoneNumber;
        newProfile.emailId = _emailId;
        newProfile.userAddress = _userAddress;
        newProfile.userType = _userType;

        allProfileIds.push(msg.sender);

        emit ProfileCreated(msg.sender, _fullName, _userType);
    }

    function updateProfile(
        string memory _fullName,
        string memory _phoneNumber,
        string memory _emailId,
        string memory _userAddress,
        string memory _userType
    ) external {
        require(bytes(_fullName).length > 0, "Full Name cannot be empty");
        require(bytes(profiles[msg.sender].fullName).length > 0, "Profile does not exist");

        Profile storage updatedProfile = profiles[msg.sender];
        updatedProfile.fullName = _fullName;
        updatedProfile.phoneNumber = _phoneNumber;
        updatedProfile.emailId = _emailId;
        updatedProfile.userAddress = _userAddress;
        updatedProfile.userType = _userType;

        emit ProfileUpdated(msg.sender, _fullName, _userType);
    }

    function getAllProfileIds() external view returns (address[] memory) {
        return allProfileIds;
    }

    function getProfileById(address userId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Profile memory userProfile = profiles[userId];
        return (
            userProfile.fullName,
            userProfile.phoneNumber,
            userProfile.emailId,
            userProfile.userAddress,
            userProfile.userType
        );
    }

    function userExists(address userAddress) external view returns (bool) {
        return bytes(profiles[userAddress].fullName).length > 0;
    }

    function getAllProfiles() external view returns (Profile[] memory) {
        Profile[] memory allProfiles = new Profile[](allProfileIds.length);

        for (uint256 i = 0; i < allProfileIds.length; i++) {
            allProfiles[i] = profiles[allProfileIds[i]];
        }

        return allProfiles;
    }

    function updateUserAddress(address newAddress) external {
        require(bytes(profiles[msg.sender].fullName).length > 0, "Profile does not exist");

        profiles[newAddress] = profiles[msg.sender];
        delete profiles[msg.sender];

        for (uint256 i = 0; i < allProfileIds.length; i++) {
            if (allProfileIds[i] == msg.sender) {
                allProfileIds[i] = newAddress;
                break;
            }
        }

        emit ProfileUpdated(newAddress, profiles[newAddress].fullName, profiles[newAddress].userType);
    }
}
