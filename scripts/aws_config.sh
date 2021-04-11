# aws configure
aws configure set profile.quest.region $REGION
aws configure set profile.quest.aws_access_key_id $ACCESS_KEY  
aws configure set profile.quest.aws_secret_access_key $SECRET_KEY
aws configure --profile quest

exit;