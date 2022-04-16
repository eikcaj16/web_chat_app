import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const ID = "AKIA3D4T6JZBVJE7DH7R";
const SECRET = "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";
const BUCKET_NAME = "info6150-msg-app"

const s3 = new aws.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

export const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: "TESTING_METADATA"});
        },
        key: function (req, file, cb) {
            cb(null, `profile_img/${req.params.id}${path.extname(file.originalname)}`);
        },
    }),
});

export const getObjectsFromS3 = (id, cb) => {
    s3.listObjects({Bucket: BUCKET_NAME}, (err, data) => {
        if (err) {
            throw Error("s3-get-error");
        } else {
            cb(data.Contents);
        }
    });
}

export default upload;