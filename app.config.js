import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: "tmt",
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
    supportsTablet: true,
    newArchEnabled: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.shreyaz.tmt",
    newArchEnabled: true
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "54197ed7-a673-406a-a70b-c465497f5b0c"
    },
    apiUrl: process.env.API_URL
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  updates: {
    url: "https://u.expo.dev/54197ed7-a673-406a-a70b-c465497f5b0c"
  }
});

