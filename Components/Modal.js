export default function Modal({open, children}){
    if (!open)
        return null;
    return(
        <div>
            <style jsx>{`
                /* The Modal (background) */
                .modal {

                    position: fixed; /* Stay in place */
                    z-index: 1; /* Sit on top */
                    padding-top: 100px; /* Location of the box */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0,0,0); /* Fallback color */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                }
                
                /* Modal Content */
                .modal-content {
                    background-color: #fefefe;
                    margin: auto;
                    margin-top: 10%;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }
                
            `}</style>

            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>

    )
}