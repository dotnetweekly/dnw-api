for /d %%D in (%DEPLOYMENT_TARGET%\*) do (
    if not "%%~nxD" == "node_modules" (
        del /S /Q "%%~D"
        IF "%ERRORLEVEL%" NEQ "0" goto error
    )
)
for %%D in (%DEPLOYMENT_TARGET%\*) do (
    del /S /Q "%%~D"
    IF "%ERRORLEVEL%" NEQ "0" goto error
)

xcopy /d %DEPLOYMENT_SOURCE%\* %DEPLOYMENT_TARGET%\ /s /i

call cd %DEPLOYMENT_TARGET% 
call npm install --only=production

echo Finished successfully.  