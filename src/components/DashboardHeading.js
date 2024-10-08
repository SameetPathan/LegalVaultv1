import React,{useEffect,useState} from 'react'
import { ethers } from "ethers";
import { profileABI, profileAddress } from './contractAddress';


function DashboardHeading(props) {

  const [account, setAccount] = useState(null);
  const [userType, setUserType] = useState("");
  const [isuserProfile, setisuserProfile] = useState(false);

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
            setUserType(profile[4]);
        } else {
          setisuserProfile([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className={`alert  ${userType === "client" ? 'alert-success' : 'alert-primary'}`} role="alert">
        {props.text}
  </div>
  )
}

export default DashboardHeading