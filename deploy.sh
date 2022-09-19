# !/bin/bash

echo "Run this script with sudo, sleep for 10 seconds for checking what command above-used"
sleep 10

apt-get update

# Create remote folder or directory, pass all local env files to remote with pscp, 
# and watch out <remote password> <local file path> <remote username> <remote file path>
# pscp -pw <remote password> <local file path> <remote username>@<remote ip>:<remote file path>
# pscp -pw XK@Bizm!6KDv .\ubuntu-server.sh deploy@10.2.10.130:/home/deploy/setting.sh
# pscp -pw XK@Bizm!6KDv .\iot\mosquitto\config\mosquitto.conf deploy@10.2.10.130:/home/deploy/mosquitto.conf



############################             not used             #####################################
#### pscp -pw XK@Bizm!6KDv .\backend\.env deploy@10.2.10.130:/home/deploy/backend.env
#### pscp -pw XK@Bizm!6KDv .\drawer\.env deploy@10.2.10.130:/home/deploy/drawer.env
#### pscp -pw XK@Bizm!6KDv .\frontend/my-app\.env deploy@10.2.10.130:/home/deploy/frontend.env
############################             not used             #####################################



# ! not using docker compose

# install python
echo "====================       python start       ================================="
apt-get install -y python3 python3-pip
echo "====================       python end       ================================="

# install node.js
echo "====================       nodejs start       ================================="
wget -qO- https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
echo "====================       nodejs end       ================================="

# install pm2
echo "====================       pm2 start       ================================="
npm install pm2@latest -g
pm2 update
echo "====================       pm2 end       ================================="

echo "====================       mysql start       ================================="
# install & set MySQL config variable
wget https://dev.mysql.com/get/mysql-apt-config_0.8.20-1_all.deb
debconf-set-selections <<< "mysql-server mysql-server/root_password password <password>"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password <password>"
dpkg -i mysql-apt-config_0.8.20-1_all.deb
apt update
apt install -y mysql-server
mysql -uroot exec "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by '<password>';"
echo "====================       mysql end       ================================="

# install & set mosquitto
echo "====================       mosquitto start       ================================="
sudo apt install software-properties-common
apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
apt-get update
apt-get install -y mosquitto
touch /etc/mosquitto/passwd
# mosquitto_passwd -c <file_path> <username> <password>
# mosquitto_passwd -b <file_path> <username> <password>
systemctl restart mosquitto.service

echo "====================       mosquitto end       ================================="

# git clone
#echo "====================       git start       ================================="
#apt-get install -y git
#echo "====================       git end       ================================="


#################################################################################################################################################


# ! using docker compose
# apt-get install -y ca-certificates curl gnupg lsb-release
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# echo \
#   "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# apt-get update
# apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin