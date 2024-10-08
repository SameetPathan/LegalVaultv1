export const profileAddress = "0xaA506339b3084318C32ed25B16627c0A783c2AA6"
export const profileABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_emailId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userType",
				"type": "string"
			}
		],
		"name": "createProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userId",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userType",
				"type": "string"
			}
		],
		"name": "ProfileCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userId",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userType",
				"type": "string"
			}
		],
		"name": "ProfileUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_emailId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userType",
				"type": "string"
			}
		],
		"name": "updateProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAddress",
				"type": "address"
			}
		],
		"name": "updateUserAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allProfileIds",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProfileIds",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProfiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phoneNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "emailId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userType",
						"type": "string"
					}
				],
				"internalType": "struct UserProfile.Profile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userId",
				"type": "address"
			}
		],
		"name": "getProfileById",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "profiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "emailId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


//export const casesAddress = "0xC68701E6DB7a76f8CAbC24aD2Fc29D2742d28115"; // for testing
export const casesAddress = "0x86054961ED808c6501ED83580ccf4E6E4563741E8d";// "0x63a377cD41419e8f95aDd36d13c1EB450232ff26";
export const casesABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "caseId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newStatus",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "updater",
				"type": "address"
			}
		],
		"name": "CaseStatusUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "caseId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newLawyerDetails",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newLawyerAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newStatus",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "updater",
				"type": "address"
			}
		],
		"name": "LawyerDetailsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "caseId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NewCaseAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "caseId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newPaymentStatus",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "updater",
				"type": "address"
			}
		],
		"name": "PaymentStatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_caseId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fullNameAndPhoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_currentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_titleDescription",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_documents",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_caseType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_copyOfFIR",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lawyerDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lawyerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_paymentStatus",
				"type": "string"
			}
		],
		"name": "addCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "caseIds",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "cases",
		"outputs": [
			{
				"internalType": "string",
				"name": "fullNameAndPhoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "currentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "titleDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caseType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "copyOfFIR",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lawyerDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lawyerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "paymentStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCaseIds",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCases",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullNameAndPhoneNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "currentAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "titleDescription",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "documents",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "caseType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "copyOfFIR",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lawyerDetails",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lawyerAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "paymentStatus",
						"type": "string"
					}
				],
				"internalType": "struct CaseManagement.Case[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_caseId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newStatus",
				"type": "string"
			}
		],
		"name": "updateCaseStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_caseId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newLawyerDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newLawyerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newStatus",
				"type": "string"
			}
		],
		"name": "updateLawyerDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_caseId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newPaymentStatus",
				"type": "string"
			}
		],
		"name": "updatePaymentStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];