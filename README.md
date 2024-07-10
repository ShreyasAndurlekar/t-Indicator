Steps to run this project in your machine ( React Native )

- Download ( git clone ) the repository's main branch
- Install Node.js
- Install Expo using { 𝚗𝚙𝚖 𝚒𝚗𝚜𝚝𝚊𝚕𝚕 -𝚐 𝚎𝚡𝚙𝚘-𝚌𝚕𝚒 }
- Navigate to the project directory in CLI
- Run { 𝚗𝚙𝚖 𝚒𝚗𝚜𝚝𝚊𝚕𝚕 } to install dependenices
- Run { 𝚗𝚙𝚖 𝚜𝚝𝚊𝚛𝚝 }

To run the Node.js server

- Download the repo's database branch
- Install dependencies using { 𝚗𝚙𝚖 𝚒𝚗𝚜𝚝𝚊𝚕𝚕 }
- Create a .env file and store an active Google Maps API key, A MongdoDB cluster key, and a secret to sign JWT tokens
- Run { 𝚗𝚘𝚍𝚎 𝚒𝚗𝚍𝚎𝚡.𝚓𝚜 }
- API URL available on port 5000
  
You can view the app in the web / Android Emulator from Android Studio / Expo Mobile App

To get an APK install EAS CLI and visit this site --> https://docs.expo.dev/build-reference/apk/

Since there are no MongoDB libraries for React, You need to run a Node.js server (API) that communicates information w/ React Native for database information. Download both branches and run the Node.js server first and then run React to access database feature. Use your own MongoDB Cluster ofcourse. Replace the DB_URI with your own MongoDB URI.
