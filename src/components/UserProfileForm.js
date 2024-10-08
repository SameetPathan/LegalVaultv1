import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import DashboardHeading from "./DashboardHeading";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { profileABI, profileAddress } from "./contractAddress";

const UserProfileForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userType, setUserType] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [account, setAccount] = useState(null);

  const [isuserProfile, setisuserProfile] = useState(false);

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber.match(phoneRegex)) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailId.match(emailRegex)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleGetProfile = async (e) => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const ProfileContract = new ethers.Contract(
          profileAddress,
          profileABI,
          signer
        );

        const isprofile = await ProfileContract.userExists(accounts[0]);
        if (isprofile) {
          const profile = await ProfileContract.getProfileById(accounts[0]);
            setisuserProfile(profile);
            setFullName(profile[0]);
            setPhoneNumber(profile[1]);
            setEmailId(profile[2]);
            setUserAddress(profile[3]);
            setUserType(profile[4]);
        } else {
          setisuserProfile([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validatePhoneNumber();
    validateEmail();

    if (!phoneError && !emailError) {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);

      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const ProfileContract = new ethers.Contract(
            profileAddress,
            profileABI,
            signer
          );
          let Txn2;
          if (isuserProfile) {
            Txn2 = await ProfileContract.updateProfile(
              fullName,
              phoneNumber,
              emailId,
              userAddress,
              userType
            );
          } else {
            Txn2 = await ProfileContract.createProfile(
              fullName,
              phoneNumber,
              emailId,
              userAddress,
              userType
            );
          }
          console.log("Mining... please wait");
          await Txn2.wait();
          window.history.back();
          console.log(`Mined`);
          toast.success("Profile saved successfully.");
        } else {
          toast.error(
            "Error While Saving Profile. May be Profile already exists."
          );
          console.log(`Error`);
        }
      } catch (err) {
        toast.error(
          "Error While Saving Profile. May be Profile already exists."
        );
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <DashboardHeading text={"Add Profile"}></DashboardHeading>
      <Container className="mt-5 card">
        <Form onSubmit={handleSubmit} className="card-body">
          <Form.Group as={Row} className="mb-3" controlId="formFullName">
            <Form.Label column sm={2}>
              Full Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
             
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
            <Form.Label column sm={2}>
              Phone Number
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={validatePhoneNumber}
                isInvalid={phoneError.length > 0}
                required
              />
              <Form.Control.Feedback type="invalid">
                {phoneError}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formEmailId">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                onBlur={validateEmail}
                isInvalid={emailError.length > 0}
                required
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formUserAddress">
            <Form.Label column sm={2}>
              User Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter User Address"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formUserType">
            <Form.Label column sm={2}>
              User Type
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="lawyer">Lawyer</option>
                <option value="client">Client</option>
                <option value="master" className="text-danger">Master (Dev Mode)</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {isuserProfile ? (
            <Button variant="danger" type="submit">
              Update Profile (Dev Mode)
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Save Profile
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

export default UserProfileForm;
