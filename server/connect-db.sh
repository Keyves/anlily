#!/bin/sh
folder=$(cd "$(dirname "$0")"; pwd)/.db
if [ ! -d $folder ]; then
	mkdir $folder
fi
mongod --dbpath $folder & redis-server
