const axios = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS;
const radius = 500; 
const type = 'transit_station';

function filterPlaces(places, filterArray) {
  return places.filter(place => 
    filterArray.includes(place.name)
  );
}

async function getNearbyPlaces(location) {

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
      const params = {
        location,
        radius,
        type,
        key: API_KEY
      };

      // SEND REQUEST

      const pn = [
        "Pawar Nagar",
        "Muncipal School",
        "Edenwood",
        "Lokpuram",
        "Vasant Vihar",
        'Jawahar Nagar',
        'Gandhi Nagar',
        'Voltas',
        'Subhash Nagar',
        'Oswal Park',
        'Majiwada Naka',
        'Muktai Nagar',
        'Gokul Nagar',
        'Uthalsar Naka',
        'Civil Hospital',
        'Central Maidan',
        'Court Naka',
        'Thane Railway Station' ]

      
      /* Since I can experiment only on this path and it is a hobby project, I only need this filterArray
       * Since the frontend requires the same text as it's display we use this to match the API result
       * and return a proper defined nearest Bus Stop instead of Civil Hospital, 6788, West Road */

      try {

        const response = await axios.get(url, { params });
        var places = response.data.results;
        const copy = places

        places = filterPlaces(places, pn);

        let nearestPlace

        if(places.length == 0){
          nearestPlace = findNearestPlace(location, copy);
        } 
        else{
          nearestPlace = findNearestPlace(location, places);
        }
        
        const ans = nearestPlace.name.toUpperCase()
        return ans

      } catch (error) {
        console.error('Error fetching nearby places:', error);
      }
}

function calculateDistance(origin, destination) {

  const [lat1, lng1] = origin.split(',').map(parseFloat);
  const [lat2, lng2] = [destination.lat, destination.lng];
  return Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2);

}


function findNearestPlace(origin, places) {

  let nearestPlace;
  let minDistance = Infinity;

  places.forEach(place => {
    const distance = calculateDistance(origin, place.geometry.location);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPlace = place;
    }
  });

  return nearestPlace;
}

async function distanceAndTimeFromStation(origin){

  const destination = 'Thane Railway Station, 01 Thane Railway Station Railway Station, Thane, Maharashtra 400601'
  const mode = 'transit'


  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${API_KEY}`;

  const response = await axios.get(url);

  if (response.data.status === "OK") {

    const travelTime = response.data.rows[0].elements[0].duration.text;
    return travelTime

  } else {
    console.log('Error in API response:', response.data.error_message);
  }
}


router.get('/', async (req, res) => {

  const { location } = req.query
  
  try {
      
      const result = await getNearbyPlaces(location)
      const timeanddist = await distanceAndTimeFromStation(location)
      res.status(201).json({nearest: result, timeAndDistance: timeanddist});
  }
  catch(error){

      console.error(error)
      res.status(400).json({ message: error.message });
  }

})

router.get('/time',async(req,res) => {

  const { location } = req.query

  try{

    location_ = location + ', Thane'
    const timeanddist = await distanceAndTimeFromStation(location_)
    res.status(201).json({timeAndDistance: timeanddist})

  } catch(error){

      console.error(error)
      res.status(400).json({ message: error.message });
  }

})

module.exports = router
