@echo off

echo %~dp0.db

if not exist %~dp0.db mkdir %~dp0.db

mongod --dbpath %~dp0.db
