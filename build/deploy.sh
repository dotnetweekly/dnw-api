rm -rf ../wwwroot/*

cp -R ./* ../wwwroot/

cd ../wwwroot
npm install --only=production
