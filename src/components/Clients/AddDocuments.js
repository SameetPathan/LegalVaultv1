import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { getDatabase, ref as rtdbRef, push, set } from 'firebase/database';
import { app } from '../../firebaseConfig';
import { toast } from 'react-toastify';

function AddDocuments() {
    const [documentName, setDocumentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [documentFiles, setDocumentFiles] = useState([]);
  
    const handleFileChange = (e) => {
      // Update the state with the selected files
      setDocumentFiles(Array.from(e.target.files));
    };
  
    const handleAddDocument = async () => {
      try {
        // Check if files are selected
        if (documentFiles.length === 0) {
          toast.error('Please select at least one document file');
          return;
        }
  
        // Upload documents to Firebase Storage
        const storage = getStorage(app);
  
        const filePromises = documentFiles.map(async (file) => {
          const fileRef = storageRef(storage, `Client-documents/${file.name}`);
          await uploadBytes(fileRef, file);
          return getDownloadURL(fileRef);
        });
  
        const fileUrls = await Promise.all(filePromises);
  
        // Store document information in the real-time database
        const dbRealtime = getDatabase(app);
        const casesRef = rtdbRef(dbRealtime, 'Client-documents');
        let userId = "sameet"
        const caseData = {
          userId,
          name: documentName,
          phoneNumber,
          status: 'Pending',
          documentUrl: fileUrls,
        };
  
        const newCaseRef = push(casesRef);
        set(newCaseRef, caseData);
  
        toast.success('Documents submitted successfully. Please wait for verification.');
  
        // Reset form fields
        setDocumentName('');
        setPhoneNumber('');
        setDocumentFiles([]);
      } catch (error) {
        toast.error('Error adding documents.');
        console.error('Error adding documents:', error.message);
      }
    };

  return (
    <div className="card container mt-4">
      <div className="card-body">
        <h5 className="card-title">Add Documents</h5>
        <p className="card-text">Click below to add new documents</p>
        <div className="form-group">
          <label htmlFor="documentName">Document Name:</label>
          <input
            type="text"
            id="documentName"
            className="form-control"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="documentFile">Select Document:</label>
          <input
            type="file"
            id="documentFile"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-success" onClick={handleAddDocument}>
          <FaFile className="mr-2" />
          Add Documents
        </button>
      </div>
    </div>
  );
}

export default AddDocuments;
