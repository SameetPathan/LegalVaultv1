// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CaseManagement {
    struct Case {
        string fullNameAndPhoneNumber; // Combined fullName and phoneNumber
        string currentAddress;
        string titleDescription; // Combine title and description
        string[] documents; // Store array of documents
        string status;
        string caseType;
        string copyOfFIR;
        string lawyerDetails; // Combine lawyerName and lawyerPhoneNumber
        string lawyerAddress;
        string paymentStatus;
    }
    
    // Mapping to store cases
    mapping(string => Case) public cases;
    string[] public caseIds; // Array to store case IDs
    
    // Event to emit when a new case is added
    event NewCaseAdded(string indexed caseId, address indexed owner);
    
    // Event to emit when a case status is updated
    event CaseStatusUpdated(string indexed caseId, string newStatus, address indexed updater);

     // Event to emit when payment status is updated
    event PaymentStatusUpdated(string indexed caseId, string newPaymentStatus, address indexed updater);

    // Event to emit when lawyer details are updated
    event LawyerDetailsUpdated(string indexed caseId, string newLawyerDetails, string newLawyerAddress,string newStatus, address indexed updater);
    
    
    // Function to add a new case
    function addCase(
        string memory _caseId,
        string memory _fullNameAndPhoneNumber,
        string memory _currentAddress,
        string memory _titleDescription,
        string[] memory _documents,
        string memory _status,
        string memory _caseType,
        string memory _copyOfFIR,
        string memory _lawyerDetails,
        string memory _lawyerAddress,
        string memory _paymentStatus
    ) external {
        // Create a new Case object
        Case memory newCase = Case({
            fullNameAndPhoneNumber: _fullNameAndPhoneNumber,
            currentAddress: _currentAddress,
            titleDescription: _titleDescription,
            documents: _documents,
            status: _status,
            caseType: _caseType,
            copyOfFIR: _copyOfFIR,
            lawyerDetails: _lawyerDetails,
            lawyerAddress: _lawyerAddress,
            paymentStatus: _paymentStatus
        });
        
        // Store the case in the mapping
        cases[_caseId] = newCase;
        caseIds.push(_caseId); // Add case ID to the array
        
        // Emit an event
        emit NewCaseAdded(_caseId, msg.sender);
    }
    
    // Function to update the status of a case
    function updateCaseStatus(string memory _caseId, string memory _newStatus) external {
        require(bytes(cases[_caseId].fullNameAndPhoneNumber).length != 0, "Case does not exist");
        cases[_caseId].status = _newStatus;
        emit CaseStatusUpdated(_caseId, _newStatus, msg.sender);
    }
    
    // Function to get all case IDs
    function getAllCaseIds() external view returns (string[] memory) {
        return caseIds;
    }

    // Function to update the payment status of a case
    function updatePaymentStatus(string memory _caseId,string memory _newPaymentStatus) external {
        require(bytes(cases[_caseId].fullNameAndPhoneNumber).length != 0, "Case does not exist");
        cases[_caseId].paymentStatus = _newPaymentStatus;
        emit PaymentStatusUpdated(_caseId, _newPaymentStatus, msg.sender);
    }

    // Function to update the lawyer details of a case
    function updateLawyerDetails(string memory _caseId, string memory _newLawyerDetails, string memory _newLawyerAddress , string memory _newStatus) external {
        require(bytes(cases[_caseId].fullNameAndPhoneNumber).length != 0, "Case does not exist");
        cases[_caseId].lawyerDetails = _newLawyerDetails;
        cases[_caseId].lawyerAddress = _newLawyerAddress;
        cases[_caseId].status = _newStatus;
        emit LawyerDetailsUpdated(_caseId, _newLawyerDetails, _newLawyerAddress,_newStatus, msg.sender);
    }

    function getAllCases() external view returns (Case[] memory) {
    Case[] memory allCases = new Case[](caseIds.length);
    for (uint i = 0; i < caseIds.length; i++) {
        allCases[i] = cases[caseIds[i]];
    }
    return allCases;
}

}
