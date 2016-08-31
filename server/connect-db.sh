#!/bin/sh
mongod --dbpath $(cd "$(dirname "$0")"; pwd)/.db
