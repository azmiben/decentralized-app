// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Main {
    address public Admin = 0x0Fcb6520a6339e641b561cb0971d0756CCeaE931;
    mapping(address => _Admin) internal Admins;
    mapping(address => _professeur) internal professeurs;
    mapping(address => _etudiant) internal etudiants;
    mapping(uint256 => Note) public notes;

    Note[] public notesList;

    struct _Admin {
        address Admin_id;
        string name;
    }

    struct _professeur {
        address professeur_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
    }

    struct _etudiant {
        address etudiant_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
        uint32 cin;
        string filiere;
    }

    struct Note {
        uint256 note;
        string matiere;
        uint256 cin;
    }
    
    event NoteAdded(uint256 indexed note, string indexed matiere, uint256 indexed cin);

    uint32[] Number;
    address[] etudiantlist;
    address[] professeurlist;

    constructor() { 
       Admins[Admin].name = "Azmi bennaceur";
    }

    function signupprofesseur(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        require(professeurs[_id].professeur_id == address(0), "Adresse deja utilisee");
        professeurs[_id] = _professeur({
            professeur_id: _id,
            name: _name,
            phonenumber: _phonenumber,
            gouvernorat: _gouvernorat,
            statut: "Active"
        });
        professeurlist.push(_id);
    }

    function signupetudiant(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat,
        uint32 _cin,
        string memory _filiere
    ) public {
        require(etudiants[_id].etudiant_id == address(0), "Adresse deja utilisee");
        etudiants[_id] = _etudiant({
            etudiant_id: _id,
            name: _name,
            phonenumber: _phonenumber,
            gouvernorat: _gouvernorat,
            statut: "Active",
            cin: _cin,
            filiere: _filiere
        });
        etudiantlist.push(_id);
    }

    function professeurManage(address _id, string calldata _statut) external {
        professeurs[_id].statut = _statut;
    }

    function etudiantManage(address _id, string calldata _statut) external {
        etudiants[_id].statut = _statut;
    }

    function isAdminExist() external view returns (string memory) {
        if (msg.sender == Admin) {
            return "true";
        } else {
            return "false";
        }
    }

    function isprofesseurExist() external view returns (string memory) {
        _professeur storage p = professeurs[msg.sender];
        if (
            (p.professeur_id > address(0x0)) &&
            (keccak256(abi.encodePacked(p.statut)) ==
                keccak256(abi.encodePacked("Active")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    function isetudiantExist() external view returns (string memory) {
        _etudiant storage l = etudiants[msg.sender];
        if (
            (l.etudiant_id > address(0x0)) &&
            (keccak256(abi.encodePacked(l.statut)) ==
                keccak256(abi.encodePacked("Active")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    function AdministrateurName() external view returns (string memory) {
        return Admins[msg.sender].name;
    }

    function professeurName() external view returns (string memory) {
        return professeurs[msg.sender].name;
    }

    function etudiantName() external view returns (string memory) {
        return etudiants[msg.sender].name;
    }

    function etudiantCin() external view returns (uint256 ) {
        return etudiants[msg.sender].cin;
    }

    function setNote(
        uint32 _note,
        string memory _matiere,
        uint256 _cin
    ) public {
        require(_note > 0, "Note must be greater than 0");
        require(bytes(_matiere).length > 0, "Matiere is required");
        require(_cin > 0, "CIN must be positive");

        Note memory newNote = Note({
            note: _note,
            matiere: _matiere,
            cin: _cin
        });

        notes[_cin] = newNote;
        notesList.push(newNote); // Push the new note to the array

        emit NoteAdded(_note, _matiere, _cin); // Emit the NoteAdded event
    }

    function getNotes() external view returns (Note[] memory) {
        return notesList;
    }

   

    function etudiantliste()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](etudiantlist.length);
        string[] memory name = new string[](etudiantlist.length);
        uint32[] memory phonenumber = new uint32[](etudiantlist.length);
        string[] memory gouvernorat = new string[](etudiantlist.length);
        string[] memory statut = new string[](etudiantlist.length);
        uint32[] memory cin = new uint32[](etudiantlist.length);
        string[] memory filiere = new string[](etudiantlist.length);

        for (uint256 i = 0; i < etudiantlist.length; i++) {
            if (msg.sender == Admin) {
                id[i] = etudiantlist[i];
                name[i] = etudiants[etudiantlist[i]].name;
                phonenumber[i] = etudiants[etudiantlist[i]].phonenumber;
                gouvernorat[i] = etudiants[etudiantlist[i]].gouvernorat;
                statut[i] = etudiants[etudiantlist[i]].statut;
                cin[i] = etudiants[etudiantlist[i]].cin;
                filiere[i] = etudiants[etudiantlist[i]].filiere;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(etudiants[etudiantlist[i]].statut)
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = etudiantlist[i];
                    name[i] = etudiants[etudiantlist[i]].name;
                    phonenumber[i] = etudiants[etudiantlist[i]]
                        .phonenumber;
                    gouvernorat[i] = etudiants[etudiantlist[i]]
                        .gouvernorat;
                    cin[i] = etudiants[etudiantlist[i]].cin;
                    filiere[i] = etudiants[etudiantlist[i]].filiere;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut, cin, filiere);
    }

    function professeurliste()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](professeurlist.length);
        string[] memory name = new string[](professeurlist.length);
        uint32[] memory phonenumber = new uint32[](professeurlist.length);
        string[] memory gouvernorat = new string[](professeurlist.length);
        string[] memory statut = new string[](professeurlist.length);
        for (uint256 i = 0; i < professeurlist.length; i++) {
            if (msg.sender == Admin) {
                id[i] = professeurlist[i];
                name[i] = professeurs[professeurlist[i]].name;
                phonenumber[i] = professeurs[professeurlist[i]].phonenumber;
                gouvernorat[i] = professeurs[professeurlist[i]].gouvernorat;
                statut[i] = professeurs[professeurlist[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(
                            professeurs[professeurlist[i]].statut
                        )
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = professeurlist[i];
                    name[i] = professeurs[professeurlist[i]].name;
                    phonenumber[i] = professeurs[professeurlist[i]]
                        .phonenumber;
                    gouvernorat[i] = professeurs[professeurlist[i]]
                        .gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }
}
