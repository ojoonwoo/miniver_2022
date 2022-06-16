import { Link } from 'react-router-dom';

function WorkBox(props) {
    return (
        <div className="workbox">
            <Link to="/" className="logo">
                <div className="wrapper">
                    <div className="item-img">
                        <img src={`works/${props.item.thumb_rectangle}`}></img>
                    </div>
                    <div className="box-overlay">
                        <div className="logo-img" style={{backgroundImage: `url(works/${props.item.logo_img})`}}></div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default WorkBox;