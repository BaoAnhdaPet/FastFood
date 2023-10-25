import {
    DeleteObjectCommand,
    type DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { s3Client } from '~/libs/server/s3';

export const deleteImage = async (fullUrl: string) => {
    const splittedUrl = fullUrl.split('/');
    const imageKey = splittedUrl[splittedUrl.length - 1];

    const params: DeleteObjectCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageKey,
    };

    return s3Client.send(new DeleteObjectCommand(params));
};
