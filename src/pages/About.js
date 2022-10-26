// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from './../store.js';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';
// import lottie from 'lottie-web';
import Lottie from 'lottie-react';
import animationData from '../about_title_animation.json';

function About(props) {
    gsap.registerPlugin(ScrollTrigger);
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    console.log(themeColor);
    let dispatch = useDispatch();

    useEffect(() => {
        // const container = document.querySelector('#anim-container');
        console.log('어바웃 마운트');
        dispatch(changeColor('black'));

        let tl = gsap.timeline({
            // yes, we can add it to an entire timeline!
            scrollTrigger: {
                // trigger: '#scroll-animation_container',
                trigger: '#scroll-animation_container .ani-block._01',
                pin: true, // pin the trigger element while active
                start: 'top top', // when the top of the trigger hits the top of the viewport
                // end: '+=500', // end after scrolling 500px beyond the start
                // start: 'center center',
                // end: 'bottom top',
                end: 'bottom top',
                markers: true,
                scrub: true,
                // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                // snap: {
                //     snapTo: 'labels', // snap to the closest label in the timeline
                //     duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                //     ease: 'power1.inOut', // the ease of the snap animation ("power3" by default)
                // },
            },
        });
        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._02',
                pin: true,
                start: 'top top',
                end: 'bottom top',
                markers: true,
                scrub: true,
            },
        });

        // lottie.loadAnimation({
        //     container: container,
        //     renderer: 'svg',
        //     // loop: true,
        //     autoplay: true,
        //     // animationData: '/public/about_title_animation.json'
        //     animationData: animationData
        // })

        tl.addLabel('start')
            .to('.ani-box._01 .title', { autoAlpha: 0, duration: 0.3, delay: 0.3 }, 'start')
            .set('#scroll-animation_container', { backgroundColor: '#ffffff' })
            // .set('.ani-box._03 .typo-element .typo-wrap', {yPercent: 30})
            .addLabel('scale-down')
            .to('.ani-box._01', { width: 280, height: 280, duration: 1 }, 'scale-down')
            .to('.ani-box._01 .desc-block .desc', { autoAlpha: 1, duration: 0.2 }, 'scale-down+=0.2')
            .to('.ani-box._01 .desc-block .desc', { fontSize: 12, duration: 0.5 }, 'scale-down+=0.5');
        // .addLabel('section-move')
        // .to('.ani-block._01', { y: '-100vh', duration: 0.8}, 'section-move')
        // .to('.ani-box._03', { y: '-100vh', duration: 0.6}, 'section-move')
        // .addLabel('typo-scale-down')
        // .to('.ani-box._03 .typo', { fontSize: 40, duration: 1, onUpdate: function() {
        //     // console.log(this._targets[0].style.fontSize);
        //     // console.log(this.ratio);
        //     // if(this.ratio > 0.95) {
        //     //     let tl = gsap.timeline({});
        //     //     tl.addLabel('show-typo1')
        //     //     .to('.ani-box._03 .typo._02', {autoAlpha: 1, duration: 0.5}, 'show-typo1')
        //     //     .addLabel('show-typo2')
        //     //     .to('.ani-box._03 .typo._03', {autoAlpha: 1, duration: 0.5}, 'show-typo2')
        //     // }
        // }}, 'typo-scale-down')
        // .to('.ani-box._03 .typo-element .typo-wrap', {yPercent:-50, duration:0.3})
        // .addLabel('show-typo1')
        // .to('.ani-box._03 .typo._02', {autoAlpha: 1, duration: 0.5}, 'show-typo1')
        // .to('.ani-box._03 .typo-element .typo-wrap', {yPercent:-100, duration:0.3})
        // .addLabel('show-typo2')
        // .to('.ani-box._03 .typo._03', {autoAlpha: 1, duration: 0.5}, 'show-typo2')

        tl2.addLabel('start')
        .addLabel('typo-scale-down')
        .to('.ani-box._03 .typo', { fontSize: 40, duration: 1}, 'typo-scale-down')
        .to('.ani-box._03 .typo-element .typo-wrap', {yPercent:-50, duration:0.3})
        .addLabel('show-typo1')
        .to('.ani-box._03 .typo._02', {autoAlpha: 1, duration: 0.5}, 'show-typo1')
        .to('.ani-box._03 .typo-element .typo-wrap', {yPercent:-100, duration:0.3})
        .addLabel('show-typo2')
        .to('.ani-box._03 .typo._03', {autoAlpha: 1, duration: 0.5}, 'show-typo2')
        return () => {
            console.log('어바웃 언마운트');
        };
    }, []);

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeIn', duration: 0.7 }} exit={{ opacity: 0 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                <div className="inner">
                    <div className="cover-section">
                        {/* <div id="anim-container"></div> */}
                        <div className="title">
                            <Lottie animationData={animationData} loop={true} />
                        </div>
                    </div>
                    <div id="scroll-animation_container">
                        <div className="inner">
                            <div className="ani-block _01">
                                <div className="ani-box _01">
                                    <p className="title">
                                        미니버타이징
                                        <br />
                                        사용설명서
                                    </p>
                                    <div className="desc-block">
                                        <p className="desc">
                                            잘빠진 디자인, 세련된 영상, 전환율까지 고려한 사이트 제작 필요 맞춤 형태의 광고제작도 잘 한다지만 남다르게 소비될 아이디어를 요청해보세요.
                                        </p>
                                        <p className="desc">
                                            깊이 있게 관찰하여 제안합니다. 새로운 전략으로 브랜드가 사랑 받을아이디어를 기어코 가지고 옵니다. 당신의 브랜드가 잘 되는 것이 우리의 일입니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="ani-box _02">
                                    <div className="typo-element">
                                        <div className="typo-wrap">
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '-100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 120,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '-100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 120,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                        </div>
                                        <div className="typo-wrap">
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 120,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 120,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ani-block _02">
                                <div className="ani-box _03">
                                    <div className="typo-element">
                                        <div className="typo-wrap">
                                            <div className="typo _01">
                                                <span>미니버타이징은</span>
                                            </div>
                                            <div className="typo _02">
                                                <span>대행사니까</span>
                                            </div>
                                            <div className="typo _03">
                                                <span>프로덕션입니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slide"></div>
                            <div className="slide2"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default About;
