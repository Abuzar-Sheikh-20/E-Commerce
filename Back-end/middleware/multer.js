import multer from 'multer';    // multer is a package for file uploads

const storage = multer.diskStorage({      // defines the storage for local disk
  // destination: (req, file, callback) => {
  //   callback(null, 'uploads/'); // Ensure this folder exists or change it to an existing folder
  // },
  
  filename: function(req, file, callback) {
    callback(null, file.originalname)     // keep the original file name
  }
})

const upload = multer({storage});   //

export default upload;