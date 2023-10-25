import {
    PutObjectCommand,
    type PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '~/libs/server/s3';

export const getPreSignedUrl = async (id: string) => {
    const params: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: id,
        ContentType: 'image/*',
        ACL: 'public-read',
    };
    const command = new PutObjectCommand(params);
    console.log(params);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return await getSignedUrl(s3Client, command);
};
