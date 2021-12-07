#!/bin/bash

confpath=/www/site/config.js

# Recreate config file
rm -rf ${confpath}
touch ${confpath}

# Add assignment
echo "API_URL = '$API_URL';" >> ${confpath}
