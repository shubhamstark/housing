import React, { useState } from 'react'
import { Select, MenuItem, InputLabel } from "@mui/material"

import { Country, State, City } from 'country-state-city';


function CountryStateCity({ formData, handler }) {

    const [countryCode, setCountryCode] = useState("")
    const [stateCode, setStateCode] = useState("")



    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop:25 }}>
            <InputLabel id="demo-simple-select-standard-label" >Country</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.country}
                onChange={(e) => {
                    handler(e, "country")
                }}
                label="Country"
                style={{ marginInline: 20 }}
            >
                {Country.getAllCountries().map((item, index) => {
                    return (
                        <MenuItem
                            value={item.name}
                            onClick={() => { setCountryCode(item.isoCode) }}
                        >
                            {item.name}
                        </MenuItem>
                    )
                })}

            </Select>

            {/* state */}
            <InputLabel id="demo-simple-select-standard-label" >State</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.stateOrProvince}
                onChange={(e) => {
                    handler(e, "state")
                }}
                label="State"
                style={{ marginInline: 20 }}
            >
                {State.getStatesOfCountry(countryCode).map((item, index) => {
                    // console.log(item)
                    return (
                        <MenuItem
                            value={item.name}
                            onClick={() => { setStateCode(item.isoCode) }}
                        >
                            {item.name}
                        </MenuItem>
                    )
                })}

            </Select>

            {/* city*/}

            <InputLabel id="demo-simple-select-standard-label" >City</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.city}
                onChange={(e) => {
                    handler(e, "city")
                }}
                label="City"
                style={{ marginInline: 20 }}
            >
                {City.getCitiesOfState(countryCode, stateCode).map((item, index) => {
                    return (
                        <MenuItem
                            value={item.name}
                        >
                            {item.name}
                        </MenuItem>
                    )
                })}

            </Select>
        </div>
    )
}

export default CountryStateCity