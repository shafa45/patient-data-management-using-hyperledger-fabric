#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# This script is designed to be run in the org3cli container as the
# second step of the EYFN tutorial. It joins the hospital3 peers to the
# channel previously setup in the BYFN tutorial and install the
# chaincode as version 2.0 on peer0.hospital3.
#

echo
echo "========= Getting Hospital3 on to your test network ========= "
echo
CHANNEL_NAME="$1"
DELAY="$2"
TIMEOUT="$3"
VERBOSE="$4"
: ${CHANNEL_NAME:="hospital-channel"}
: ${DELAY:="3"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
COUNTER=1
MAX_RETRY=5

# import environment variables
. scripts/hospital3-scripts/envVarCLI.sh

## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  HOSPITAL=$1
  setGlobals $HOSPITAL

  set -x
  peer channel join -b $CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer0.hopsital${HOSPITAL} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry $PEER $HOSPITAL
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer0.hopsital${HOSPITAL} has failed to join channel '$CHANNEL_NAME' "
}


echo "Fetching channel config block from orderer..."
set -x
peer channel fetch 0 $CHANNEL_NAME.block -o orderer.geakminds.com:7050 --ordererTLSHostnameOverride orderer.geakminds.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA >&log.txt
res=$?
set +x
cat log.txt
verifyResult $res "Fetching config block from orderer has Failed"

joinChannelWithRetry 3
echo "===================== peer0.hospital3 joined channel '$CHANNEL_NAME' ===================== "

echo
echo "========= Finished adding Hospital3 to your test network! ========= "
echo

exit 0
