const cloudinary = require("cloudinary");


cloudinary.config({
    cloud_name: "dgbqhmzxg",
    api_key: "392785572275385",
    api_secret: "vG3sK5z8lLSqL_hCND-Gjj9cs80"
});

// Upload
const uploadImage = async (fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            resolve({
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
            },
                {
                    resource_type: "auto"
                }
            );
        })
    })
}

//delete
const deleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve(
                {
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};

module.exports = { uploadImage, deleteImg };