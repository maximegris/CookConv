1) Add android platform with the CLI :
ionic platform add android

2)Now navigate to platforms/android with the CLI :
cd platforms/android

3) Generate a key.store file with the CLI and answer all the questions:
keytool -genkey -v -keystore YourApp.keystore -alias YourApp -keyalg RSA -keysize 2048 -validity 10000
To avoid having to build, sign, then zipalign we can accomplish all three in one step by doing the following.

4) In the platforms/android directory create a file called ant.properties if it doesn’t already exist. Add the following to the file to contain your key.store:
key.store=YourApp.keystore
key.alias=YourApp

5) Create a secure.properties file to contain your passwords.
key.store.password=<YourApp keystore password>
key.alias.password=<YourApp alias password>

6) Add the following lines inside the tag to your custom_rules.xml file to tell the build system about your secure.properties file.
<property file="secure.properties" />

7) Now go back to the root of your Ionic project with the CLI and build a release version:
cd ..
cd ..
ionic build android --release