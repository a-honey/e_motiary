import multer from 'multer';
import path from 'path';

const FileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (
    (file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')) &&
    (file.mimetype === 'video/mp4' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png')
  ) {
    cb(null, true);
  } else {
    //TODO 이젠 생각해야할 시간인 것 같아요
    cb(new Error('나중에 생각'), false);
  }
};

const fileStorage = multer.diskStorage({
  destination: './fileUpload/',
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const fileUploadMiddleware = multer({
  storage: fileStorage,
  fileFilter: FileFilter,
}).array('filesUpload', 5);

export { fileUploadMiddleware };
