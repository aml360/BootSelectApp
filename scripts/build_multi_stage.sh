#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO

cd ../

docker build bootselectbackend -f dockerfile.stages .
