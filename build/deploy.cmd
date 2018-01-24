
xcopy /d %DEPLOYMENT_SOURCE%\* %DEPLOYMENT_TARGET%\ /s /i

call cd %DEPLOYMENT_TARGET% 
call npm install --only=production

echo Finished successfully.  