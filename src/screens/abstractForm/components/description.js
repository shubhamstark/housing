import React from 'react'
import css from "./description.module.css"
import { TextField, Select, MenuItem, InputLabel, Divider, Typography, Button } from "@mui/material"

const description = "We invite you to submit a poster abstract of up to 250 words (excluding title, authors, affiliations and footnotes) of text and diagrams (if any) for poster presentation at the 17th Annual Peptide Therapeutics Symposium, taking place in a hybrid format, October 20-21, 2022. When uploading your abstract, please include the title, authors and affiliations on the uploaded document. Selected presenters will be asked to submit a short video explaining their poster which will be posted to the virtual Symposium website. Poster sessions are built into the schedule. During this time, presenters will give a five-minute fast-pitch PowerPoint presentation. Those presenting in-person can physically display their poster and answer questions during breaks. Online attendees will have the opportunity to ask questions to virtual poster presenters in smaller breakout sessions. All attendees can ask questions through the virtual Symposium website until the end of November."

export const Description = () => {
    return (
        <div className={css.container}>
            <Typography variant="h2" component="h2" style={{ marginTop: 20 }}>
                Abstract Submission
            </Typography>
            <Typography variant="p" component="p" style={{ marginTop: 20 }} fontSize={20}>
                {description}
            </Typography>            
            <Typography variant="p" component="p" style={{ marginTop: 20 }} fontSize={18} >
                * indicates required fields
            </Typography>
        </div>
    )
}
