import Header from '../components/Header';

function Contact(props) {
    return (
        <div id="container" className={props.pageName}>
            <Header></Header>
            <div className="inner">
                <div className="title-block">
                    <h3 className="title-num">1.</h3>
                    <h2 className="title">어떤 프로젝트를 문의하고 싶으신가요?</h2>
                    <p className="title-desc">(중복 선택이 가능합니다.)</p>
                </div>
                <div className="select-block">
                    <div className="inner">
                        <button>Compaign Site</button>
                        <button>Viral Video</button>
                        <button>Social media</button>
                        <button>Short Video</button>
                        <button>Goods</button>
                        <button>Photography</button>
                        <input type="text" placeholder="입력하시오" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
