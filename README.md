# AthensBusApp


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

../AthensBusApp/android>./gradlew assembleRelease

Generated APK: ../AthensBusApp/android/app/build/outputs/apk/app-release.apk
