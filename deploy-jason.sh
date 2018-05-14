#!/bin/bash

for option in "$@"
  do
    case "$option" in
      "publish")
        echo 'start build to github then publish on npm'
        yarn build
        npm version patch
        cd ~/Documents/
        git clone https://github.com/iStaging/vreditor-sdk.git
        cd vreditor-sdk/
        rm -rf dist/
        mkdir dist
        cp -R ~/Documents/workspace/vreditor-sdk/dist/vreditor-sdk.css dist/vreditor-sdk.css
        cp -R ~/Documents/workspace/vreditor-sdk/dist/vreditor-sdk.js dist/vreditor-sdk.js
        git add .
        git commit -am "update js and css in dist file"
        npm version patch
        npm publish
        git push
        cd ..
        rm -rf vreditor-sdk/
        cd ~/Documents/workspace/vreditor-sdk/

        echo 'end publish'
        ;;

      *)
        echo "Invalid choice made!"
  esac
done
