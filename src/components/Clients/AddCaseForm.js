import { FaCheck, FaCalendarAlt } from "react-icons/fa";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as rtdbRef, push, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import DashboardHeading from "../DashboardHeading";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { casesABI, casesAddress } from "../contractAddress";

function AddCaseForm(props) {
  const [formData, setFormData] = useState({
    fullName:props.isclient ? props.userDetails[0]:"",
    currentAddress:props.isclient ? props.userDetails[3]:"",
    phoneNumber:props.isclient ? props.userDetails[1]:"",
    caseTitle: "",
    caseDescription: "",
    caseType: "",
    mutationEntries: null,
    deedOfTitle: null,
    noEncumbranceCertificate: null,
    searchReport: null,
    copyOfFIR: null,
    charsheetWithStatementOfWitnesses: null,
    status: "Submitted",
    lawyerDetails: "",
    lawyerAddress: "",
    paymentStatus: "0_3",  
  });
  const [account, setAccount] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files,
    });
  };

  const handleAddSubmit = async (
    caseId,
    fullNameAndPhoneNumber,
    currentAddress,
    titleDescription,
    documents,
    status,
    caseType,
    copyOfFIR,
    lawyerDetails,
    lawyerAddress,
    paymentStatus
  ) => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const caseContract = new ethers.Contract(casesAddress, casesABI, signer);
        let txn;

        txn = await caseContract.addCase(
          caseId,
          fullNameAndPhoneNumber,
          currentAddress,
          titleDescription,
          documents,
          status,
          caseType,
          copyOfFIR,
          lawyerDetails,
          lawyerAddress,
          paymentStatus
        );
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("Case saved successfully.");
        window.history.back();
        
      setFormData({
        fullName: '',
        currentAddress: '',
        phoneNumber: '',
        caseTitle: '',
        caseDescription: '',
        caseType: '',
        mutationEntries: null,
        deedOfTitle: null,
        noEncumbranceCertificate: null,
        searchReport: null,
        copyOfFIR: null,
        charsheetWithStatementOfWitnesses: null,
        status: 'Submitted',
      });
      } else {
        toast.error(
          "Error While Saving Case. Please check your MetaMask connection."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "Error While Saving Case. Please check your MetaMask connection."
      );
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    setFormData({phoneNumber:props.userDetails[1]})
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const storage = getStorage(app);
    const filesToUpload = [
      "mutationEntries",
      "deedOfTitle",
      "noEncumbranceCertificate",
      "searchReport",
      "charsheetWithStatementOfWitnesses",
    ];

    const fileUrls = [];
    const fileUrlsE = {};

    try {
      await Promise.all(
        filesToUpload.map(async (fieldName) => {
          const files = formData[fieldName];
          if (files) {
            const fileArray = Array.from(files);
            await Promise.all(
              fileArray.map(async (file) => {
                const fileRef = storageRef(
                  storage,
                  `Client-Cases/${file.name}`
                );
                await uploadBytes(fileRef, file);
                const fileUrl = await getDownloadURL(fileRef);
                fileUrlsE[fieldName] = fileUrl;
                fileUrls.push(fileUrl);
              })
            );
          }
        })
      );

      // Update the form data with file URLs
      const updatedFormData = {
        ...formData,
        ...fileUrlsE,
        timestamp: new Date().toISOString(),
        status: "Pending Verification",
      };

      const dbRealtime = getDatabase(app);
      //const casesRef = rtdbRef(dbRealtime, "Client-Cases");

      // Push the new case data to the Realtime Database
     // const newCaseRef = push(casesRef);
      //set(newCaseRef, updatedFormData);
      let caseId = '';
      for (let i = 0; i < 10; i++) {
        caseId += Math.floor(Math.random() * 10);
      }

      handleAddSubmit(
        caseId,
        formData.fullName + "_" + formData.phoneNumber,
        formData.currentAddress,
        formData.caseTitle + "_" + formData.caseDescription+"_"+caseId,
        fileUrls,
        "Submitted",
        formData.caseType,
        formData.copyOfFIR,
        formData.lawyerDetails,
        formData.lawyerAddress,
        formData.paymentStatus
      );
      

     // toast.success("Case submitted successfully!");
    } catch (error) {
      console.error("Error submitting case:", error);
      toast.error("Failed to submit case. Please try again later.");
    }
  };

  useEffect(() => {
    console.log("### userDetails:", props.userDetails);
    console.log("### CaseId:", props.CaseId);
  });

  return (
    <>
      <DashboardHeading text={"Add Case"} />
      <div className="container mt-4 card" style={{ marginBottom: "100px" }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              disabled={props.isclient}
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentAddress">Current Address</label>
            <textarea
              className="form-control"
              id="currentAddress"
              disabled={props.isclient}
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              disabled={props.isclient}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caseTitle">Case Title</label>
            <input
              type="text"
              className="form-control"
              id="caseTitle"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caseDescription">Case Description</label>
            <textarea
              className="form-control"
              id="caseDescription"
              name="caseDescription"
              value={formData.caseDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caseType">Case Type</label>
            <select
              className="form-control"
              id="caseType"
              name="caseType"
              value={formData.caseType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Case Type</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Civil suit"> civil suit</option>
              <option value="Criminal case">Criminal case</option>
              <option value="Civil misc applications">civil misc applications</option>
              <option value="Criminal misc applications">criminal misc applications</option>
              <option value="Civil appeal">civil appeal</option>
              <option value="Criminal appeal">criminal appeal</option>
              <option value="Motor accident claim petition(MACP)">motor accident claim petition (M. A. C. P.)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mutationEntries">Mutation Entries</label>
            <input
              type="file"
              className="form-control-file"
              id="mutationEntries"
              name="mutationEntries"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="deedOfTitle">Deed of Title</label>
            <input
              type="file"
              className="form-control-file"
              id="deedOfTitle"
              name="deedOfTitle"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="noEncumbranceCertificate">
              No Encumbrance Certificate
            </label>
            <input
              type="file"
              className="form-control-file"
              id="noEncumbranceCertificate"
              name="noEncumbranceCertificate"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="searchReport">Search Report</label>
            <input
              type="file"
              className="form-control-file"
              id="searchReport"
              name="searchReport"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="copyOfFIR">Copy of FIR</label>
            <input
              type="text"
              className="form-control"
              id="copyOfFIR"
              name="copyOfFIR"
              value={formData.copyOfFIR}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="charsheetWithStatementOfWitnesses">
              Charsheet with Statement of Witnesses
            </label>
            <input
              type="file"
              className="form-control-file"
              id="charsheetWithStatementOfWitnesses"
              name="charsheetWithStatementOfWitnesses"
              onChange={handleFileChange}
              multiple
              
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={true}>
            <FaCheck className="mr-2" />
            Submit Case
          </button>
        </form>
        </div>
      </div>
    </>
  );
}

export default AddCaseForm;
