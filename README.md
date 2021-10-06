# AthensBusApp (dev notes)

-- Initialize the project:

(install Node, React Native command line interface, Python2, JDK, and Android Studio, detailed nstructions: https://www.javatpoint.com/react-native-environment-setup)

../react-native init AthensBusApp

../AthensBusApp/react-native run-android


-- Initialize the repository:

(create new repository in github.com including README.md and LICENCE)

../AthensBusApp/git init

../AthensBusApp/git pull https://github.com/GiannisClipper/AthensBusApp.git

../AthensBusApp/git add .

../AthensBusApp/git commit -m "Initialize the project."

../AthensBusApp/git remote add origin https://github.com/GiannisClipper/AthensBusApp.git

../AthensBusApp/git push --set-upstream origin main


-- Install sqlite

../AthensBusApp/npm install react-native-sqlite-storage --save

but if occured a problem like this:

"npm WARN tsutils@3.21.0 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself",

first install typescript:

../AthensBusApp/npm install typescript --save-dev

../AthensBusApp/npm install react-native-sqlite-storage --save


-- Change app's icon (for android)

Create the icon here: http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba%2896%2C%20125%2C%20139%2C%200%29&backColor=rgb%28255%2C%20255%2C%20255%29&crop=0&backgroundShape=square&effects=none&name=ic_launcher

Download the created icon as a zip file and copy the files from the minmap-* directories to ../AthensBusApp/android/app/src/main/res/minmap-* directories


-- Build a Release APK

First could set the version in ../AthensBusApp/android/app/build.gradle (ex. versionCode 1, versionName "1.0.0")

../AthensBusApp/android>./gradlew assembleRelease

Generated APK: ../AthensBusApp/android/app/build/outputs/apk/app-release.apk


-- HTTP request limitation (https://stackoverflow.com/questions/63045011/i-can-not-get-http-request-to-work-on-android-10-api-29-or-api-30-it-does-work)

Since Android 10 doesn't allow you to access external URL which is note secured with https://.
Now you have 2 solutions to overcome this issue:
Install SSL on your web server domain to make it https:// (recommended)
Add android:usesCleartextTraffic="true" in your manifest inside <application> tag
NOTE: If you go for 2nd option and upload your signed APK to play store it may get rejected due to security issues.


-- To fix the issue where the yellow background not displayed in Android 10 (dark theme), add in ../AthensBusApp/android/app/src/main/res/values/styles.xml: <item name="android:forceDarkAllowed">false</item>

More details: https://stackoverflow.com/a/64339016/3156644 (Dark theme is available in Android 10 (API level 29) and higher. And most likely this feature ruined your app design implementation, like SVG, font, and background colors...)