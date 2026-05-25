@echo off
setlocal enabledelayedexpansion

set "SourceFolder1=DATA"
set "ZipFile1=DATA.zip"

set "SourceFolder2=RESOURCE"
set "ZipFile2=RESOURCE.zip"

set "VersionFile=Version.txt"

if exist "%VersionFile%" (
	for /f "tokens=*" %%a in ('type "%VersionFile%"') do set "Version=%%a"
	set /a "Version+=1"
) else (
	set "Version=1"
)
<nul set /p "=%Version%" > "%VersionFile%"
echo Version updated to: %Version%

REM ZIP 1
if exist "%SourceFolder1%" (
	echo Zipping %ZipFile1%...
	if exist "%ZipFile1%" del "%ZipFile1%"
	pushd "%SourceFolder1%"
	7z a -tzip "..\%ZipFile1%" * -mx=1 -mmt=on -r -bb0
	popd
	echo %ZipFile1% created
) else (
	echo WARNING: %SourceFolder1% not found!
)

REM ZIP 2
if exist "%SourceFolder2%" (
	set "BUSY=0"
	
	if exist "%ZipFile2%" (
		rename "%ZipFile2%" "%ZipFile2%.locked" 2>nul
		if errorlevel 1 (
			set "BUSY=1"
			echo WARNING: "%ZipFile2%" is busy! Skipping...
		) else (
			rename "%ZipFile2%.locked" "%ZipFile2%" 2>nul
		)
	)
	
	if "!BUSY!"=="0" (
		echo Zipping %ZipFile2%...
		if exist "%ZipFile2%" del "%ZipFile2%"
		pushd "%SourceFolder2%"
		7z a -tzip "..\%ZipFile2%" * -mx=1 -mmt=on -r -bb0
		popd
		echo %ZipFile2% created
	)
) else (
	echo WARNING: %SourceFolder2% not found!
)

echo Done! Version: %Version%