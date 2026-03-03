@echo off
title Electron College - Queue Management System
color 0B
echo =========================================================
echo    ELECTRON COLLEGE - QUEUE MANAGEMENT SYSTEM (Local)
echo =========================================================
echo.
echo  [1/2] Checking system environment...
echo.
echo  [2/2] Launching System at http://localhost:5001
echo.
echo  NOTE: Please keep this window open while using the system.
echo        To stop the system, close this window.
echo.
echo =========================================================

:: This line tells Windows to open the browser to your system URL
start http://localhost:5001

:: This starts your server
node server.js
pause