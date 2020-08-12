# My Clinic

My Clinic is a hybrid app written in React Native for dealing with simple clinic records.

## Pre-requisites

- Installed [node.js](https://nodejs.org/en/).
- Installed an Android emulator (can be installed from [Android Studio](https://developer.android.com/studio)) / Prepared an Android device.

## Installation

- Use the package manager [npm](https://www.npmjs.com/) to install [Expo CLI](https://docs.expo.io/workflow/expo-cli/) :

```bash
npm install -g expo-cli
```
- Install [XAMPP](https://www.apachefriends.org/index.html) to set up the local SQL database.

## Usage
- If you are using your an Android device, change the IP Address to your computer's IP Address in **axios.post()** in [../screens/login.js](https://github.com/briankwong65/myClinic/blob/master/screens/login.js), [../screens/registration.js](https://github.com/briankwong65/myClinic/blob/master/screens/registration.js), [../screens/clinic.js](https://github.com/briankwong65/myClinic/blob/master/screens/clinic.js), and [../screens/createRecord.js](https://github.com/briankwong65/myClinic/blob/master/screens/createRecord.js) 
1. Switch on the front-end (expo cli) and run on an Android emulator / Android device :

```bash
expo start
a
```
2. Open another terminal and cd to the backend directory and switch on the backend (node.js) :

```bash
cd backend
nodemon app.js
```
