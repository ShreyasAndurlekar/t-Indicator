# t-Indicator



## Installation Guide  



1. **Install Node.js and it's package manager if it doesn't get installed with it**

    ```bash
    sudo apt install nodejs
    sudo apt install npm
    ```

2. **Download the repository**

    ```bash
    git clone https://github.com/ShreyasAndurlekar/bus
    cd bus
    ```

3. **Install dependencies and run development server**

    ```bash
    npm i expo@latest
    npx expo install --fix
    npm install
    npm start
    ```

## Installation Guide For Backend 

1. **Download the Express Server and install it's dependencies**
   ```bash
    git clone -b database https://github.com/ShreyasAndurlekar/bus
    cd bus
    npm install
    ```
2. **Start the backend server**
   ```bash
    node index.js
    ```

3. **Required API Keys**
- Google Maps API
- MongoDB Database URI
- For frontend, use development server's URL as API ( http://localhost:5000 )
   
## Build APK

1. **Download EAS and run the build command**
   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform android
    ```




    

