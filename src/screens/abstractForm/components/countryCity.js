import React, { useState } from 'react'
import { Select, MenuItem, InputLabel } from "@mui/material"

import { Country, State, City } from 'country-state-city';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';


function CountryStateCity({ formData, handler }) {

    const [countryCode, setCountryCode] = useState("")
    const [stateCode, setStateCode] = useState("")



    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 25 }}>
            <Box style={{marginRight:20}} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>

                    <InputLabel id="country" >Country</InputLabel>
                    <Select
                        labelId="country"
                        id="demo-simple-select-standard"
                        value={formData.country}
                        onChange={(e) => {
                            handler(e, "country")
                        }}
                        label="Country"
                        style={{ height: 40 }}
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
                </FormControl>
            </Box>

            {/* state */}
            <Box style={{marginRight:20}} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="state" >State</InputLabel>
                    <Select
                        labelId="state"
                        id="demo-simple-select-standard"
                        value={formData.stateOrProvince}
                        onChange={(e) => {
                            handler(e, "state")
                        }}
                        label="State"
                        style={{ height: 40 }}
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
                </FormControl>
            </Box>

            {/* city*/}

            <Box style={{marginRight:20}} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label" >City</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={formData.city}
                        onChange={(e) => {
                            handler(e, "city")
                        }}
                        label="City"
                        style={{ height: 40 }}

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
                </FormControl>
            </Box>

        </div>
    )
}

export default CountryStateCity