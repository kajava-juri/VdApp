export default function VideoModal({open, source, onClose, children}){
    if (!open)
        return null;

    return(
        <div>
            <style jsx>{`
            /* The Modal (background) */
            .vdmodal {
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                padding-top: 100px; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0);
            }
            
            /* Modal Content (image) */
            .vdmodalContent {
                display: block;
                margin: auto;
                width: 90%;
            }
            
            /* Caption of Modal Image */
            #caption {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                text-align: center;
                color: #ccc;
                padding: 10px 0;
                height: 150px;
            }
            
            /* The Close Button */
            .vdclose {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                transition: 0.3s;
            }
            
                .vdclose:hover,
                .vdclose:focus {
                    color: #bbb;
                    text-decoration: none;
                    cursor: pointer;
                }
            
            /* 100% Image Width on Smaller Screens */
            @media only screen and (max-width: 700px) {
                .vdmodalContent {
                    width: 100%;
                }
            }

            `}
            </style>
            <div id="myModal" className="vdmodal">
                <span className="vdclose" onClick={onClose}>&times;</span>
                <video height="400" className="vdmodalContent" controls>
                    <source src={`videos/${source}`}></source>
                </video>
                {children}
                <div id="caption">lorem ipsum dolar sit amet</div>

            </div>
        </div>


    )
}