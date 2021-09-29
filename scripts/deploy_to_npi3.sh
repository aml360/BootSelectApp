#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO

REMOTE=neo3@192.168.1.12

cd ../
docker save -o bootselectbackend.tar bootselectbackend
scp bootselectbackend.tar $REMOTE:~/dkImages/ &
scp -r FrontEnd/dist/FrontEnd/* $REMOTE:~/dkVolumes/bootselect/ngdist &

wait



ssh -T $REMOTE << 'ENDSSH'
cd ~/dkImages/;
docker load -i bootselectbackend.tar;
docker stop bootselectbackend;
docker rm bootselectbackend;

docker container create --name=bootselectbackend -v ~/dkVolumes/bootselect/ngdist:/app/ngDist --restart=always --network=bootselect bootselectbackend;
docker network connect reverse-proxy bootselectbackend;
docker start bootselectbackend;

ENDSSH

