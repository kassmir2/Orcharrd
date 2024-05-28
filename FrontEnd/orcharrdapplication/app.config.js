export default {
   
    
        "expo": {
          "name": "orcharrdapplication",
          "slug": "orcharrdapplication",
          "version": "1.0.0",
          "orientation": "portrait",
          "icon": "./assets/Orcharrd_Logo.png",
          "userInterfaceStyle": "light",
          "scheme": "your-app-scheme",
          "plugins": [
            "@react-native-firebase/app",
            "@react-native-firebase/auth",
            "@react-native-firebase/crashlytics",
            [
              "expo-build-properties",
              {
                "ios": {
                  "useFrameworks": "static"
                }
              }
            ],
            [
              "expo-image-picker",
              {
                "photosPermission": "The app accesses your photos to let you share them with your friends."
              }
            ],
            "expo-router"
          ],
          "splash": {
            "image": "./assets/Orcharrd_Logo.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
          },
          "updates": {
            "fallbackToCacheTimeout": 0
          },
          "platforms": [
            "ios",
            "android",
            "web"
          ],
          "assetBundlePatterns": ["**/*"],
          "ios": {
          "googleServicesFile": process.env.GOOGLE_SERVICES_INFO_PLST,
            "supportsTablet": true,
            "bundleIdentifier": "com.Orcharrd.Orcharrd"
          },
          "android": {
            "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
            "package": "host.exp.exponent",
            "adaptiveIcon": {
              "foregroundImage": "./assets/Orcharrd_Logo.png",
              "backgroundColor": "#ffffff"
            }
          },
          "web": {
            "favicon": "./assets/Orcharrd_Logo.png"
          },
          "extra": {
            // "ios": {
            //   "firebaseConfig": {
            //     "apiKey": "AIzaSyBA8tF3nim5RQ6OwXSNM388zwQK-5Ann6I",
            //     "authDomain": "YOUR_AUTH_DOMAIN",
            //     "projectId": "orcharrd-b1747",
            //     "storageBucket": "orcharrd-b1747.appspot.com",
            //     "messagingSenderId": "892558952283",
            //     "appId": "1:892558952283:ios:033a3f29b4e2b17fb0bc7e",
            //     "measurementId": "YOUR_MEASUREMENT_ID"
            //   }
            // },
            // "android": {
            //   "firebaseConfig": {
            //     "apiKey": "AIzaSyBrRTN-BjO0LnTksN5Gxyooi87ORjmBCgk",
            //     "authDomain": "YOUR_AUTH_DOMAIN",
            //     "projectId": "orcharrd-b1747",
            //     "storageBucket": "orcharrd-b1747.appspot.com",
            //     "messagingSenderId": "892558952283",
            //     "appId": "1:892558952283:ios:033a3f29b4e2b17fb0bc7e",
            //     "measurementId": "YOUR_MEASUREMENT_ID"
            //   }
            // },
            "eas": {
              "projectId": "0bbd588e-8ee8-474d-a4cf-8dddb278b9f8"
            }
          },
          "owner": "kassmir2"
        }
      
      
  };