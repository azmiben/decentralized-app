import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import smartcontract from "./contracts/Main.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import AdministrateurComp from "./Components/AdministrateurComp/AdministrateurComp";
import Professeur from "./Components/AdministrateurComp/professeur";
import Etudiant from "./Components/AdministrateurComp/etudiant";
import ProfesseurComp from "./Components/professeurComp/professeurComp";
import AjouterNote from "./Components/professeurComp/AjouterNote";
import EtudiantComp from "./Components/EtudiantComp/EtudiantComp";
import Dashboard from "./Components/AdministrateurComp/Dashboard";
import Login from "./Components/LoginComp/LoginComp";
import ProtectedRoutes from "./ProtectedRoutes";
import ConsulterNote from "./Components/EtudiantComp/consulterNote";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      accounts: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contractAddr = "0x45FEA78d040a323807BB0C281174FFfD55786869"; // Replace with your contract address
      const contract = new web3.eth.Contract(smartcontract.abi, contractAddr);
      this.setState({ web3, accounts, contract, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false, error: "Failed to load web3, accounts, or contract. Check console for details." });
    }
  };

  render() {
    const { web3, accounts, contract, loading, error } = this.state;

    if (loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login contract={contract} accounts={accounts} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="Administrateur" element={<AdministrateurComp contract={contract} accounts={accounts} />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="editprofesseur" element={<Professeur contract={contract} accounts={accounts} />} />
              <Route path="editetudiant" element={<Etudiant contract={contract} accounts={accounts} />} />
            </Route>
            <Route path="Professeur" element={<ProfesseurComp contract={contract} accounts={accounts} />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="AjouterNote" element={<AjouterNote contract={contract} accounts={accounts} />} />
            </Route>
            <Route path="etudiant" element={<EtudiantComp contract={contract} accounts={accounts} />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="consulterNote" element={<ConsulterNote contract={contract} accounts={accounts}  />} /> 
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }
}

export default App;
