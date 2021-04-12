# cd Infra
echo "region=\"$REGION\"" >> terraform.tfvars
echo "access_key=\"$ACCESS_KEY\"" >> terraform.tfvars
echo "secret_key=\"$SECRET_KEY\"" >> terraform.tfvars
echo "crtARN=\"$crtARN\"" >> terraform.tfvars
echo "app_image=\"$app_image\"" >> terraform.tfvars
echo "bucket=\"$BUCKET_NAME\"" >> terraform.tfvars

# terraform init -input=false
# terraform apply -input=false -auto-approve

aws s3 rm s3://$BUCKET_NAME/ --recursive
aws s3 cp ClientQ/build s3://$BUCKET_NAME --recursive

exit;