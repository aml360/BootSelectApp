#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO

cd ../

docker run -v $PWD:/builder --rm bootselectbuilder /bin/sh -c "$(cat scripts/dkBuilderCommand.sh)"
