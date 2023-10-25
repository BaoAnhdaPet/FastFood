import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_BUCKET_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY as string,
    },
    region: process.env.S3_BUCKET_REGION,
});
