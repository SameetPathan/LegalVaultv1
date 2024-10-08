import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ForceLogin from './components/ForceLogin';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserHandler from './components/UserHandler';
import ClientHome from './components/Clients/ClientHome';
import LawyerHome from './components/Lawyers/LawyerHome';
import AddCaseForm from './components/Clients/AddCaseForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewCases from './components/Lawyers/ViewCases';
import AddDocuments from './components/Clients/AddDocuments';
import ViewDocuments from './components/Clients/ViewDocuments';
import UserProfileForm from './components/UserProfileForm';
import CaseView from './components/Clients/CaseView';
import ChatComponent from './components/Chats';
import { ethers } from "ethers";
import { profileABI, profileAddress } from './components/contractAddress';
import ViewPickedCases from './components/Lawyers/ViewPickedCases';



 
function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentBalance, setCurrentBalanace] = useState(null);
  const [userDetails, setuserDetails] = useState([]);
  const [account, setAccount] = useState(null);
  const [currentCase, setcurrentCase] = useState("");
  const [currentCaseName, setcurrentCaseName] = useState("");

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

        if(isprofile){
          const profile = await ProfileContract.getProfileById(accounts[0]);
          setuserDetails(profile)
          //setUserProfile(profile);
        }else{
          //setUserProfile([]);
        }
        
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  
  }, []);

  return <>
  <div>

    <div className="App" >
        
       

          {currentAccount?
            <Router>
         
            
            <Navbar userDetails={userDetails} setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbar>
            
            <div>
           
              <Routes> 
               
                 <Route exact path='/' element={ <UserHandler setuserDetails={setuserDetails} userDetails={userDetails}></UserHandler>}></Route>
                 <Route exact path='/profile' element={<UserProfileForm ></UserProfileForm>}></Route>
                 <Route exact path='/client' element={ <ClientHome ></ClientHome>}></Route>
                 <Route exact path='/lawyer' element={<LawyerHome></LawyerHome>}></Route>
                 <Route exact path='/admin' element={<ViewDocuments userId={"sameet"} userType={"admin"}></ViewDocuments>}></Route>
                 <Route exact path='/client-add-case' element={<AddCaseForm isclient={userDetails[4]==="client"} userDetails={userDetails}> </AddCaseForm>}></Route>
                 <Route exact path='/client-case-status' element={<CaseView setcurrentCase={setcurrentCase} userDetails={userDetails} setcurrentCaseName={setcurrentCaseName}></CaseView>}></Route>
                 <Route exact path='/lawyer-case-view' element={<ViewCases setcurrentCase={setcurrentCase} userDetails={userDetails}></ViewCases>}></Route>
                 <Route exact path='/lawyer-picked-case-view' element={<ViewPickedCases setcurrentCase={setcurrentCase} setcurrentCaseName={setcurrentCaseName} userDetails={userDetails}></ViewPickedCases>}></Route>
                 <Route exact path='/client-add-document' element={<AddDocuments></AddDocuments>}></Route>
                 <Route exact path='/client-view-document' element={<ViewDocuments userId={"sameet"} userType={"normal"}></ViewDocuments>}></Route>

                 <Route exact path='/chat' element={<ChatComponent userDetails={userDetails} currentCaseName={currentCaseName} currentCase={currentCase}></ChatComponent>}></Route>

              </Routes>
            </div>
          
              
            <Footer></Footer>
    
          </Router>
           
          :
          <Router>
              <Navbar setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbar>
              <>
                <Routes> 
                  <Route exact path='/' element={<ForceLogin></ForceLogin>}></Route>
                  <Route exact path='*' element={<ForceLogin></ForceLogin>}></Route>
                </Routes>
              </>
                <Footer></Footer>
              </Router>
            
        }
        <ToastContainer />
        </div>
        </div>
  
  </>;
}

export default App;






