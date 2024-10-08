import React from 'react';
import { FaPlus, FaFile, FaCheck } from 'react-icons/fa';
import DashboardHeading from '../DashboardHeading';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';

function ClientHome() {
  return (
    <>
    <DashboardHeading text={"Welcome to Client Home"}></DashboardHeading>
    <div className="container mt-4">
      
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Case</h5>
              <p className="card-text">Click below to add a new case</p>
              <Link to="/client-add-case" className="btn btn-dark">
                <FaPlus className="mr-2" />
                Add Case
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Check Case Status</h5>
            <p className="card-text">Click below to check the status of your case</p>
            <Link to="/client-case-status" className="btn btn-dark">
            <FaCheck className="mr-2" />
            Case status
              </Link>
          </div>
        </div>
      </div>
       {/* <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Documents</h5>
              <p className="card-text">Click below to add new documents</p>
              <Link to="/client-add-document" className="btn btn-success">
                <FaFile className="mr-2" />
                Add Documents
              </Link>
              
            </div>
          </div>
        </div>
  */}
        
      </div>

     {/*
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Check Case Status</h5>
              <p className="card-text">Click below to check the status of your case</p>
              <button className="btn btn-info">
                <FaCheck className="mr-2" />
                Check Status
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Check Document Verification Status</h5>
              <p className="card-text">Click below to check the status of document verification</p>
              <Link to="/client-view-document" className="btn btn-warning">
              <FaCheck className="mr-2" />
              Check Status
            </Link>
             
            </div>
          </div>
        </div>
      </div>

    */}
    </div>
    </>
  );
}

export default ClientHome;
