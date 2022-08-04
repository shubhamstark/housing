
import React, { useState } from 'react'
import { TextField, Select, MenuItem, InputLabel, Divider, Typography, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"

let dataTemplate = {
    abstractTitle: "",
    chooseATheme: "",

    leadAuthorFirstName: "",
    leadAuthorLastName: "",
    leadAuthorPhone: "",
    leadAuthorEmail: "",

    affiliation: "",
    nameOfUniversityCorporation: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    country: "",
    zipOrPostal: "",
    secondaryAuthors: [],
    abstract: ""
}

const authorInitialState = {
    first_name: "",
    last_name: "",
    affiliation: ""
}

const Form = () => {


    const [secondaryAuthor, setSecondaryAuthor] = useState(authorInitialState)
    const [formData, setFormData] = useState(dataTemplate)
    const [file, setFile] = useState()

    console.log(formData)

    const themeHandler = (e) => { setFormData({ ...formData, chooseATheme: e.target.value }) }

    const affiliationHandler = (e) => { setFormData({ ...formData, affiliation: e.target.value }) }

    const fileHandler = (event) => {
        console.log("setting file")
        setFile(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const url = 'http://3.132.8.245:5001/submit_data';
        const form = new FormData();
        form.append('title', formData.abstractTitle)
        form.append('theme', formData.chooseATheme)
        form.append('first_name', formData.leadAuthorFirstName)
        form.append('last_name', formData.leadAuthorLastName)
        form.append('email', formData.leadAuthorEmail)
        form.append('affiliation', formData.affiliation)
        form.append('street_address', formData.streetAddress)
        form.append('city', formData.city)
        form.append('state', formData.stateOrProvince)
        form.append('country', formData.country)
        form.append('zip_code', formData.zipOrPostal)
        form.append('phone_number',"917999068606")
        form.append('university', "university")
        console.log(JSON.stringify(formData.secondaryAuthors))
        form.append('secondary_authors', JSON.stringify(formData.secondaryAuthors))

        form.append('abstract', file);
        form.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, form, config).then((response) => {
            console.log(response.data);
        });

    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <TextField
                id="standard-basic"
                label="Abstract title"
                variant="standard"
                style={styles.textField}
                required
                onChange={(e) => { setFormData({ ...formData, abstractTitle: e.target.value }) }}
            />

            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 40 }} required>
                <InputLabel id="demo-simple-select-standard-label" >Theme</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={formData.chooseATheme}
                    onChange={themeHandler}
                    label="Theme"
                    style={{ marginInline: 20 }}
                >
                    <MenuItem
                        value="Alternative Approaches in Peptide Administration"
                        onChange={themeHandler}
                    >
                        Alternative Approaches in Peptide Administration
                    </MenuItem>
                    <MenuItem
                        value="Commercial Synthesis & Formulation of Peptides"
                        onChange={themeHandler}
                    >
                        Commercial Synthesis & Formulation of Peptides
                    </MenuItem>
                    <MenuItem
                        value="Complementary Pharmacology of Peptides, Proteins & Conventional Drugs"
                        onChange={themeHandler}
                    >
                        Complementary Pharmacology of Peptides, Proteins & Conventional Drugs
                    </MenuItem>
                    <MenuItem
                        value="Peptide Immunogenicity & Toxicology"
                        onChange={themeHandler}
                    >
                        Peptide Immunogenicity & Toxicology
                    </MenuItem>
                    <MenuItem
                        value="Peptide Synthetic Methodologies"
                        onChange={themeHandler}
                    >
                        Peptide Synthetic Methodologies
                    </MenuItem>
                    <MenuItem
                        value="Peptide Therapeutics & Related Bioactive Molecules"
                        onChange={themeHandler}
                    >
                        Peptide Therapeutics & Related Bioactive Molecules
                    </MenuItem>
                    <MenuItem
                        value="Peptides as Diagnostics, Probes & Biomarkers"
                        onChange={themeHandler}
                    >
                        Peptides as Diagnostics, Probes & Biomarkers
                    </MenuItem>
                    <MenuItem
                        value="Peptidomics & Peptide Discovery"
                        onChange={themeHandler}
                    >
                        Peptidomics & Peptide Discovery
                    </MenuItem>
                    <MenuItem
                        value="Pharmacokinetics, Biodistribution & Cellular Transport"
                        onChange={themeHandler}
                    >
                        Pharmacokinetics, Biodistribution & Cellular Transport
                    </MenuItem>
                </Select>
                <InputLabel id="affiliation">Affiliation</InputLabel>
                <Select
                    labelId="affiliation"
                    id="demo-simple-select-standard"
                    value={formData.affiliation}
                    onChange={affiliationHandler}
                    label="Affiliation"
                    style={{ marginInline: 20 }}
                >
                    <MenuItem
                        value="University"
                        onChange={affiliationHandler}>
                        University
                    </MenuItem>
                    <MenuItem
                        value="Laboratory"
                        onChange={affiliationHandler}>
                        Laboratory
                    </MenuItem>
                    <MenuItem
                        value="Corporate"
                        onChange={affiliationHandler}>
                        Corporate
                    </MenuItem>

                </Select >

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="p" component="h2" style={{ fontSize: 20, marginRight: 20 }}>
                        Abstract to upload
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ width: 300 }}
                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            onChange={fileHandler}
                        />
                    </Button>
                </div>

            </div >

            <div style={{ display: "flex", flexDirection: "row" }}>

                <div style={{ display: "flex", flex: .4, flexDirection: "column", padding: 20 }}>

                    <TextField
                        id="standard-basic"
                        label="Lead Author First Name"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, leadAuthorFirstName: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Last Name"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, leadAuthorLastName: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Email"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, leadAuthorPhone: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Phone Number"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, leadAuthorEmail: e.target.value }) }}
                    />

                    <TextField
                        id="standard-basic"
                        label="Name of University or Corporation"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, nameOfUniversityCorporation: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Street Address"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, streetAddress: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="City"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, city: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="State or Province"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, stateOrProvince: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Country"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, country: e.target.value }) }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Zip or Postal Code"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => { setFormData({ ...formData, zipOrPostal: e.target.value }) }}
                    />
                </div>


                <div style={{ display: "flex", flex: .6, flexDirection: "column", padding: 20 }}>

                    <Typography variant="p" component="h2" style={styles.textField}>
                        Secondary Authors, if any
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <TextField
                            id="standard-basic"
                            label="First Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            required
                            value={secondaryAuthor.first_name}
                            onChange={(e) => { setSecondaryAuthor({ ...secondaryAuthor, first_name: e.target.value }) }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Last Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            required
                            value={secondaryAuthor.last_name}
                            onChange={(e) => { setSecondaryAuthor({ ...secondaryAuthor, last_name: e.target.value }) }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Affiliation"
                            variant="standard"
                            value={secondaryAuthor.affiliation}
                            style={{ margin: 10 }}
                            required
                            onChange={(e) => { setSecondaryAuthor({ ...secondaryAuthor, affiliation: e.target.value }) }}
                        />
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                            setFormData({ ...formData, secondaryAuthors: [...formData.secondaryAuthors, secondaryAuthor] })
                            setSecondaryAuthor(authorInitialState)
                        }}>
                            Add
                        </Button>

                    </div>
                    <div style={{ marginTop: 15 }}>

                        {
                            formData.secondaryAuthors.map((item, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", flexDirection: "row", height: 40, marginLeft: 10, alignItems: "center", backgroundColor: index % 2 == 0 ? "whitesmoke" : "white", borderRadius: 10, padding: 10 }}>
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
            <Button variant="contained" style={{ width: 200 }} onClick={handleSubmit}>Submit Abstract</Button>


        </div >
    )
}

const styles = {
    secondaryAuthorRow: {
        width: "20%"
    },
    textField: {
        marginTop: 20
    }

}




export default Form