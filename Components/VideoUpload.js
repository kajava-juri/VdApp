export default function VideoUploadForm({onChange}){
    const onChangeHandler = (event) => {
        if (!event.currentTarget.files?.length) {
          return;
        }
    
        const formData = new FormData();
    
        Array.from(event.target.files).forEach((file) => {
          formData.append(event.target.name, file);
        });
    
        onChange(formData);
    
      }

    return(
        <form>
            <input
            onChange={onChangeHandler}
            type="file"
            name="filesToUpload"
            multiple={true}
            />
      </form>
    )
}