# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta] - 2021-09-06

### Added
- Main menu (Home, Lines, MyStops).
- Home page with a short introductory note.
- Implementation of useRequest hook to commit the Requests to OASA telematics API.
- Lines page, showing the data from the API (bus lines, routes, stops, arrivals).
- Arrivals page, showing expected stop arrivals.
- Arrivals page menu (Close, MyStop).
- Arrivals page Close button, to leave this page and return to previous one.
- Arrivals page MyStop button, to toggle a bus stop between favourite or not.
- Implementation of useStorage hook to save user favourites (simulates a localStorage using SQLite underneath).
- MyStops page, offering instant access to the favourite stops and their arrivals.
- Implementation of useOrientation hook to detect the portrait or landscape orientation of the device.
- App presentation in html.
