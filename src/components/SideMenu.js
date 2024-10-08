import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaList, FaBriefcase, FaFileAlt, FaUser, FaSearch } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const SideMenu = (props) => {
  return (
    <Nav className="flex-column bg-dark py-4 px-3" style={{ position: 'fixed', zIndex: 1000, left: 0, top: 151, height: '380px', width: "280px" }}>
      

    <hr style={{ borderTop: '1px solid white', margin: '10px 0' }} /> 

    {props.userDetails[4]==="client" ?<Nav.Link className="text-light">
    <FaBriefcase className="mr-2" />
    <Link
    to="/client-case-status" style={{color:"white"}}>
    My cases</Link>
  </Nav.Link> :<Nav.Link  className="text-light">
  <FaList className="mr-2" />
  <Link
    to="/lawyer-picked-case-view" style={{color:"white"}}>
  Case Cause List</Link>
</Nav.Link> }
      

      
     

      <hr style={{ borderTop: '1px solid white', margin: '10px 0' }} />
      <Nav.Link href="#pricing" className="text-light">
        <FaFileAlt className="mr-2" />
        <Link
        to="/client-add-case" style={{color:"white"}}>
        E-Filing</Link>
      </Nav.Link>

      {props.userDetails[4]==="lawyer" && (
        <>
      <hr style={{ borderTop: '1px solid white', margin: '10px 0' }} />
      <Nav.Link target='_blank' href="https://ecourts.gov.in/ecourts_home/static/informationletter.php" className="text-light">
        <FaUser className="mr-2" />
        Form for Advocates
      </Nav.Link></>
  )}

      <hr style={{ borderTop: '1px solid white', margin: '10px 0' }} />
      <Nav.Link href="#pricing" className="text-light">
        <FaSearch className="mr-2" />
        <Link
        to={props.userDetails[4]==="client"?"/client-case-status":"/lawyer-picked-case-view"} style={{color:"white"}}>
        Search by Case Number</Link>
      </Nav.Link>
      <hr style={{ borderTop: '1px solid white', margin: '10px 0' }} />
    </Nav>
  );
};

export default SideMenu;
