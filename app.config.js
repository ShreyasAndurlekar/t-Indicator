export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    name: "t-Indicator",
    slug: "tmt",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.shreyaz.tmt"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "https://u.expo.dev/54197ed7-a673-406a-a70b-c465497f5b0c"
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: ["./assets/fonts/Bahnschrift.ttf"]
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "54197ed7-a673-406a-a70b-c465497f5b0c"
      },
      apiUrl: process.env.API_URL
    }
  }
});
