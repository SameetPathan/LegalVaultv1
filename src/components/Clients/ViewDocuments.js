import React, { useState, useEffect } from 'react';
import { FaFile, FaCheck, FaTimes } from 'react-icons/fa';
import { getDatabase, ref as rtdbRef, onValue, update } from 'firebase/database';
import { app } from '../../firebaseConfig';

function ViewDocuments(props) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const database = getDatabase(app);
    const documentsRef = rtdbRef(database, 'Client-documents');

    // Listen for changes to the documents in the database
    const unsubscribe = onValue(documentsRef, (snapshot) => {
      const documentsData = snapshot.val();

      if (documentsData) {
        // Convert the object of documents into an array
        const documentsArray = Object.entries(documentsData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setDocuments(documentsArray);
      } else {
        setDocuments([]);
      }
    });

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
  }, [props.userId]);

  const handleStatusChange = (documentId, newStatus) => {
    const database = getDatabase(app);
    const documentsRef = rtdbRef(database, `Client-documents/${documentId}`);
  
    // Use an object with the correct path and the new status value
    const updates = {
      status: newStatus,
    };
  
    update(documentsRef, updates)
      .then(() => {
        // Update successful
        console.log('Status updated successfully');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating status:', error.message);
      });
  };

  return (
    <div className="card container mt-4">
      <div className="card-body">
        <h5 className="card-title">View Documents Details</h5>
        <p className="card-text">Click below to view and manage documents</p>
        <hr></hr>
        {documents.map((document) => (
          <div key={document.id} className="mb-3">
            <h6>{document.name}</h6>
            <p>Phone Number: {document.phoneNumber}</p>
            <p>Status: {document.status}</p>
            <p>
              Document URL:{' '}
              <a href={document.documentUrl} target="_blank" rel="noopener noreferrer">
                <FaFile className="mr-1" />
                View Document 
              </a>
            </p>
            <hr></hr>
            {props.userType === "admin" && (
            <div className="btn-group">
              <button
                className="btn btn-success"
                onClick={() => handleStatusChange(document.id, 'Approved')}
              >
                <FaCheck className="mr-1" />
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleStatusChange(document.id, 'Rejected')}
              >
                <FaTimes className="mr-1" />
                Reject
              </button>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDocuments;
