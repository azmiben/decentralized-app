import React, { Component } from "react";
import { Input, Card, Button, Form, Table, Space, Tag, message } from "antd";

class Professeur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      number: "",
      gouvernorat: "",
      id1: [],
      name1: [],
      number1: [],
      gouvernorat1: [],
      statut1: [],
      data: [],
      columns: [
        {
          title: "Nom et Prénom",
          dataIndex: "name1",
          align: "center",
        },
        {
          title: "Numero de téléphone",
          dataIndex: "number1",
          align: "center",
        },
        {
          title: "Gouvernorat",
          dataIndex: "gouvernorat1",
          align: "center",
        },
        {
          title: "Statut",
          key: "statut1",
          dataIndex: "statut1",
          render: (statut1) => (
            <>
              {statut1.map((tag) => {
                let color = tag === "Desactivee" ? "volcano" : "green";
                return (
                  <Tag color={color} key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </>
          ),
          align: "center",
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (record) => (
            <Space size="small">
              <Button
                type="primary"
                shape="round"
                onClick={async () => {
                  try {
                    let result = await this.props.contract.methods
                      .professeurManage(record.id1, "Desactivee")
                      .send({ from: this.props.accounts[0] });
                    if (result.status) {
                      this.professeurliste();
                      message.info(record.name1 + " a été Désactivée !");
                    }
                  } catch (error) {
                    alert(error.message);
                  }
                }}
              >
                Désactiver
              </Button>
              <Button
                shape="round"
                onClick={async () => {
                  try {
                    let result = await this.props.contract.methods
                      .professeurManage(record.id1, "Active")
                      .send({ from: this.props.accounts[0] });
                    if (result.status) {
                      this.professeurliste();
                      message.info(record.name1 + " a été Activée !");
                    }
                  } catch (error) {
                    alert(error.message);
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

  componentDidMount = async () => {
    await this.professeurliste();
  };

  handleChange = (event) => {
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
    });
  };

  addprofesseur = async () => {
    try {
      let result = await this.props.contract.methods
        .signupprofesseur(
          this.state.id,
          this.state.name,
          this.state.number,
          this.state.gouvernorat
        )
        .send({ from: this.props.accounts[0] });

      if (result.status) {
        this.professeurliste();
        message.info(this.state.name + " a été ajouté avec succès !");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  professeurliste = async () => {
    this.setState({ data: [] });
    try {
      let resultat = await this.props.contract.methods
        .professeurliste()
        .call({ from: this.props.accounts[0] });

      console.log("Resultat:", resultat);

      this.setState({
        id1: resultat[0],
        name1: resultat[1],
        number1: resultat[2],
        gouvernorat1: resultat[3],
        statut1: resultat[4],
      });

      const data = resultat[0].map((id, index) => ({
        key: index,
        id1: id, // Keep this for action handling
        name1: resultat[1][index],
        number1: resultat[2][index],
        gouvernorat1: resultat[3][index],
        statut1: [resultat[4][index]],
      }));

      this.setState({ data });
    } catch (error) {
      console.error("Error fetching professeur list:", error);
    }
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
          <h4>Ajouter un professeur :</h4>
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
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Adresse Ethereum"
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
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Numero de téléphone"
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
                <Button type="primary" onClick={this.addprofesseur}>
                  Envoyer
                </Button>
                <Button onClick={this.handleReset}>Annuler</Button>
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
          <legend>Liste des professeurs :</legend>
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </>
    );
  }
}

export default Professeur;
