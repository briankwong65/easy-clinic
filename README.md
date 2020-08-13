# My Clinic

**My Clinic** is a **hybrid app** written in **React Native** and **Node.js** for dealing with simple clinic records.<br />
Please refer to **[../screenshots](https://github.com/briankwong65/myClinic/tree/master/screenshots)** for screenshots of the app.

## Pre-requisites

- Installed **[Node.js](https://nodejs.org/en/)** .
- Installed an **Android emulator** (can be installed from **[Android Studio](https://developer.android.com/studio)**) / 
- Installed an **IOS simulator** (can be installed from **[Xcode](https://apps.apple.com/hk/app/xcode/id497799835?mt=12)**) /
- Prepared an **Android device** /
- Prepared an **IOS device**


## Installation

- Use the package manager **npm** to install **[Expo CLI](https://docs.expo.io/workflow/expo-cli/)** :

```bash
npm install -g expo-cli
```
- Install **[XAMPP](https://www.apachefriends.org/index.html)** to set up the local **SQL database**.
- If you are using an **Android Device**, please install the **[Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=zh_HK)** app from **Google Play Store**.
- If you are using an **IOS Device**, please install the **[Expo Client](https://apps.apple.com/us/app/expo-client/id982107779)** app from **App Store**.

## Usage
- If you are using your an **Android device** / **IOS simulator**:
 change the **IP Address to your computer's IP Address** in **axios.post()** in **[../screens/login.js](https://github.com/briankwong65/myClinic/blob/master/screens/login.js)**, **[../screens/registration.js](https://github.com/briankwong65/myClinic/blob/master/screens/registration.js)**, **[../screens/clinic.js](https://github.com/briankwong65/myClinic/blob/master/screens/clinic.js)**, and **[../screens/createRecord.js](https://github.com/briankwong65/myClinic/blob/master/screens/createRecord.js)** .
1. Turn on **XAMPP**, start **Apache** and **MySQL** (You can press the **admin** button of **MySQL** to open the **phpMyAdmin** page).
2. Start the **EXPO CLI** and run on an **Android device**/**emulator** :

```bash
expo start
a
```
3. Open **another terminal** and **cd** to the **backend** directory and start the **back-end server(Node.js)** :

```bash
cd backend
nodemon app.js
```
For **IOS device**, instead of typing the **"a"** command, please scan the **QR code** on the **command prompt** or the **Expo Developer Tool** after executing **expo start**.
