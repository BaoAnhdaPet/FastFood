import {
    ListObjectsCommand,
    type ListObjectsCommandInput,
} from '@aws-sdk/client-s3';
import { s3Client } from '~/libs/server/s3';

export const getImageKeyList = async () => {
    const params: ListObjectsCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME,
    };
    const output = await s3Client.send(new ListObjectsCommand(params));
    return (
        (output.Contents?.map((obj) => obj.Key).filter(Boolean) as string[]) ??
        []
    );
};
