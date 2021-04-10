aws s3 rm s3://$BUCKET_NAME/ --recursive
aws s3 cp ClientQ/build s3://$BUCKET_NAME --recursive


exit;