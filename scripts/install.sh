sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start

# https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/install-cliv2-linux.html
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install