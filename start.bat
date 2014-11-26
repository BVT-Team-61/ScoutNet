@echo off
cd %~dp0
ipconfig | findstr "IPv4 Address"
npm start