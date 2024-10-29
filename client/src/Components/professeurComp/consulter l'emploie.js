// Listedesoffresp.js

import React, { Component } from "react";
import { Card } from "antd";
import Table from "react-bootstrap/esm/Table";
import Emploi from "./Emploi"; // Assurez-vous de spécifier le bon chemin pour importer le composant Emploi

class Listedesoffresp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: [],
      longitude: [],
      latitude: [],
      duree_dispo: [],
      date_debut: [],
      etudiant_name: [],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    let result = await this.contract.methods
      .getOffre()
      .call({ from: this.accounts[0] });
    this.setState({
      n: result[0],
      longitude: result[1],
      latitude: result[2],
      duree_dispo: result[3],
      date_debut: result[4],
      reservation: result[5],
      etudiant_name: result[6],
    });
    var table1 = document.getElementById("Table1");
    for (var j = 0; j < this.state.n.length; j++) {
      var row_1 = table1.insertRow(1);
      var cell_1 = row_1.insertCell(0);
      var cell_2 = row_1.insertCell(1);
      var cell_4 = row_1.insertCell(2);
      var cell_5 = row_1.insertCell(3);
      var cell_6 = row_1.insertCell(4);
      var cell_7 = row_1.insertCell(5);
      var cell_8 = row_1.insertCell(6);
      cell_1.innerHTML = this.state.n[j];
      cell_2.innerHTML = this.state.longitude[j];
      cell_4.innerHTML = this.state.latitude[j];
      cell_5.innerHTML = this.state.duree_dispo[j];
      cell_6.innerHTML = this.state.date_debut[j];
      cell_7.innerHTML = this.state.reservation[j];
      cell_8.innerHTML = this.state.etudiant_name[j];
    }
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "70px",
            borderRadius: "7px",
            opacity:0.7,
          }}
        >
          <legend>Liste des offres :</legend>
          <Table id="Table1" striped bordered hover>
            <thead>
              <tr>
                <th>N°</th>
                <th>Longitude :</th>
                <th>Latitude :</th>
                <th>Durée de disponibilté :</th>
                <th>Date de début :</th>
                <th>Reservation :</th>
                <th>Nom du etudiant :</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
        </Card>
        {/* Utilisez le composant Emploi ici */}
        <Emploi />
      </>
    );
  }
}
export default Listedesoffresp;
