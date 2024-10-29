import React, { Component } from "react";
import { Input, Card, Button, Form, Table, Space, Tag, message } from "antd";
import QRCode from "qrcode.react"; // Importez la bibliothèque qrcode.react


class Etudiant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      number: "",
      gouvernorat: "",
      cin: "",
      filiere: "",
      id1: [],
      name1: [],
      number1: [],
      gouvernorat1: [],
      statut1: [],
      cin1: [],
      filiere1: [],
      data: [],
      columns: [
        {
          title: "Nom et Prénom",
          dataIndex: "name1",
          align: "center",
        },
        {
          title: "Numero de telephone",
          dataIndex: "number1",
          align: "center",
        },
        {
          title: "Gouvernorat",
          dataIndex: "gouvernorat1",
          align: "center",
        },
        {
          title: "CIN",
          dataIndex: "cin1",
          align: "center",
        },
        {
          title: "Filiere",
          dataIndex: "filiere1",
          align: "center",
        },
        {
          title: "Statut",
          dataIndex: "statut1",
          key: "statut1",
          align: "center",
          render: (statut) => (
            <>
              {statut.map((statut) => {
                let color = "green";
                if (statut === "Desactivee") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={statut}>
                    {statut}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (record) => (
            <Space size={1}>
              <Button
                type="Success"
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .etudiantManage(record.id1, "Desactivee")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.etudiantliste();
                      message.info(record.name1 + " a été Désactivée ! ");
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Désactiver
              </Button>
              <Button
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .etudiantManage(record.id1, "Active")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.etudiantliste();
                      message.info(record.name1 + " a été Activée ! ");
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Activer
              </Button>
            </Space>
          ),
        },
      ],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  downloadQRCode = (value) => {
    const canvas = document.getElementById(`qrcode-${value}`);
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  handleChange = async (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      id: "",
      name: "",
      number: "",
      gouvernorat: "",
      cin: "",
      filiere: "",
    });
  };

  ajouteretudiant = async () => {
    try {
      let result = await this.contract.methods
        .signupetudiant(
          this.state.id,
          this.state.name,
          this.state.number,
          this.state.gouvernorat,
          this.state.cin,
          this.state.filiere
        )
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        this.etudiantliste();
        message.info(this.state.name + " a été ajouté avec succés ! ");
      }
    } catch (error) {
      alert(error);
    }
  };

  etudiantliste = async () => {
    this.setState(() => ({
      data: [],
    }));
    let resultat = await this.contract.methods
      .etudiantliste()
      .call({ from: this.accounts[0] });
    this.setState({
      id1: resultat[0],
      name1: resultat[1],
      number1: resultat[2],
      gouvernorat1: resultat[3],
      statut1: resultat[4],
      cin1: resultat[5],
      filiere1: resultat[6],
    });
    for (let i = 0; i < this.state.id1.length; i++) {
      this.setState((x) => ({
        data: [
          ...x.data,
          {
            key: i,
            id1: x.id1[i],
            name1: x.name1[i],
            number1: x.number1[i],
            gouvernorat1: x.gouvernorat1[i],
            statut1: [x.statut1[i]],
            cin1: x.cin1[i],
            filiere1: x.filiere1[i],
          },
        ],
      }));
    }
  };

  componentDidMount = async () => {
    this.etudiantliste();
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "40%",
            left: "665px",
            top: "70px",
            borderRadius: "7px",
            opacity: 0.7,
          }}
        >
          <h4>Ajouter un etudiant :</h4>
          <br />
          <br />
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Nom et Prenom"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Adresse Ethereum "
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="id"
                value={this.state.id}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Numero de telephone"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="number"
                value={this.state.number}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Gouvernorat"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="gouvernorat"
                value={this.state.gouvernorat}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="CIN"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="cin"
                value={this.state.cin}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Filiere"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="filiere"
                value={this.state.filiere}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
                <Button
                  type="Success"
                  onClick={this.ajouteretudiant.bind(this)}
                >
                  Envoyer
                </Button>
                <Button onClick={this.handleReset.bind(this)}>Annuler</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <br />
        <br />
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "80px",
            borderRadius: "7px",
            opacity: 0.7,
          }}
        >
          <legend>Liste des étudiants :</legend>
          <Table
            columns={[
              ...this.state.columns,
              {
                title: "QR Code",
                dataIndex: "qrcode",
                key: "qrcode",
                align: "center",
                render: (_, record) => (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <QRCode
                      id={`qrcode-${record.id1}`} // Identifiant unique pour chaque code QR
                      value={`${record.name1}, ${record.cin1}, ${record.filiere1}`}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                    <Button onClick={() => this.downloadQRCode(record.id1)} style={{ marginTop: "10px" }}>Télécharger</Button>
                  </div>
                ),
              },
            ]}
            dataSource={this.state.data}
            pagination={{ pageSize: 3 }}
          />
        </Card>
      </>
    );
  }

}
export default Etudiant;
