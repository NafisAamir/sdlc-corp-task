const { Router } = require("express");
require("dotenv").config();
const axios = require("axios");

const findcityController = Router();

findcityController.get("/", async (req, response) => {
    const city = req.query.city;
    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=yes`;

    try {
        const res = await axios.get(url);
        const data = res.data; 
        response.json(data); 
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { findcityController };
