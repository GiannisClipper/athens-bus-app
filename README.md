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