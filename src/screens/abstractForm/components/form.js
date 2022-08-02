
import React, { useState } from 'react'
import { TextField, Select, MenuItem, InputLabel, Divider, Typography, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

let dataTemplate = {
    abstractTitle: "",
    chooseATheme: "",
    leadAuthor: {
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    },
    affiliation: "",
    nameOfUniversityCorporation: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    country: "",
    zipOrPostal: "",
    secondaryAuthors: [
        {
            firstName: "",
            lastName: "",
            affiliation: ""
        },
    ]
}

const authorInitialState = {
    firstName: "",
    lastName: "",
    affiliation: ""
}

const Form = () => {

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [affiliation, setAffiliation] = React.useState('');
    const handleAffiliation = (event) => {
        setAffiliation(event.target.value);
    };

    const [secondaryAuthor, setSecondaryAuthor] = useState(authorInitialState)

    const [secondaryAuthors, setSecondaryAuthors] = useState([])

    console.log(secondaryAuthor)
    // console.log(secondaryAuthors)


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <TextField id="standard-basic" label="Abstract title" variant="standard" style={{ marginTop: 20 }} required />

            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 40 }} required>
                <InputLabel id="demo-simple-select-standard-label" >Theme</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Theme"
                    style={{ marginInline: 20 }}
                >
                    <MenuItem value={10}>Alternative Approaches in Peptide Administration</MenuItem>
                    <MenuItem value={20}>Commercial Synthesis & Formulation of Peptides</MenuItem>
                    <MenuItem value={30}>Complementary Pharmacology of Peptides, Proteins & Conventional Drugs</MenuItem>
                    <MenuItem value={30}>Peptide Immunogenicity & Toxicology</MenuItem>
                    <MenuItem value={30}>Peptide Synthetic Methodologies</MenuItem>
                    <MenuItem value={30}>Peptide Therapeutics & Related Bioactive Molecules</MenuItem>
                    <MenuItem value={30}>Peptides as Diagnostics, Probes & Biomarkers</MenuItem>
                    <MenuItem value={30}>Peptidomics & Peptide Discovery</MenuItem>
                    <MenuItem value={30}>Pharmacokinetics, Biodistribution & Cellular Transport</MenuItem>
                </Select>
                <InputLabel id="affiliation">Affiliation</InputLabel>
                <Select
                    labelId="affiliation"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleAffiliation}
                    label="Affiliation"
                    style={{ marginInline: 20 }}
                >
                    <MenuItem value={10}>University</MenuItem>
                    <MenuItem value={20}>Laboratory</MenuItem>
                    <MenuItem value={30}>Corporate</MenuItem>

                </Select>

            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>

                <div style={{ display: "flex", flex: .4, flexDirection: "column", padding: 20 }}>

                    <TextField id="standard-basic" label="Lead Author First Name" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Lead Author Last Name" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Lead Author Email" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Lead Author Phone Number" variant="standard" style={{ marginTop: 20 }} required />

                    <TextField id="standard-basic" label="Name of University or Corporation" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Street Address" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="City" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="State or Province" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Country" variant="standard" style={{ marginTop: 20 }} required />
                    <TextField id="standard-basic" label="Zip or Postal Code" variant="standard" style={{ marginTop: 20 }} required />
                </div>


                <div style={{ display: "flex", flex: .6, flexDirection: "column", padding: 20 }}>

                    <Typography variant="p" component="h2" style={{ marginTop: 20 }}>
                        Secondary Authors, if any
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <TextField
                            id="standard-basic"
                            label="First Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            required
                            value={secondaryAuthor.firstName}
                            onChange={(e) => {
                                setSecondaryAuthor({ ...secondaryAuthor, firstName: e.target.value })
                            }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Last Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            required
                            value={secondaryAuthor.lastName}
                            onChange={(e) => {
                                setSecondaryAuthor({ ...secondaryAuthor, lastName: e.target.value })
                            }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Affiliation"
                            variant="standard"
                            value={secondaryAuthor.affiliation}
                            style={{ margin: 10 }}
                            required
                            onChange={(e) => {
                                setSecondaryAuthor({ ...secondaryAuthor, affiliation: e.target.value })
                            }}
                        />
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                            setSecondaryAuthors([...secondaryAuthors, secondaryAuthor])
                            setSecondaryAuthor(authorInitialState)
                        }}>
                            Add
                        </Button>

                    </div>
                    <div style={{marginTop:15}}>

                        {
                            secondaryAuthors.map((item, index) => {
                                return (
                                    <div style={{ display: "flex", flexDirection: "row",height:40, marginLeft: 10, alignItems: "center", backgroundColor: index % 2 == 0 ? "whitesmoke" : "white" ,borderRadius:10,padding:10}}>
                                        <Typography variant="p" component="p" style={{ ...styles.secondaryAuthorRow }} fontSize={18}  >
                                            {item.firstName}
                                        </Typography>
                                        <Typography variant="p" component="p" style={{ ...styles.secondaryAuthorRow }} fontSize={18} >
                                            {item.lastName}
                                        </Typography>
                                        <Typography variant="p" component="p" style={{ ...styles.secondaryAuthorRow }} fontSize={18} >
                                            {item.affiliation}
                                        </Typography>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <Button variant="contained" style={{ width: 200 }}>Submit Abstract</Button>


        </div>
    )
}

const styles = {
    secondaryAuthorRow: {
        width: "20%",
    }
}




export default Form