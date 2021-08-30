#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO
cd ../docker

docker build -t bootselectbuilder -f dockerfile.builder .

