@echo off
setlocal

set "SourceFolder=DATA"
set "ZipFile=DATA.zip"
set "VersionFile=Version.txt"

if exist "%ZipFile%" del "%ZipFile%"

if exist "%VersionFile%" (
	for /f "tokens=*" %%a in ('type "%VersionFile%"') do set "Version=%%a"
	set /a "Version+=1"
) else (
	set "Version=1"
)
<nul set /p "=%Version%" > "%VersionFile%"
echo Version updated to: %Version%

pushd "%SourceFolder%"
7z a -tzip "..\%ZipFile%" * -mx=1 -mmt=on -r -bb0 >nul
popd

echo Done! Version: %Version%