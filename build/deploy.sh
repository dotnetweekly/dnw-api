cp -R "$DEPLOYMENT_SOURCE/*" "$DEPLOYMENT_TARGET/"
cd "$DEPLOYMENT_TARGET"
npm install --only=production