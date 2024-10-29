import React, { Component } from "react";
import { Card, Button, Space, message, Select, Modal } from "antd";
import Webcam from "react-webcam";
import axios from "axios";

const { Option } = Select;

class AjouterNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      matiere: null,
      note: null,
      notesList: null,
      qrCodeData: null, // CIN extracted from QR code
      listeConcatenee: [],
      showModal: false, // État pour gérer l'affichage de la modal de confirmation
    };
    this.webcamRef = React.createRef();
  }

  capture = () => {
    if (this.webcamRef.current) {
      const imageSrc = this.webcamRef.current.getScreenshot();
      this.setState({ imageSrc });
    } else {
      console.warn("Webcam not yet initialized. Please wait a moment.");
    }
  };

  sendCapture = async () => {
    const { imageSrc, matiere, note } = this.state;
    const { contract } = this.props;

    if (imageSrc && matiere) {
      try {
        const response = await axios.post("http://192.168.43.184:5000/upload", {
          image: imageSrc, // Image sous forme de Data URL
          matiere: matiere, // Matière sélectionnée
        });

        if (response.status === 200) {
          const { note, cin, listeConcatenee } = response.data;

          // Afficher la prédiction avant de continuer
          this.setState({ note, qrCodeData: cin, listeConcatenee });

          // Ouvrir une modal pour demander la confirmation de l'utilisateur
          this.setState({ showModal: true });

        }
      } catch (error) {
        message.error("Failed to send capture: " + (error.response ? error.response.data : error.message));
        console.error("Error sending capture:", error);
      }
    } else {
      message.error("No capture or matiere to send!");
    }
  };

  handleTransactionConfirm = async () => {
    const { note, matiere, qrCodeData: cin } = this.state;
    const { contract } = this.props;

    try {
      // Confirmer la transaction blockchain après confirmation utilisateur
      const notesList = await contract.methods
        .setNote(parseInt(note * 100), matiere, cin)
        .send({ from: this.props.accounts[0] });
      
      message.success("Transaction successful and capture sent!");
    } catch (error) {
      message.error("Failed to confirm transaction: " + error.message);
    }

    // Fermer la modal après la transaction
    this.setState({ showModal: false });
  };

  handleTransactionCancel = () => {
    // Fermer la modal si l'utilisateur annule
    this.setState({ showModal: false });
    message.info("Transaction cancelled.");
  };

  retakeCapture = () => {
    this.setState({ imageSrc: null, note: null, qrCodeData: null });
  };

  handleSubjectChange = (value) => {
    this.setState({ matiere: value });
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "50%",
            left: "25%",
            top: "70px",
            borderRadius: "7px",
            opacity: 1,
          }}
        >
          <legend>Ajouter une note :</legend>
          <Select
            placeholder="Sélectionnez une matière"
            onChange={this.handleSubjectChange}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Option value="python">Python</Option>
            <Option value="mldl">ML&DL</Option>
            <Option value="se">SE</Option>
          </Select>
          {this.state.imageSrc ? (
            <img src={this.state.imageSrc} alt="Capture" style={{ width: "100%" }} />
          ) : (
            <Webcam
              audio={false}
              ref={this.webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
            />
          )}
          <Space size="middle" style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={this.capture}>
              Capture
            </Button>
            <Button type="primary" onClick={this.sendCapture}>
              Envoyer
            </Button>
            <Button type="default" onClick={this.retakeCapture}>
              Reprendre
            </Button>
          </Space>
          {this.state.note && (
            <div style={{ marginTop: "20px" }}>
              <strong>Résultat de la prédiction :</strong> {this.state.note}
            </div>
          )}
         
        </Card>

        {/* Modal de confirmation */}
        <Modal
          title="Confirmation de la transaction"
          visible={this.state.showModal}
          onOk={this.handleTransactionConfirm}
          onCancel={this.handleTransactionCancel}
        >
          <p>Note prédite : {this.state.note}</p>
          
          <p>Voulez-vous confirmer la transaction sur la blockchain ?</p>
        </Modal>
      </>
    );
  }
}

export default AjouterNote;
