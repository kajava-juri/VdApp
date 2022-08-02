export default function VideoModal({open, source, onClose, children}){
    console.log(open);
    if (!open)
        return null;

    return(
        <div>
            
            <div id="myModal" class="modal">
                <span class="close" onClick={onClose}>&times;</span>
                <video height="210" className="myVid" onClick={() => handleFullscreen(file)}>
                    <source src={`public/videos/${source}`}></source>
                </video>
                {children}
                <div id="caption">lorem ipsum dolar sit amet</div>

            </div>
        </div>


    )
}