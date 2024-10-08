import { useEffect, useState } from "react";
import { getDatabase, ref as rtdbRef, onValue } from "firebase/database";
import { app } from "../../firebaseConfig";
import DashboardHeading from "../DashboardHeading";
import CaseCard from "../CaseCard";
import { ethers } from "ethers";
import { casesABI, casesAddress } from "../contractAddress";

var arraylist = [];
var whole = [];
var CaseIds = [];

function ViewCases(props) {
  const [cases, setCases] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [w, setw] = useState([]);
  const [keyword, setKeyword] = useState("");
  async function getAllproducts() {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const caseContract = new ethers.Contract(
          casesAddress,
          casesABI,
          signer
        );
        arraylist = await caseContract.getAllCases();
        CaseIds = await caseContract.getAllCaseIds();

        for (var i = 0; i < arraylist.length; i++) {
          whole[i] = arraylist[i];
        }
        setw(whole);
        setCases(whole);
        setFilteredProducts(whole);
        //console.log("### Ether Cases Data : ", whole);
        //console.log("caseIDS:", CaseIds);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <>
      <DashboardHeading text={"View Cases"} />
      <div className="container-fluid mt-4" style={{ marginBottom: "30%" }}>

      <div class=" container input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search By Case Number</span>
      </div>
      <input type="text" class="form-control"  onChange={(e) => setKeyword(e.target.value)} value={keyword} placeholder="Case number" aria-label="Case Number" aria-describedby="basic-addon1"/>
    </div>

        <div className="row">
          {cases
            .filter((caseData) => {
              const caseString = JSON.stringify(caseData).toLowerCase();
              return caseString.includes(keyword.toLowerCase());
            }).map(
            (
              caseData,
              index 
            ) => (
              <div key={caseData.id} className="col-md-4">
                <CaseCard
                  hideSensative={false}
                  showclose={false}
                  showtake={true}
                  isclient={false}
                  setcurrentCase={props.setcurrentCase}
                  caseData={caseData}
                  CaseId={CaseIds[index]}
                  userDetails={props.userDetails}
                />{" "}
               
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ViewCases;
