const axios = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS;

async function distanceAndTimeFromStation(origin){

    const destination = 'Thane Railway Station, 01 Thane Railway Station Railway Station, Thane, Maharashtra 400601'
    const mode = 'transit'
  
  
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${API_KEY}`;
  
    const response = await axios.get(url);
  
    if (response.data.status === "OK") {
        
      const travelTime_ = response.data.rows[0].elements[0].duration.text;
      const travelTime = travelTime_.replace(/\D/g, ''); // Replace any non-digit character with an empty string
      
      return travelTime
  
    } else {
      console.log('Error in API response:', response.data.error_message);
    }
  }


router.get('/',async(req,res) => {

    const { location } = req.query
  
    try{
  
      const location_ = location + ', Thane'
      const timeanddist = await distanceAndTimeFromStation(location_)
      res.status(201).json({timeAndDistance: timeanddist})
  
    } catch(error){
  
        console.error(error)
        res.status(400).json({ message: error.message });
    }
  
  })

module.exports = router
