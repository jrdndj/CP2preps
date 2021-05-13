#!/bin/bash

package1='connect'
package2='socket.io'
package3='express'
if [ "npm list -g | grep -c $package1" -eq 0 ]; then
	npm install $package1
fi
if [ "npm list -g | grep -c $package2" -eq 0 ]; then
	npm install $package2
else
	npm run start
fi
if [ "npm list -g | grep -c $package3" -eq 0 ]; then
	npm install $package3
else
	npm run start
fi
