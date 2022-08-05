
import React, { useState } from 'react'
import { TextField, Select, MenuItem, InputLabel, Divider, Typography, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Country, State, City } from 'country-state-city';
import CountryStateCity from './countryCity';
import { validateEmail, validatePhoneNumber, x } from './formValidations';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
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


const FormStatus = ({ status }) => {
    return (
        <Typography variant="h2" component="h2" style={{ marginTop: 20 }}>
            {status}
        </Typography>
    )
}



const Form = ({ setFormSubmitted }) => {



    const [secondaryAuthor, setSecondaryAuthor] = useState(authorInitialState)
    const [formData, setFormData] = useState(dataTemplate)
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    // errors
    const [titleError, setTitleError] = useState("NA")
    const [firstNameError, setFirstNameError] = useState("NA")
    const [lastNameError, setLastNameError] = useState("NA")
    const [emailError, setEmailError] = useState("NA")
    const [phoneError, setPhoneError] = useState("NA")
    const [universityError, setUniversityError] = useState("NA")
    const [streetAddressError, serStreetAddressError] = useState("NA")
    const [postalCodeError, setPostalCodeError] = useState("NA")



    const [emptyForm, setEmptyForm] = useState("")
    const [submitClicked, setSubmitClicked] = useState(false)




    const getErrorMessage = (message, required = true) => {
        if (message == "NA") {
            if (submitClicked & required) {
                return "Missing Required Field"
            } else {
                return ""
            }
        }
        return message

    }

    const secondaryAuthorErrorMSG = (secondaryAuthor) => {

        if (secondaryAuthor.first_name == "") {
            return "Missing First Name"
        }
        if (secondaryAuthor.last_name == "") {
            return "Missing Last Name"
        }
        if (secondaryAuthor.affiliation == "") {
            return "Missing Affiliation"
        }
        return ""

    }






    // console.log(formData)

    const themeHandler = (e) => { setFormData({ ...formData, chooseATheme: e.target.value }) }

    const affiliationHandler = (e) => { setFormData({ ...formData, affiliation: e.target.value }) }

    const secondaryAuthonAffiliationHandler = (e) => setSecondaryAuthor({ ...secondaryAuthor, affiliation: e.target.value })

    const fileHandler = (event) => {
        console.log("setting file")
        setFile(event.target.files[0])
    }

    const placeHandler = (e, type) => {
        if (type == "country") {
            setFormData({ ...formData, country: e.target.value })
        } else if (type == "state") {
            setFormData({ ...formData, stateOrProvince: e.target.value })
        } else if (type == "city") {
            setFormData({ ...formData, city: e.target.value })
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault()
        const url = 'https://servertestabctestserver.tk:5001/submit_data';
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
        form.append('phone_number', formData.leadAuthorPhone)
        form.append('university', formData.nameOfUniversityCorporation)
        console.log(JSON.stringify(formData.secondaryAuthors))
        form.append('secondary_authors', JSON.stringify(formData.secondaryAuthors))

        form.append('abstract', file);
        form.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        setUploading(true)
        axios.post(url, form, config).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                setUploading(false)
                setSubmitted(true)
                setFormSubmitted(true)
            } else {
                setFailed(true)
            }
        });

    }

    if (failed) {
        return <FormStatus status="Submission Failed" />
    }

    if (submitted) {
        return <FormStatus status="Form Submitted" />
    }





    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <TextField
                id="standard-basic"
                label="Abstract title"
                variant="standard"
                style={styles.textField}
                required
                onChange={(e) => {
                    const msg = e.target.value
                    if (msg.length > 150) {
                        setTitleError("Title should be less that 150 characters.")
                    } else if (msg.length == 0) {
                        setTitleError("Missing Required field")
                    } else {
                        setTitleError("")
                    }

                    setFormData({ ...formData, abstractTitle: msg })
                }}
                error={getErrorMessage(titleError) != ""}
                helperText={getErrorMessage(titleError)}
            />

            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 40 }} required>
                <Box style={{ marginRight: 20 }} sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label" >Theme</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={formData.chooseATheme}
                            onChange={themeHandler}
                            label="Theme"
                            style={{ height: 40 }}
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
                    </FormControl>
                </Box>
                <Box style={{ marginRight: 20 }} sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="affiliation">Affiliation</InputLabel>
                        <Select
                            labelId="affiliation"
                            id="demo-simple-select-standard"
                            value={formData.affiliation}
                            onChange={affiliationHandler}
                            label="Affiliation"
                            style={{ height: 40 }}
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
                    </FormControl>
                </Box>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="p" component="h2" style={{ fontSize: 20, marginRight: 20, marginLeft: 30 }}>
                        Abstract to upload
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ width: 200 }}

                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            onChange={fileHandler}
                            accept=".pdf, .doc, .docx"
                        />
                    </Button>
                    <p style={{ marginLeft: 20 }}>{file?.name}</p>
                    {(submitClicked && file == null) && <p style={{ color: "red" }}>Please add a file</p>}
                </div>

            </div >

            <div style={{ display: "flex", flexDirection: "row" }}>

                <div style={{ display: "flex", flex: .4, flexDirection: "column" }}>

                    <TextField
                        id="standard-basic"
                        label="Lead Author First Name"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (e.target.value.length > 150) {
                                setFirstNameError("Name should be less that 50 characters.")
                            } else if (e.target.value.length == 0) {
                                setFirstNameError("Missing Required field")
                            } else {
                                setFirstNameError("")
                            }
                            setFormData({ ...formData, leadAuthorFirstName: e.target.value })
                        }}
                        error={getErrorMessage(firstNameError) != ""}
                        helperText={getErrorMessage(firstNameError)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Last Name"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (e.target.value.length > 150) {
                                setLastNameError("Last name should be less that 50 characters.")
                            } else if (e.target.value.length == 0) {
                                setLastNameError("Missing Required field")
                            } else {
                                setLastNameError("")
                            }
                            setFormData({ ...formData, leadAuthorLastName: e.target.value })
                        }}
                        error={getErrorMessage(lastNameError)}
                        helperText={getErrorMessage(lastNameError)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Email"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (!validateEmail(e.target.value)) {
                                setEmailError("Invalid Email Address")
                            } else if (e.target.value.length == 0) {
                                setEmailError("Missing Required field")
                            } else {
                                setEmailError("")
                            }
                            setFormData({ ...formData, leadAuthorEmail: e.target.value })
                        }}
                        error={getErrorMessage(emailError) != ""}
                        helperText={getErrorMessage(emailError)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Lead Author Phone Number"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (!validatePhoneNumber(e.target.value)) {
                                setPhoneError("Invalid Phone")
                            } else if (e.target.value.length == 0) {
                                setPhoneError("Missing Required field")
                            } else {
                                setPhoneError("")
                            }

                            setFormData({ ...formData, leadAuthorPhone: e.target.value })
                        }}
                        error={getErrorMessage(phoneError) != ""}
                        helperText={getErrorMessage(phoneError)}
                    />

                    <TextField
                        id="standard-basic"
                        label="Name of University or Corporation"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (e.target.value.length == 0) {
                                setUniversityError("Missing Required field")
                            } else {
                                setUniversityError("")
                            }
                            setFormData({ ...formData, nameOfUniversityCorporation: e.target.value })
                        }}
                        error={getErrorMessage(universityError) != ""}
                        helperText={getErrorMessage(universityError)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Street Address"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (e.target.value.length == 0) {
                                serStreetAddressError("Missing Required field")
                            } else {
                                serStreetAddressError("")
                            }
                            setFormData({ ...formData, streetAddress: e.target.value })
                        }}
                        error={getErrorMessage(streetAddressError) != ""}
                        helperText={getErrorMessage(streetAddressError)}
                    />


                    <CountryStateCity formData={formData} handler={placeHandler} />

                    <TextField
                        id="standard-basic"
                        label="Zip or Postal Code"
                        variant="standard"
                        style={styles.textField}
                        required
                        onChange={(e) => {
                            if (e.target.value.length == 0) {
                                setPostalCodeError("Missing Required field")
                            } else {
                                setPostalCodeError("")
                            }
                            setFormData({ ...formData, zipOrPostal: e.target.value })
                        }}
                        error={getErrorMessage(postalCodeError) != ""}
                        helperText={getErrorMessage(setPostalCodeError)}

                    />
                </div>


                <div style={{ display: "flex", flex: .6, flexDirection: "column", padding: 20 }}>

                    <Typography variant="p" component="h2" style={styles.textField}>
                        Secondary Authors, if any
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                            id="standard-basic"
                            label="First Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            value={secondaryAuthor.first_name}
                            onChange={(e) => {
                                setSecondaryAuthor({ ...secondaryAuthor, first_name: e.target.value })
                            }}

                        />
                        <TextField
                            id="standard-basic"
                            label="Last Name"
                            variant="standard"
                            style={{ margin: 10 }}
                            value={secondaryAuthor.last_name}
                            onChange={(e) => {
                                setSecondaryAuthor({ ...secondaryAuthor, last_name: e.target.value })
                            }}

                        />

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Box style={{ marginRight: 20 }} sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="affiliation">Affiliation</InputLabel>
                                    <Select
                                        labelId="affiliation"
                                        id="demo-simple-select-standard"
                                        value={secondaryAuthor.affiliation}
                                        onChange={secondaryAuthonAffiliationHandler}
                                        label="Affiliation"
                                        style={{ height: 40 }}
                                    >


                                        <MenuItem
                                            value="University"
                                            onChange={secondaryAuthonAffiliationHandler}
                                        >
                                            University
                                        </MenuItem>
                                        <MenuItem
                                            value="Laboratory"
                                            onChange={secondaryAuthonAffiliationHandler}
                                        >
                                            Laboratory
                                        </MenuItem>
                                        <MenuItem
                                            value="Corporate"
                                        // onChange={affiliationHandler}
                                        >
                                            Corporate
                                        </MenuItem>

                                    </Select >
                                </FormControl>
                            </Box>
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                                if (secondaryAuthorErrorMSG(secondaryAuthor) === "") {
                                    setFormData({ ...formData, secondaryAuthors: [...formData.secondaryAuthors, secondaryAuthor] })
                                    setSecondaryAuthor(authorInitialState)

                                }
                            }}>
                                Add
                            </Button>

                        </div>

                    </div>
                    <div style={{ marginTop: 15 }}>

                        {
                            formData.secondaryAuthors.map((item, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", flexDirection: "row", height: 40, marginLeft: 10, alignItems: "center", backgroundColor: index % 2 == 0 ? "whitesmoke" : "white", borderRadius: 10, padding: 10 }}>
                                        <Typography variant="p" component="p" style={{ ...styles.secondaryAuthorRow }} fontSize={18}  >
                                            {item.first_name}
                                        </Typography>
                                        <Typography variant="p" component="p" style={{ ...styles.secondaryAuthorRow }} fontSize={18} >
                                            {item.last_name}
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
            {
                submitClicked && emptyForm && <p style={{ color: "red" }}>Form is empty</p>
            }
            {
                submitClicked && formData.affiliation === "" && <p style={{ color: "red" }}>Please Select Affiliation</p>
            }
            {
                submitClicked && formData.chooseATheme === "" && <p style={{ color: "red" }}>Please Select Theme</p>
            }
            {
                submitClicked && formData.country === "" && <p style={{ color: "red" }}>Please Select Country</p>
            }
            {
                submitClicked && formData.state === "" && <p style={{ color: "red" }}>Please Select State</p>
            }


            <Button
                variant="contained"
                style={{ width: 200, marginTop: 25 }}
                onClick={
                    (e) => {
                        setSubmitClicked(true)
                        console.log(
                            "titleError", titleError,
                            "firstNameError", firstNameError,
                            "lastNameError", lastNameError,
                            "emailError", emailError,
                            "phoneError", phoneError
                        )
                        if (titleError == "" &
                            firstNameError == "" &
                            lastNameError == "" &
                            emailError == "" &
                            phoneError == "" &
                            universityError == "" &
                            streetAddressError == "" &
                            postalCodeError == ""
                        ) {
                            handleSubmit(e)
                        }
                        else {
                            console.log("form error")
                        }
                    }
                }
                startIcon={uploading && <HourglassBottomIcon />}
            >
                Submit Abstract
            </Button>


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