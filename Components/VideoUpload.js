const axios = require('axios').default;

export default function VideoUploadForm({router}){
    const onChangeHandler = async (event) => {
        if (!event.currentTarget.files?.length) {
          return;
        }
    
        const formData = new FormData();

        
    
        Array.from(event.target.files).forEach((file) => {
          formData.append(event.target.name, file);
        });
    
        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        };
    
        const response = await axios.post('/api/fileUploads', formData, config);
        console.log(response);
        router.reload()
    
      }

    return(
        <form>
            <input
            onChange={onChangeHandler}
            type="file"
            accept='video/*, image/gif'
            name="filesToUpload"
            multiple={true}
            />
      </form>
    )
}