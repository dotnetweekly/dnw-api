rm -rf ../wwwwroot/*

cp -R ./ ../wwwroot/

cd ../wwwroot
npm install --only=production
