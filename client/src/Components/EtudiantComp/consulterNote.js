import React, { Component } from "react";
import { Table, Card } from "antd";

class ConsulterNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCIN: "",
      notesList: [], // Tableau pour stocker les notes récupérées depuis la blockchain
    };
  }

  async componentDidMount() {
    try {
      const { contract } = this.props;
  
      if (!contract) {
        throw new Error("Contract not loaded");
      }
  
      // Récupérer le CIN de l'étudiant connecté
      const userCIN = await contract.methods.etudiantCin().call({ from: this.props.accounts[0] });
      console.log("User CIN from Blockchain:", userCIN);
  
      // Récupérer les notes depuis le contrat Ethereum
      const notesList = await contract.methods.getNotes().call();
      console.log("Notes List from Blockchain:", notesList);
  
      // Filtrer les notes pour ne garder que celles de l'étudiant connecté
      const filteredNotesList = notesList.filter(note => note.cin.toString() === userCIN.toString());
  
      // Structurer les données pour ne garder que la dernière note pour chaque matière
      const latestNotes = filteredNotesList.reduce((acc, note) => {
        const noteValue = note.note / 100;
  
        // Remplacer la note pour la matière sans comparer
        acc[note.matiere] = { ...note, note: noteValue };
  
        return acc;
      }, {});
  
      const formattedNotesList = Object.values(latestNotes).map((note, index) => ({
        key: index.toString(), // Utilisez une clé unique appropriée (ici l'index)
        matiere: note.matiere,
        note: note.note.toFixed(2), // Afficher avec deux décimales
        cin: note.cin.toString(), // Convertir en string
      }));
  
      this.setState({ userCIN, notesList: formattedNotesList });
    } catch (error) {
      console.error("Error loading grades:", error.message);
    }
  }

  render() {
    const { notesList } = this.state;

    const columns = [
      {
        title: 'Matière',
        dataIndex: 'matiere',
        key: 'matiere',
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
      },
    ];

    return (
      <Card
        style={{
          position: "relative",
          width: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          top: "70px",
          borderRadius: "7px",
          opacity: 0.7,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Notes des Étudiants</h2>
        <Table columns={columns} dataSource={notesList} />
      </Card>
    );
  }
}

export default ConsulterNote;
