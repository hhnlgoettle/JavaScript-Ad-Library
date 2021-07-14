# InteractionRewardingAdsJSLib

This library provides features used for Interaction Rewarding Ads.
The purpose of this library is to be included in a HTML5-Ad (or "creative").

This library keeps track of interactions by the user with the ad. 
These interactions are then reported to the Ad Library at the end of the ads lifecycle.

## Requirements

- Clone the repo
- run `npm install` to install dependencies

To run gulp tasks install gulp
- run `npm install --global gulp-cli`

## Build

- run `npm run build`

A browser-friendly, bundled file will be produced using browserify.
The produced file is found in `build/release.js`

## Test

To run all test, execute `npm run test`

To run unit tests exclusively, run `npm run test:unit`

To run integration tests exclusively, run `npm run test:integration`

To run end-to-end tests exclusively, run `npm run test:e2e`

# Deployment 

Note: This requires you to have ssh key stored on your machine to access user ira on trustmeimansoftware.engineer
This further requires you to have rsync or a compatible tool installed on your machine.

To deploy run `npm run deploy`.

The deployed version can be accessed under `cdn.trustmeimansoftware.engineer/ira/release.js`

## License

The license can be found under `LICENSE`.
