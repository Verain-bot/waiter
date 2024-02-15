import logging
import os
import boto3
import sys
import time
from botocore.exceptions import ClientError

folder_path = "/Users/verainsardana/Desktop/Developer/waiter/res-admin-dashboard/build"
bucket_name = "dashboard.toone.in"

sys.argv.pop(0)

#If arguments contain --build then run the build command
if "--build" in sys.argv:
    print('Running build command...')
    os.system('bun run build')
    sys.argv.remove('--build')

time.sleep(1)

if "--nodeploy" in sys.argv:
    print('Skipping deployment...')
    sys.argv.remove('--nodeploy')
    sys.exit()

#run command on terminal
x = input('Upload Static Files?(y/n)')
if x.capitalize().startswith('Y'):
    print('Uploading out folder to S3 Bucket excluding html files...')
    print('aws s3 sync {folder_path} s3://{bucket_name} --exclude "*.html"\n\n')
    os.system(f'aws s3 sync {folder_path} s3://{bucket_name} --exclude "*.html"')

client = boto3.client('s3')
args = {
    'ContentType': "text/html",
    }

print('\n\n\nNow uploading remaining HTML files to S3 Bucket\n')

for filename in os.listdir(folder_path):
    if filename.endswith(".html"):
        try:
            print('Uploading file: ' + filename)
            response = client.upload_file(os.path.join(folder_path, filename),bucket_name, filename, ExtraArgs=args)
            print('Uploaded', filename)
        except ClientError as e:
            logging.error(e)