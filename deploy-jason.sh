#!/bin/bash

for option in "$@"
  do
    case "$option" in
      "publish")
        echo 'start build to github then publish on npm'
        yarn build
        npm version patch
        cd ~/Documents/
        git clone https://github.com/iStaging/vrviewer-sdk.git
        cd vrviewer-sdk/
        rm -rf dist/
        mkdir dist
        cp -R ~/Documents/workspace/vrviewer-sdk/dist/vrviewer-sdk.css dist/vrviewer-sdk.css
        cp -R ~/Documents/workspace/vrviewer-sdk/dist/vrviewer-sdk.js dist/vrviewer-sdk.js
        git add .
        git commit -am "update js and css in dist file"
        npm version patch
        npm publish
        git push
        cd ..
        rm -rf vrviewer-sdk/
        cd ~/Documents/workspace/vrviewer-sdk/

        echo 'end publish'
        ;;

      *)
        echo "Invalid choice made!"
  esac
done
