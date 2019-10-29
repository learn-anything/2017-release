#!/bin/bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python-certbot-nginx docker.io nginx

sudo usermod -a -G docker ubuntu

sudo cp ~/server-stuff/nginx.conf /etc/nginx/nginx.conf

sudo systemctl enable docker
sudo systemctl enable nginx
sudo systemctl start docker
sudo systemctl start nginx

# Just in case I need to spend the night on the ec2, might as well
# make myself comfy.
ln -s ~/server-stuff/.tmux.conf ~/.tmux.conf
ln -s ~/server-stuff/.vimrc ~/.vimrc

echo 'source ~/server-stuff/aliases' >> ~/.bashrc

# https://certbot.eff.org/all-instructions/#ubuntu-16-04-xenial-nginx
# sudo certbot --nginx
# sudo certbot renew --dry-run
# sudo certbot renew
echo 'logout and login again'
