@echo off
setlocal

set "SourceFolder=DATA"
set "ZipFile=DATA.zip"

if exist "%ZipFile%" del "%ZipFile%"

pushd "%SourceFolder%"
7z a -tzip "..\%ZipFile%" * -mx=1 -mmt=on -r -bb0 >nul
popd

echo Done!
