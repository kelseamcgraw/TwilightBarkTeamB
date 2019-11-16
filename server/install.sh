#setup script for ubuntu server 
# need to add ssh key to github before running and must be run with sudo
apt-update && apt update -y;

apt install mariadb-server;

apt install nodejs;

apt install nginx;

apt install npm;

eval `ssh-agent -s`;

git clone git@github.com:kelseamcgraw/TwilightBarkTeamB.git;

mkdir /home/ubuntu/TwilightBark/server/static/images;

chown ubuntu:ubuntu -R /home/ubuntu/TwilightBark;

npm install -g pm2;

mysql -u root -p -e "use mysql;";

mysql -u root -p -e "update user set authentication_string=password(''),plugin='mysql_native_password' where user='root';";

mysql -u root -p -e "flush privileges;";

mysql -u root -p -e "create database twilightBark;"

echo -n "TOKEN_KEY = " > /home/ubuntu/TwilightBark/server/.env;

openssl rand -hex 48 >> /home/ubuntu/TwilightBark/server/.env;

chown ubuntu:ubuntu /home/ubuntu/TwilightBark/server/.env;

pm2 start /home/ubuntu/TwilightBark/server/server.js;

pm2 startup systemd;

apt-get install software-properties-common;
add-apt-repository ppa:certbot/certbot;
apt-get update;
apt-get install letsencrypt;
