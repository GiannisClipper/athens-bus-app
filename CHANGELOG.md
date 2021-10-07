# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-beta] - 2021-10-06

### Added
- Route Schedule screen, displaying the route schedule of the current day.
- Route Map screen, illustrating on google maps the bus route and the related stops.
- Stop Routes screen, displaying all the bus routes passing through the stop.
- Stop Map screen, illustrating on google maps the place of the stop and other stops placed close to it.
- My Routes screen, carrying out instant access to favourite routes.
- Caching feature, reducing the API requests and optimizing application performance.
- Settings screen, having options to clear the cache memory and the favourites defined by user.
- Tests (../_abstract/logic, ../home, ../lines, ../routes, ../stops).

### Changed
- Replace custom navigation with @react-navigation (drawer, stack and tab navigators).
- Replace icons from html symbols to Material Community Icons
- Restructure source foldrers based on components, style & logic separation.
- Update favourite stops feature.
- Refactor useRequest.

## [1.0.1-beta] - 2021-09-08

### Changed
- The syntax of the short introductory note.
- Rename Close to Back in arrivals page menu.

### Fixed
- Replace http with https, while since Android 10 not allowed simple http requests.

## [1.0.0-beta] - 2021-09-06

### Added
- Main menu (Home, Lines, MyStops).
- Home page with a short introductory note.
- Implementation of useRequest hook to commit the Requests to OASA telematics API.
- Lines page, showing the data from the API (bus lines, routes, stops, arrivals).
- Arrivals page, showing expected stop arrivals.
- Arrivals page menu (Close, MyStop).
- Arrivals page Close choice, to leave this page and return to previous one.
- Arrivals page MyStop choice, to toggle a bus stop between favourite or not.
- Implementation of useStorage hook to save user favourites (simulates a localStorage using SQLite underneath).
- MyStops page, offering instant access to the favourite stops and their arrivals.
- Implementation of useOrientation hook to detect the portrait or landscape orientation of the device.
- App presentation in html.
