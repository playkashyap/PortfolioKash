import './error.scss';

const Error = () => {

    document.body.style.backgroundColor = "#000000";
    document.body.style.overflow = "hidden";    

    return (
        <div className="color">
            <div className='error2'>
                <div className="error">
                    <div className="404">
                        <pre>
                            <span className="info">
                            </span>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;