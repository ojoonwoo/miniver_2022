// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeColor } from './../store.js';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PageTransition from '../components/PageTransition';
import WorkBox from '../components/WorkBox';
import Footer from '../components/Footer';
// import lottie from 'lottie-web';
import Lottie from 'lottie-react';
import animationData from '../about_title_animation.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function About(props) {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    console.log(themeColor);
    let dispatch = useDispatch();

    let device = useSelector((state) => {
        return state.currentDevice;
    });

    const [workList, setWorkList] = useState([]);
    const [activeSlide, setActiveSlide] = useState('development');

    const sliderWrapperRef = useRef(null);

    useEffect(() => {
        // const container = document.querySelector('#anim-container');
        console.log('어바웃 마운트');
        dispatch(changeColor('black'));
        async function getProjectData() {
            const workList = await axios({
                method: 'get',
                url: '/api/work/getlist',
                params: { limit: 3 },
            });
            console.log(workList.data.list);
            setWorkList(workList.data.list);
        }
        getProjectData();
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
                // markers: true,
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
        tl.addLabel('start')
            .to('.ani-box._01 .title', { autoAlpha: 0, duration: 0.3, delay: 0.3 }, 'start')
            // .set('#scroll-animation_container', { backgroundColor: '#ffffff' })
            .to('.ani-box._01', { width: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', height: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', duration: 1 }, 'scale-down')
            .to('.ani-box._01 .desc-block .desc', { autoAlpha: 1, duration: 0.2 }, 'scale-down+=0.2')
            .to('.ani-box._01 .desc-block .desc', { fontSize: window.innerWidth < 1200 ? 1.2 + 'rem' : 2.5 + 'rem', duration: 0.5 }, 'scale-down+=0.5');

        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._02',
                pin: true,
                start: 'top top',
                end: 'bottom top',
                // markers: true,
                scrub: true,
            },
        });
        tl2.addLabel('start')
            .set('.ani-box._03 .typo', { scale: window.innerWidth < 1200 ? 20 : 8 })
            .addLabel('typo-scale-down')
            // .to('.ani-box._03 .typo', { fontSize: window.innerWidth < 1200 ? 4 + 'rem' : 13 + 'rem', duration: 1 }, 'typo-scale-down')
            .to('.ani-box._03 .typo', { scale: 1, duration: 1 }, 'typo-scale-down')
            .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -50, duration: 0.3 })
            .addLabel('show-typo1')
            .to('.ani-box._03 .typo._02', { autoAlpha: 1, duration: 0.5 }, 'show-typo1')
            .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -100, duration: 0.3 })
            .addLabel('show-typo2')
            .to('.ani-box._03 .typo._03', { autoAlpha: 1, duration: 0.5 }, 'show-typo2');
        // .set('#scroll-animation_container', { backgroundColor: '#000000' });

        let tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._03',
                pin: true,
                start: 'top top',
                end: 'bottom+=1000 top',
                // markers: true,
                scrub: true,
            },
        });

        tl3.addLabel('start', '+=2')
            .to('.ani-block._03 .director-box._01', { autoAlpha: 1, y: 0, duration: 1 }, 'start')
            .to('.ani-block._03 .director-box._01 .img-box', { autoAlpha: 1, duration: 1 }, 'start+=0.4')
            .to('.ani-block._03 .director-box._01 .img-box', { y: 0, duration: 1 }, 'start+=0.5')
            .to('.ani-block._03 .director-box._01 .text-box .desc', { autoAlpha: 1, duration: 1 }, 'start+=0.5')
            .to('.ani-block._03 .director-box._01 .text-box .desc', { y: 0, duration: 1 }, 'start+=0.6')
            .to('.ani-block._03 .director-box._01 .text-box .title', { autoAlpha: 1, duration: 1 }, 'start+=0.6')
            .to('.ani-block._03 .director-box._01 .text-box .title', { y: 0, duration: 1 }, 'start+=0.7')
            .addLabel('box-01-out', '+=5')
            .addLabel('box-02-in', '+=8')
            .to('.ani-block._03 .director-box._01', { autoAlpha: 0, y: '-2rem', duration: 3 }, 'box-01-out')
            .to('.ani-block._03 .director-box._02', { autoAlpha: 1, y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in' : 'start')
            .to('.ani-block._03 .director-box._02 .img-box', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.4' : 'start+=0.4')
            .to('.ani-block._03 .director-box._02 .img-box', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.5' : 'start+=0.5')
            .to('.ani-block._03 .director-box._02 .text-box .desc', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.5' : 'start+=0.5')
            .to('.ani-block._03 .director-box._02 .text-box .desc', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.6' : 'start+=0.6')
            .to('.ani-block._03 .director-box._02 .text-box .title', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.6' : 'start+=0.6')
            .to('.ani-block._03 .director-box._02 .text-box .title', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.7' : 'start+=0.7')
            .addLabel('box-02-out', '+=5')
            .to('.ani-block._03 .director-box._02', { autoAlpha: 0, y: '-2rem', duration: 3 }, window.innerWidth < 1200 ? 'box-02-out' : 'box-01-out');

        let tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .work-block',
                start: 'top-=50 top',
                end: 'bottom top',
                // markers: true,
                onLeaveBack: function () {
                    tl4.reverse();
                },
            },
        });
        tl4.addLabel('start').to(window.innerWidth < 1200 ? '.text-section .desc span' : '.text-section .desc .text-box', { autoAlpha: 1, y: 0, stagger: 0.1 }, 'start');

        // * 원형 슬라이더 부분
        // console.log(sliderWrapperRef);
        // function circularSliderSizing() {

        // let vh = window.innerHeight;
        // var $container = $('.circular-slider-container');
        // var cardHeight = vh*$container.data('cardHeight');
        // var circleOrigin = cardHeight*$container.data('circleOrigin');
        // var cardWidth = cardHeight/$container.data('cardWidth');
        // $container.css('height', cardHeight);

        // $('.slider-section').css('height', vh);
        // $('.circular-slider').css('height', cardHeight);
        // $('.center-position').css({
        //     'width': cardWidth,
        //     'height': cardHeight+(vh*0.05)
        // });
        // $('.slide-wrapper').css({
        //     'transform-origin': '50% '+circleOrigin+'px',
        //     '-moz-transform-origin': '50% '+circleOrigin+'px',
        //     '-ms-transform-origin': '50% '+circleOrigin+'px',
        //     '-webkit-transform-origin': '50% '+circleOrigin+'px',
        //     'transform': 'rotate('+0+'deg)'
        // });
        // $('.slide').css({
        //     'width': cardWidth,
        //     'height': cardHeight,
        //     'transform-origin': '50% '+circleOrigin+'px',
        //     'transform-origin': '50% '+circleOrigin+'px',
        //     '-moz-transform-origin': '50% '+circleOrigin+'px',
        //     '-ms-transform-origin': '50% '+circleOrigin+'px',
        //     '-webkit-transform-origin': '50% '+circleOrigin+'px',
        // });
        // }
        // const turn = 10;
        // let turnCount = 6;
        // gsap.set('.slide', { transformOrigin: 'center 160rem' });
        // gsap.set('#slide1', { rotation: -(2 * turn) });
        // gsap.set('#slide2', { rotation: -turn });
        // gsap.set('#slide4', { rotation: turn });
        // gsap.set('#slide5', { rotation: turn * 2 });

        // function slideTurn(direction) {
        //     turnCount--;
        //     // TODO : 디렉션에 따라 첫번째나 마지막 슬라이드를 -30도로 세팅하거나 30도로 세팅, 햔재의 turnCount로 세팅하는 방식이면 오류남
        //     if (direction === 'next') {
        //         console.log('슬라이드 넥스트');
        //         gsap.set('#slide' + turnCount, { rotation: -(3 * turn) });
        //         gsap.to('.slide', 0.2, { rotation: '+=' + turn, delay: 1, ease: 'power2.easeInOut' });
        //     } else {
        //         console.log('슬라이드 프리브');
        //         gsap.set('#slide' + turnCount, { rotation: 3 * turn });
        //         gsap.to('.slide', 0.2, { rotation: '-=' + turn, delay: 1, ease: 'power2.easeInOut' });
        //     }
        //     // } else {
        //     //     gsap.set('#slide' + turnCount, { rotation: (3 * turn) });
        //     //     gsap.to('.slide', 1.6, { rotation: '-=' + turn, delay: 1, ease: 'power2.easeInOut', onComplete: slideTurn('prev') });
        //     // }
        //     // console.log('turnCount:', turnCount, 'rotation:', -(3 * turn));
        //     // gsap.set('#slide' + turnCount, { rotation: -(3 * turn) });
        //     if (turnCount === 1) {
        //         turnCount = 6;
        //     }
        // }

        // slideTurn();

        // gsap.set('.slide-wrapper', {
        //     perspective: 1100,
        // });
        // console.log(sliderRef.current.clientWidth, sliderRef.current.innerWidth);
        // let proxy = document.createElement('div');
        // Draggable.create(proxy, {
        //     allowContextMenu: true,
        //     trigger: '.slide-wrapper',
        //     type: 'x',
        //     inertia: true,
        //     onDragEnd: function (e) {
        //         // console.log(this.pointerX);
        //         console.log(this.deltaX);
        //         let deltaX = this.deltaX;
        //         if (Math.abs(deltaX) > 1 && deltaX > 0) {
        //             // drag right
        //             console.log('오른쪽 드래그, deltaX 반올림 값:', Math.abs(deltaX));
        //             slideTurn('next');
        //         }
        //         if (Math.abs(deltaX) > 1 && deltaX < 0) {
        //             // drag left
        //             console.log('왼쪽 드래그, deltaX 반올림 값:', Math.abs(deltaX));
        //             slideTurn('prev');
        //         }
        //     },
        // });

        // * variables
        const slideAngle = 10;
        const slideWrapperAngle = -10;
        let lastSlideWrapperAngle = 0;

        // * 원형 슬라이드 세팅
        function circularSliderSetting() {
            // * 슬라이드들 초기 각도 세팅
            for (let index = 0; index < sliderWrapperRef.current.children.length; index++) {
                let $this = sliderWrapperRef.current.children[index];
                console.log(sliderWrapperRef.current.children[index]);

                gsap.set($this, { transform: 'rotate(' + slideAngle * index + 'deg)' });
                $this.dataset.elRotation = slideAngle * index;
            }
            gsap.set('.slide-wrapper', { transform: 'rotate(' + slideWrapperAngle + 'deg)' });

            // * Draggable 세팅
            Draggable.create('.slide-wrapper', {
                type: 'rotation',
                // dragResistance: 0.78,
                edgeResistance: 0.3,
                force3D: true,
                dragClickable: false,
                // bounds: {
                //     // maxRotation: -(slideAngle * 3),
                //     // maxRotation: -360,
                //     // minRotation: 0,
                // },
                onClick: function () {},
                onDragStart: function () {},
                onMove: function () {
                    let direction = this.getDirection();
                    console.log('움직인 방향', this.getDirection());
                    console.log('마지막각도', lastSlideWrapperAngle);
                    console.log('로테이트', this.rotation);
                    console.log('슬라이드 앵글', slideAngle);
                    console.log('움직인 각도', Math.abs(slideWrapperAngle - this.rotation));
                    if (Math.abs(slideWrapperAngle - this.rotation) > 5) {
                        console.log('클론 슬라이드 추가 해야함', direction);
                        switch (direction) {
                            case 'clockwise':
                                // TODO: 시계방향, 제일 첫번째 슬라이드를 맨 마지막 슬라이드 뒤에 붙여야함
                                console.log('시계방향');
                                break;

                            case 'counter-clockwise':
                                // TODO: 반시계방향, 제일 마지막 슬라이드를 첫번째 슬라이드 얖에 붙여야함
                                console.log('반시계방향');
                                break;

                            default:
                                break;
                        }
                    }
                },
                onDragEnd: function () {
                    customSnap(this.rotation);
                },
            });
        }
        circularSliderSetting();

        // * 원형 슬라이드 드래그 종료 후 가장 인접한 각도로 세팅해주는 함수
        function customSnap(value) {
            let $nextEl = '';
            let snapVal = Math.round(value / slideAngle) * slideAngle;
            lastSlideWrapperAngle = snapVal;
            let rotaVal = 0;
            gsap.to('.slide-wrapper', { duration: 0.25, rotation: snapVal, ease: 'back.out(1.7)' });
            for (let index = 0; index < sliderWrapperRef.current.children.length; index++) {
                let $this = sliderWrapperRef.current.children[index];
                rotaVal = $this.dataset.elRotation;
                if (Math.abs(snapVal) == rotaVal) {
                    $nextEl = $this;
                }
            }
            // console.log(snapVal, rotaVal);
            // TODO: 원형 슬라이드를 컴포넌트화 했으나 그 후,  액티브 클래스 부여 함수 작동 안됨. 수정해야함
            // activeClassChange($nextEl);
        }

        // * 액티브 클래스 부여 함수
        // function activeClassChange($nextEl) {
        //     // * 자바스크립트 형제요소 추출용 변수
        //     const siblings = (el) => [...el.parentElement.children].filter((node) => node != el);

        //     $nextEl.classList.add('is-active');
        //     console.log($nextEl);
        //     // console.log($nextEl.dataset.workCategory);
        //     setActiveSlide($nextEl.dataset.workCategory);
        //     let siblingArr = siblings($nextEl);
        //     siblingArr.forEach((el) => {
        //         el.classList.remove('is-active');
        //     });
        // }

        return () => {
            console.log('어바웃 언마운트');
        };
    }, []);

    useEffect(() => {
        console.log('현재 액티브 슬라이드', activeSlide);
        // switch (activeSlide) {
        //     case value:

        //         break;

        //     default:
        //         break;
        // }
    }, [activeSlide]);

    const goTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            duration: window.innerHeight * 0.1,
        });
    };

    let [workCategoryData, setWorkCategoryData] = useState(['video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer','video', 'development', 'product-manager', 'designer']);

    function WorkSlide({ workCategory, index }) {
        const slideAngle = 10;
        return (
            <div className={`slide`} data-work-category={workCategory} data-el-rotation={index * slideAngle} style={{'transform': 'rotate('+index*slideAngle+'deg)'}}>
                <div className="card">{/* <div className="desc"></div> */}</div>
            </div>
        );
    }

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeIn', duration: 0.7 }} exit={{ opacity: 0 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                <div className="inner">
                    <div className="cover-section">
                        {/* <div id="anim-container"></div> */}
                        <div className="title-block">
                            <Lottie animationData={animationData} loop={true} />
                        </div>
                        <div className="desc-block">
                            <p className="desc">
                                브랜드는 기억되길 바라면서
                                <br />
                                튀는 것은 부담스러운 심리
                                <br />
                                세일즈는 올라가길 원하면서
                                <br />
                                광고는 비슷해야 안심되는 아이러니
                            </p>
                            <p className="desc">
                                <strong>
                                    하지만 광고가 가야 할 길은
                                    <br />
                                    결국 뇌리에 상품을 남기는 것<br />
                                    비슷하거나 평범함을 경계한다
                                    <br />
                                    새롭게 그리하여 용감하게
                                    <br />
                                    이것이 미니버타이징의 철학입니다
                                </strong>
                            </p>
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
                                                    duration: 160,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '-100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 160,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                        </div>
                                        <div className="typo-wrap">
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 160,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
                                            </motion.div>
                                            <motion.div
                                                className="typo-slide"
                                                animate={{ x: '100%' }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 160,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            >
                                                <span>VIRAL VIDEO WEBSITE CAMPAIGN SITE SOCIAL MEDIA SHORT VIDEO GOODS PHOTOGRAPHY</span>
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
                            <div className="work-block">
                                <div className="slider-section">
                                    <div className="circular-slider-container">
                                        <div className="circular-slider">
                                            <div className="slide-container">
                                                {/* <div className="support-area">
                                                    <div className="inner-circle"></div>
                                                </div> */}
                                                <div className="center-position">
                                                    <div className="slide-wrapper" ref={sliderWrapperRef}>
                                                        {/* <div className="slide" data-work-category="video">
                                                            <div className="card"></div>
                                                        </div>
                                                        <div className="slide is-active" data-work-category="development">
                                                            <div className="card"></div>
                                                        </div>
                                                        <div className="slide" data-work-category="product-manager">
                                                            <div className="card"></div>
                                                        </div>
                                                        <div className="slide" data-work-category="designer">
                                                            <div className="card"></div>
                                                        </div> */}
                                                        {workCategoryData.map((workCategory, index) => (
                                                            <WorkSlide key={index} index={index} workCategory={workCategory} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="slide-wrapper" ref={sliderRef}>
                                    <div className="parent-circle">
                                        <div className="slide" id="slide1">
                                            1
                                        </div>
                                        <div className="slide" id="slide2">
                                            2
                                        </div>
                                        <div className="slide" id="slide3">
                                            3
                                        </div>
                                        <div className="slide" id="slide4">
                                            4
                                        </div>
                                        <div className="slide" id="slide5">
                                            5
                                        </div>
                                    </div>
                                </div> */}
                                <div className="text-section">
                                    <div className="inner">
                                        <div className="desc">
                                            <div className="text-box">
                                                <span>최초의 기획 의도를 마지막 결과물까지</span>
                                                {device === 'mobile' ? '' : ' '}
                                                <span>크리에이티브 날을 세울 수 있는 이유</span>
                                            </div>
                                            <div className="text-box">
                                                <span>
                                                    <strong>미니버타이징은 자체 프로덕션과</strong>
                                                </span>
                                                {device === 'mobile' ? '' : ' '}
                                                <span>
                                                    <strong>웹개발, 코딩, 콘텐츠 기획을 통해</strong>
                                                </span>
                                            </div>
                                            <div className="text-box">
                                                <span>
                                                    <strong>하나의 유기체로 활동하는 것이</strong>
                                                </span>
                                                {device === 'mobile' ? '' : ' '}
                                                <span>
                                                    <strong>당연한 덕목이라 여깁니다</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ani-block _03">
                                <div className="director-block">
                                    <p className="title">
                                        우주에
                                        {device === 'mobile' ? <br /> : ' '}
                                        흔적을
                                        <br />
                                        남기기 위해
                                        <br />
                                        태어났다
                                    </p>
                                    <div className="director-info__wrapper">
                                        <div className="director-box _01">
                                            <div className="img-box"></div>
                                            <div className="text-box">
                                                <p className="desc">
                                                    대학교때부터 광고 일에 연루되어 <br />
                                                    크리에이티브하다는 오명을 썼으나 <br />
                                                    현재는 업으로 삼고 대행사 대표로 일하고 있다
                                                </p>
                                                <p className="title">디렉터 양선혜</p>
                                            </div>
                                        </div>
                                        <div className="director-box _02">
                                            <div className="img-box"></div>
                                            <div className="text-box">
                                                <p className="desc">
                                                    자신의 머리카락은 못 잡지만 <br />
                                                    크리에이티브는 잘 잡는 편이다 <br />
                                                    빡빡한 마케팅에 설탕 같은 존재가 되고자 한다
                                                </p>
                                                <p className="title">디렉터 양건영</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="client-block">
                                <p className="title">Client</p>
                                <ul className="client-list">
                                    <li className="client-list__elem">
                                        <div className="client-logo _lg-hnh">
                                            <svg viewBox="0 0 89 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.97663 17.3569C13.7438 17.3569 17.6087 13.5543 17.6087 8.86404C17.6087 4.17378 13.7438 0.374268 8.97663 0.374268C4.20946 0.374268 0.347656 4.17685 0.347656 8.86404C0.347656 13.5512 4.21258 17.3569 8.97663 17.3569Z"
                                                    fill="#9D9D9C"
                                                />
                                                <path d="M8.63321 5.13824V12.5837H11.0402V11.9172H9.32316V5.13824H8.63321Z" fill="white" />
                                                <path
                                                    d="M6.2231 7.17161C6.79441 7.17161 7.25645 6.71395 7.25645 6.15186C7.25645 5.58976 6.79441 5.13517 6.2231 5.13517C5.65179 5.13517 5.18974 5.58976 5.18974 6.15186C5.18974 6.71395 5.65179 7.17161 6.2231 7.17161Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.32316 1.75954C9.23262 1.75339 9.06092 1.75339 8.97663 1.75339C4.99619 1.75339 1.75252 4.94474 1.75252 8.86404C1.75252 10.7623 2.5049 12.5468 3.86917 13.8891C5.23345 15.2314 7.0504 15.9716 8.97663 15.9716C10.9028 15.9716 12.7229 15.2344 14.0872 13.8891C15.4484 12.5468 16.2007 10.7623 16.2007 8.86404V8.53845H11.0402V9.19884H15.5108V9.29712C15.2798 12.6482 12.4388 15.3051 8.9735 15.3051C7.22835 15.3051 5.58311 14.6324 4.34683 13.4161C3.10743 12.1997 2.42685 10.581 2.42685 8.86096C2.42685 7.14089 3.10743 5.52219 4.34683 4.30278C5.58311 3.08645 7.22835 2.41685 8.9735 2.41685C9.05155 2.41685 9.23887 2.41685 9.32004 2.42299V1.75954H9.32316Z"
                                                    fill="white"
                                                />
                                                <path d="M24.146 3.22467H21.5486V14.2853H29.5251V12.1322H24.146V3.22467Z" fill="white" />
                                                <path
                                                    d="M35.2413 10.0712H37.3579V12.0062C36.9677 12.1506 36.2091 12.298 35.4848 12.298C33.1465 12.298 32.366 11.1308 32.366 8.75653C32.366 6.38222 33.109 5.15975 35.4442 5.15975C36.7429 5.15975 37.4859 5.55905 38.0978 6.32693L39.7119 4.86795C38.7285 3.47961 37.002 3.06188 35.388 3.06188C31.751 3.06188 29.8404 5.01538 29.8404 8.7381C29.8404 12.4608 31.5668 14.4512 35.3724 14.4512C37.1144 14.4512 38.8221 14.012 39.7493 13.3731V8.00707H35.2413V10.0712Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M86.5406 5.37475V3.0588H84.5582V9.22648H86.3907C86.5156 8.66438 86.5374 7.99479 86.5374 7.47262V6.99653H88.4449V5.37475H86.5374H86.5406Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M50.9039 5.0461H50.086V3.07109H48.2284V8.97154H49.8893C50.0267 8.58145 50.086 7.83814 50.086 7.39891V6.59416H50.9039V9.38313H52.5991C52.7615 8.9439 52.8114 8.05622 52.8114 7.49412V3.0588H50.9039V5.0461Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M48.7998 9.45992C45.8776 9.45992 45.0035 10.6517 45.0035 12.0093C45.0035 13.3669 45.8776 14.5587 48.7998 14.5587C51.7219 14.5587 52.674 13.4038 52.674 12.0093C52.674 10.6148 51.7718 9.45992 48.7998 9.45992ZM48.8122 13.1151C47.6197 13.1151 47.0921 12.7065 47.0921 12.0093C47.0921 11.3643 47.6166 10.9281 48.8122 10.9281C50.0079 10.9281 50.5449 11.3643 50.5449 12.0093C50.5449 12.7065 50.0329 13.1151 48.8122 13.1151Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M59.3674 4.19221V2.89601H58.0593C57.41 2.89601 56.4328 2.74858 55.8116 2.5305L55.54 3.90962C56.283 4.1277 57.1384 4.18913 57.9189 4.18913H59.3674V4.19221Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M47.1639 9.09133L48.1161 7.56784C46.5426 6.88596 45.9463 5.99521 45.9463 4.14306V3.25231H44.0014V4.15535C44.0014 6.25015 43.6767 7.20233 41.969 8.01014L42.6621 9.31248C43.6892 8.95925 44.6476 8.29887 45.1409 7.43269C45.5124 8.17601 46.3928 8.84561 47.1608 9.09133"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M82.813 5.32561V3.2646H77.2747V4.82495H80.7682V5.50683C80.7682 6.5788 79.5912 7.55248 76.9157 8.63981L77.5838 10.0159C81.2895 8.50466 82.813 7.34669 82.813 5.32254"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M70.138 12.5775V10.0374H68.0682V13.4069C68.0682 14.101 68.4272 14.4297 69.1328 14.4297H76.129V12.7833H70.3472C70.1849 12.7833 70.138 12.7465 70.138 12.5775Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M71.2338 7.00882H73.7345V11.2138H75.567C75.7169 10.6179 75.8012 9.57971 75.8012 8.87325V3.0588H73.7345V5.37475H71.6522V3.23081H66.0764V4.79116H69.6323V5.54676C69.6323 6.59416 68.3617 7.65385 65.733 8.72582L66.4261 10.065C68.9829 9.00533 70.5439 8.18215 71.2307 7.00575"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M58.1374 12.9922V12.7434H63.3229C63.5352 12.427 63.582 11.7912 63.582 11.1923V9.97901H56.1675V11.1861H61.6121V11.6069H56.1675V13.7109C56.1675 14.2116 56.4016 14.4665 57.0354 14.4665H63.941V13.1611H58.3466C58.1842 13.1611 58.1374 13.1366 58.1374 12.9891"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M82.9098 9.35856C80.1968 9.35856 79.3539 10.578 79.3539 11.9663C79.3539 13.3546 80.1968 14.5618 82.9098 14.5618C85.6227 14.5618 86.5374 13.3915 86.5374 11.9663C86.5374 10.5411 85.682 9.35856 82.9098 9.35856ZM82.9223 13.1488C81.9077 13.1488 81.3738 12.7342 81.3738 11.9663C81.3738 11.2476 81.9077 10.796 82.9223 10.796C83.9369 10.796 84.4832 11.2476 84.4832 11.9663C84.4832 12.7342 83.9619 13.1488 82.9223 13.1488Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M61.6121 3.0588V7.79821C60.7941 8.20058 59.6266 8.33573 58.6494 8.33573V8.03165C59.6921 7.82892 60.1604 7.2914 60.1604 6.52659C60.1604 6.31772 60.1105 6.12728 60.0137 5.95221H61.1625V4.6468H53.9572V5.95221H55.2028C55.1091 6.12421 55.0561 6.31772 55.0561 6.52659C55.0561 7.3129 55.5618 7.85657 56.6545 8.047V8.33573H53.9572V9.61657H58.0718C59.433 9.61657 60.894 9.46913 61.6152 9.07904V9.53056H63.5851V7.21768H65.3584V5.58362H63.5851V3.0588H61.6121ZM56.8293 6.45901C56.8293 6.0935 57.0822 5.91228 57.5973 5.91228C58.1124 5.91228 58.3403 6.0935 58.3403 6.45901C58.3403 6.82453 58.0625 7.0211 57.5567 7.0211C57.051 7.0211 56.8262 6.82453 56.8262 6.45901"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _hyundai-motorstudio">
                                            <svg viewBox="0 0 94 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M68.7751 10.5815V15.8509C68.7751 17.4691 68.0045 18.3591 66.6075 18.3591C64.8158 18.3591 64.4399 16.9954 64.4399 15.8509V10.5815H62.5779V15.9554C62.5779 18.4687 64.1602 20.0936 66.6075 20.0936C69.0548 20.0936 70.6389 18.4687 70.6389 15.9554V10.5815H68.7751Z"
                                                    fill="white"
                                                />
                                                <path d="M21.0904 10.5815V12.252H23.8895V19.9402H25.7499V12.252H28.549V10.5815H21.0904Z" fill="white" />
                                                <path
                                                    d="M16.587 18.3591C14.8451 18.3591 13.6283 17.0848 13.6283 15.2609C13.6283 13.437 14.8451 12.1627 16.587 12.1627C18.329 12.1627 19.5458 13.437 19.5458 15.2609C19.5458 17.0848 18.329 18.3591 16.587 18.3591ZM16.587 10.4298C13.8188 10.4298 11.7319 12.5065 11.7319 15.2609C11.7319 18.0152 13.8188 20.0919 16.587 20.0919C19.3553 20.0919 21.4439 18.0152 21.4439 15.2609C21.4439 12.5065 19.3553 10.4298 16.587 10.4298Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.9081 10.5815H8.80578L8.80235 10.5899L5.75094 17.3899L2.70125 10.5899H2.69953L2.6961 10.5815H0.59375V19.9402H2.44897V14.204L4.98551 19.9402H6.51637L9.05292 14.204V19.9402H10.9081V10.5815Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M32.9905 18.3591C31.2486 18.3591 30.0318 17.0848 30.0318 15.2609C30.0318 13.437 31.2486 12.1627 32.9905 12.1627C34.7325 12.1627 35.9492 13.437 35.9492 15.2609C35.9492 17.0848 34.7325 18.3591 32.9905 18.3591ZM32.9905 10.4298C30.2223 10.4298 28.1337 12.5065 28.1337 15.2609C28.1337 18.0152 30.2206 20.0919 32.9905 20.0919C35.7605 20.0919 37.8457 18.0152 37.8457 15.2609C37.8457 12.5065 35.7587 10.4298 32.9905 10.4298Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M89.143 18.3591C87.401 18.3591 86.1842 17.0848 86.1842 15.2609C86.1842 13.437 87.401 12.1627 89.143 12.1627C90.8849 12.1627 92.1017 13.437 92.1017 15.2609C92.1017 17.0848 90.8849 18.3591 89.143 18.3591ZM89.143 10.4298C86.3747 10.4298 84.2878 12.5065 84.2878 15.2609C84.2878 18.0152 86.3747 20.0919 89.143 20.0919C91.9112 20.0919 93.9998 18.0152 93.9998 15.2609C93.9998 12.5065 91.9129 10.4298 89.143 10.4298Z"
                                                    fill="white"
                                                />
                                                <path d="M54.4156 10.5815V12.252H57.2147V19.9402H59.0768V12.252H61.8759V10.5815H54.4156Z" fill="white" />
                                                <path
                                                    d="M51.0844 14.2006L50.1989 14.0725C49.9517 14.0371 49.6102 13.9545 49.3579 13.7708C49.164 13.6275 49.0233 13.4235 49.0233 13.1285C49.0233 12.6481 49.5502 12.161 50.5559 12.161C51.3642 12.161 52.0507 12.4998 52.5381 13.1403L52.7474 13.4151L54.0655 12.2284L53.9145 12.0126C53.2074 11.0046 51.9889 10.4264 50.5679 10.4264C49.5502 10.4264 48.6783 10.7079 48.0468 11.2389C47.4444 11.7463 47.1131 12.4425 47.1131 13.1993C47.1131 14.5849 48.1617 15.5727 49.9157 15.8407L50.7875 15.9688C51.2904 16.043 51.6697 16.1745 51.9237 16.3599C52.1742 16.5453 52.3012 16.7847 52.3012 17.0797C52.3012 17.8534 51.5942 18.354 50.5009 18.354C49.1005 18.354 48.3111 17.5298 47.8957 16.837L47.7018 16.5133L47.6949 16.5184L46.3237 17.6933L46.461 17.9107C47.0874 18.9036 48.2956 20.0886 50.4855 20.0886C52.6754 20.0886 54.2079 18.8311 54.2079 17.0325C54.2079 15.5104 53.0975 14.5023 51.0827 14.1972"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M75.6776 18.258H73.8327V12.2655H75.6776C77.5277 12.2655 78.59 13.3578 78.59 15.2626C78.59 17.1673 77.5294 18.2596 75.6776 18.2596M75.7566 10.5832H71.9706V19.9419H75.7566C78.6398 19.9419 80.5036 18.1046 80.5036 15.2626C80.5036 12.4206 78.6398 10.5832 75.7566 10.5832Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.1453 14.4754C42.9565 14.5226 42.7351 14.5445 42.4828 14.5445H40.3599V12.252H42.4777C43.4954 12.252 43.9914 12.6279 43.9914 13.3999C43.9914 13.9781 43.7133 14.3338 43.1453 14.4754ZM43.9776 16.0042C45.2185 15.6081 45.9255 14.6642 45.9255 13.3949C45.9255 11.6856 44.6212 10.5815 42.603 10.5815H38.4841V19.9402H40.3599V16.2082H41.8822L44.9267 19.9402H47.2539L43.9794 16.0026L43.9776 16.0042Z"
                                                    fill="white"
                                                />
                                                <path d="M83.3868 10.5815H81.4046V19.9402H83.3868V10.5815Z" fill="white" />
                                                <path
                                                    d="M50.017 6.03868L51.3178 2.92023L52.6084 6.03868H50.0152H50.017ZM52.2309 0.455811H50.41L46.4593 9.81454H48.4484L49.3219 7.70411H53.2949L54.1805 9.81454H56.1678L52.2309 0.455811Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M35.2508 0.455811V6.65226L30.1965 0.492895L30.1656 0.455811H28.6193V9.81454H30.4797V3.61978L35.5356 9.77914L35.5648 9.81454H37.1128V0.455811H35.2508Z"
                                                    fill="white"
                                                />
                                                <path d="M58.404 0.455811H56.4218V9.81454H58.404V0.455811Z" fill="white" />
                                                <path
                                                    d="M40.3462 8.13226V2.13978H42.1911C44.0411 2.13978 45.1035 3.23208 45.1035 5.13518C45.1035 7.03827 44.0429 8.13226 42.1911 8.13226H40.3462ZM47.017 5.13518C47.017 2.29317 45.155 0.455811 42.2717 0.455811H38.4858V9.81454H42.2717C45.155 9.81454 47.0188 7.97718 47.0188 5.13518"
                                                    fill="white"
                                                />
                                                <path d="M2.45583 5.92912H7.04152V9.81454H8.9036V0.455811H7.04152V4.26538H2.45583V0.455811H0.59375V9.81454H2.45583V5.92912Z" fill="white" />
                                                <path
                                                    d="M25.4238 0.455811V5.72515C25.4238 7.34169 24.6532 8.2334 23.2562 8.2334C21.4645 8.2334 21.0886 6.86971 21.0886 5.72515V0.455811H19.2266V5.82966C19.2266 8.34297 20.8089 9.96793 23.2579 9.96793C25.7069 9.96793 27.2893 8.34297 27.2893 5.82966V0.455811H25.4238Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M13.1787 5.85832V9.81454H15.0562V5.84652L18.5435 0.915993L18.8576 0.455811H16.6763L14.8932 2.95394L14.1174 4.03782L11.5706 0.455811H9.39615L9.70507 0.917679L13.1787 5.85832Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _kakao-mobility">
                                            <svg viewBox="0 0 109 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.02952 14.4078H0.525391V1.47936L2.02952 1.14443V14.4078ZM6.05685 5.0247L7.23517 5.89304L4.33715 9.60708L7.69326 13.7206L6.52965 14.641L2.5709 9.69144L6.05685 5.0247Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.02591 11.9491C9.02591 11.0237 9.32968 10.3166 9.93476 9.83285C10.5398 9.34906 11.4217 9.10592 12.578 9.10592H14.3149V8.52041C14.3149 7.10376 13.7024 6.39668 12.4825 6.39668C12.0905 6.39668 11.679 6.45126 11.2478 6.56291C10.8167 6.67455 10.4222 6.81349 10.0621 6.97971L9.61874 5.89304C10.067 5.6375 10.5496 5.43902 11.069 5.30009C11.5859 5.16115 12.0905 5.09168 12.5829 5.09168C14.6995 5.09168 15.7577 6.24534 15.7577 8.55266V14.4053H14.6456L14.4643 13.403C14.016 13.7702 13.5383 14.0555 13.0312 14.2565C12.5241 14.4574 12.0415 14.5567 11.5834 14.5567C10.7873 14.5567 10.1626 14.3259 9.70938 13.862C9.25618 13.398 9.02836 12.7604 9.02836 11.9467M11.8553 13.3186C12.0611 13.3186 12.2767 13.2913 12.4996 13.2343C12.7225 13.1797 12.9455 13.1053 13.1684 13.016C13.3913 12.9266 13.5995 12.8175 13.7955 12.6909C13.9915 12.5619 14.1654 12.4255 14.3173 12.2816V10.1405H12.7519C11.9582 10.1405 11.3801 10.2794 11.0151 10.5573C10.6525 10.8352 10.4688 11.2768 10.4688 11.8797C10.4688 12.8373 10.9293 13.3186 11.8529 13.3186"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M19.9394 14.4078H18.4353V1.47936L19.9394 1.14443V14.4078ZM23.9643 5.0247L25.1426 5.89304L22.247 9.60708L25.6007 13.7206L24.4395 14.641L20.4783 9.68895L23.9643 5.02222V5.0247Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M26.9333 11.9491C26.9333 11.0237 27.2371 10.3166 27.8422 9.83285C28.4473 9.34906 29.3292 9.10592 30.4854 9.10592H32.2198V8.52041C32.2198 7.10376 31.6099 6.39668 30.3874 6.39668C29.993 6.39668 29.5839 6.45126 29.1503 6.56291C28.7192 6.67455 28.3223 6.81349 27.9647 6.97971L27.5213 5.89304C27.9696 5.6375 28.4522 5.43902 28.9691 5.30009C29.486 5.16115 29.9906 5.09168 30.483 5.09168C32.5995 5.09168 33.6578 6.24534 33.6578 8.55266V14.4053H32.5456L32.3644 13.403C31.9161 13.7702 31.4408 14.0555 30.9337 14.2565C30.4266 14.4574 29.944 14.5567 29.486 14.5567C28.6898 14.5567 28.0651 14.3259 27.6119 13.862C27.1587 13.398 26.9333 12.7604 26.9333 11.9467M29.7603 13.3186C29.9661 13.3186 30.1817 13.2913 30.4046 13.2343C30.6275 13.1797 30.8504 13.1053 31.0734 13.016C31.2963 12.9266 31.5045 12.8175 31.7005 12.6909C31.8965 12.5619 32.0704 12.4255 32.2223 12.2816V10.1405H30.6594C29.8657 10.1405 29.2875 10.2794 28.9225 10.5573C28.5575 10.8352 28.3762 11.2768 28.3762 11.8797C28.3762 12.8373 28.8368 13.3186 29.7603 13.3186Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M39.7184 5.10905C40.9629 5.10905 41.9379 5.52089 42.6483 6.34706C43.3587 7.17323 43.7139 8.35418 43.7139 9.8924C43.7139 11.4306 43.3612 12.5743 42.6581 13.3881C41.955 14.2019 40.9751 14.6088 39.7209 14.6088C38.4666 14.6088 37.5014 14.2019 36.791 13.3881C36.0806 12.5743 35.7254 11.4083 35.7254 9.8924C35.7254 8.37651 36.083 7.17075 36.7984 6.34706C37.5137 5.52337 38.4862 5.10905 39.7209 5.10905M39.7209 6.34706C38.9345 6.34706 38.3319 6.64726 37.913 7.25014C37.4916 7.85302 37.2834 8.73377 37.2834 9.8924C37.2834 11.051 37.4941 11.907 37.913 12.4925C38.3319 13.078 38.9345 13.3707 39.7209 13.3707C40.5072 13.3707 41.1246 13.078 41.5459 12.4925C41.9648 11.907 42.1755 11.0411 42.1755 9.8924C42.1755 8.7437 41.9648 7.85054 41.5459 7.25014C41.1246 6.64726 40.517 6.34706 39.7209 6.34706Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M46.5066 5.26039H48.1357L48.4615 6.1461C49.1988 5.41669 50.262 4.98252 51.2737 4.98252C52.3712 4.98252 53.16 5.36459 53.6059 6.1461C54.3604 5.39933 55.3893 4.98252 56.3839 4.98252C58.1844 4.98252 59.1618 6.02453 59.1618 8.33433V14.4128H56.864V8.47327C56.864 7.44862 56.4867 7.01445 55.4236 7.01445C54.9434 7.01445 54.3604 7.11865 53.9831 7.27495V14.4128H51.6853V8.47327C51.6853 7.44862 51.3252 7.01445 50.262 7.01445C49.8676 7.01445 49.1817 7.11865 48.8044 7.27495V14.4128H46.5066V5.26039Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M69.2694 9.89736C69.2694 12.8497 67.6746 14.6733 64.9995 14.6733C62.3244 14.6733 60.7125 12.8497 60.7125 9.89736C60.7125 6.94498 62.3587 4.98252 64.9995 4.98252C67.6403 4.98252 69.2694 6.85815 69.2694 9.89736ZM63.0618 9.91472C63.0618 11.8598 63.6963 12.8671 64.9995 12.8671C66.3028 12.8671 66.9201 11.8598 66.9201 9.91472C66.9201 7.96963 66.3028 6.78868 64.9995 6.78868C63.6963 6.78868 63.0618 7.88279 63.0618 9.91472Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M70.9229 14.1374V1.45703L73.2208 1.04023V5.57299C73.7695 5.22566 74.4897 4.98252 75.2785 4.98252C77.7135 4.98252 78.8453 6.66711 78.8453 9.60212C78.8453 12.7803 77.1305 14.6733 74.2839 14.6733C72.9635 14.6733 71.5574 14.4128 70.9229 14.1349V14.1374ZM73.2208 7.06903V12.8696C73.5809 12.9217 73.8209 12.9217 74.0439 12.9217C75.4843 12.9217 76.5132 12.0012 76.5132 9.6567C76.5132 7.88528 76.0845 6.86063 74.4554 6.86063C73.941 6.86063 73.4951 6.9822 73.2208 7.06903Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M79.8987 2.27328L81.5792 0.553955L83.2597 2.27328L81.5792 3.97524L79.8987 2.27328ZM82.7281 5.26039V14.4152H80.4303V5.26039H82.7281Z"
                                                    fill="white"
                                                />
                                                <path d="M87.0543 14.4152H84.7565V1.45703L87.0543 1.04023V14.4152Z" fill="white" />
                                                <path
                                                    d="M88.5486 2.27328L90.2291 0.553955L91.9097 2.27328L90.2291 3.97524L88.5486 2.27328ZM91.3781 5.26039V14.4152H89.0802V5.26039H91.3781Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M92.5441 5.43406L93.9846 5.26039V3.4195L96.3167 2.91586V5.26039H99.0261V7.01445H96.3167V10.9915C96.3167 12.4156 96.6768 12.6761 97.3456 12.6761C97.8086 12.6761 98.323 12.5545 98.8375 12.3635L99.369 13.996C98.8889 14.3086 97.8086 14.6733 96.7282 14.6733C94.8248 14.6733 93.9846 13.4923 93.9846 11.1478V7.01445H92.5441V5.43406Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M105.807 13.4601C104.984 15.7699 103.938 17.385 102.497 18.3228L101.074 17.0029C102.051 16.1346 102.635 15.4573 103.166 14.4673L99.9766 5.55811L102.257 4.9329L104.315 12.1402L106.356 4.91553L108.619 5.57548L105.807 13.4601Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _bioderma">
                                            <svg viewBox="0 0 79 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M67.3295 0.40104H66.8312L63.1435 7.48107L59.4027 0.40104H58.8645L57.8214 8.15908C57.7084 8.93489 57.5755 9.28041 57.4094 9.60638H58.4459C58.3662 9.31301 58.3928 8.7719 58.4858 8.08737L59.1303 3.34127L62.4392 9.59986H62.8246L66.1402 3.34779L66.7581 7.9961C66.8312 8.51765 66.8312 9.15003 66.7382 9.60638H68.8112C68.592 9.13699 68.5122 8.92185 68.4059 8.15256L67.3295 0.40104Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M20.2871 0.283691C17.2705 0.283691 14.9051 2.36337 14.9051 5.04935C14.9051 7.73532 17.2705 9.80848 20.2871 9.80848C23.3036 9.80848 25.6691 7.73532 25.6691 5.04935C25.6691 2.36337 23.3103 0.283691 20.2871 0.283691ZM20.4399 9.10439C18.3536 9.10439 16.6991 7.36372 16.6061 5.05587C16.5197 2.74149 17.8951 1.00082 20.1343 1.00082C22.2206 1.00082 23.8751 2.74149 23.9681 5.05587C24.0545 7.36372 22.5262 9.10439 20.4399 9.10439Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M78.7911 9.60638C78.4257 9.26085 78.0337 8.73931 77.7745 8.10041L74.4191 0.407559H74.0138L70.6052 8.31555C70.3461 8.90881 70.1069 9.26737 69.8212 9.60638H70.7846L72.0869 6.53576H75.356L76.6516 9.60638H78.7911ZM72.3593 5.9099L73.7347 2.66326L75.0968 5.9099H72.3527H72.3593Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M5.76904 4.24746C6.46006 3.92802 7.0647 3.38691 7.0647 2.57851C7.0647 1.65928 6.62617 1.07905 5.80226 0.740047C5.284 0.524908 4.43351 0.433637 3.59632 0.433637H0.812308C0.985063 0.700931 1.07144 1.09209 1.07144 1.62668V8.3677C1.07144 9.0392 0.971774 9.35213 0.805664 9.60638H3.82223C4.75909 9.60638 5.85542 9.43036 6.38033 9.1761C7.23745 8.75886 7.76901 8.00262 7.76901 6.87477C7.76901 5.31012 6.5863 4.59951 5.76904 4.24746ZM2.65281 1.03994C2.79899 1.03342 3.0249 1.03342 3.31725 1.03342C3.57638 1.03342 3.99498 1.0595 4.21425 1.11165C4.94513 1.28767 5.45011 1.77011 5.45011 2.58503C5.45011 3.34779 4.95178 3.78459 4.31391 3.88238C4.16774 3.90194 3.74249 3.94105 3.58967 3.94105C3.23752 3.94105 2.9053 3.94105 2.64617 3.92802V1.03994H2.65281ZM4.53318 8.93489C4.34714 8.974 3.88867 9.01312 3.74914 9.01312C3.60961 9.01312 2.83885 9.01312 2.65946 9.0066V4.54735C2.79234 4.54735 3.33054 4.54084 3.49665 4.54084C3.66276 4.54084 4.12787 4.56691 4.37371 4.62559C5.45675 4.85376 6.12119 5.59045 6.10126 6.90736C6.10126 7.92439 5.57635 8.71975 4.53318 8.93489Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M41.5027 8.98052V4.56691H44.8315L45.0574 3.94105H41.5093V1.06601H44.0874C44.6521 1.06601 45.1305 1.12469 45.7086 1.4311L45.2435 0.440156H39.6755C39.8349 0.70745 39.9213 1.09861 39.9213 1.6332V8.3677C39.9213 9.03268 39.8283 9.35213 39.6688 9.60638H45.7817L46.2601 8.60892C45.682 8.90229 45.104 8.974 44.4595 8.974H41.5027V8.98052Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M33.5626 0.616179C33.0776 0.49883 32.154 0.433637 31.855 0.433637H28.0677C28.2338 0.700931 28.3135 1.09209 28.3135 1.62668V8.3677C28.3135 9.0392 28.2271 9.35213 28.061 9.6129H31.6092C31.9879 9.6129 32.752 9.56726 33.1972 9.50859C35.8549 9.14351 37.4031 7.40936 37.4031 5.08846C37.4031 2.76757 35.8217 1.16381 33.5626 0.622698V0.616179ZM32.5792 8.93489C32.3201 8.974 31.7487 8.99356 31.4563 8.99356C30.6922 8.99356 30.2005 8.99356 29.9015 8.96748V1.10513C30.2005 1.09209 30.8384 1.07905 31.1972 1.07905C31.6623 1.07905 32.5792 1.16381 33.0909 1.33983C34.6257 1.87442 35.6622 3.20437 35.6622 5.06238C35.6622 7.14858 34.7254 8.635 32.5859 8.92837"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M12.5264 0.433637H10.4666C10.6327 0.700931 10.7125 1.09209 10.7125 1.62668V8.3677C10.7125 9.0392 10.6195 9.35213 10.46 9.60638H12.5264C12.3603 9.33909 12.2806 8.94793 12.2806 8.41334V1.67884C12.2806 1.00734 12.3736 0.694411 12.5331 0.433637"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M52.0939 5.32968C53.3297 5.21233 54.8447 4.54084 54.8447 2.98923C54.8447 1.43762 53.8414 0.863915 52.7185 0.60966C51.848 0.414079 50.8447 0.433637 50.2334 0.433637H48.2933C48.4594 0.700931 48.5391 1.09209 48.5391 1.62668V8.3677C48.5391 9.0392 48.4461 9.35865 48.2866 9.6129H50.3929C50.1803 9.26085 50.1205 8.8371 50.1205 8.38074V1.05298C50.3863 1.05298 51.1172 1.02038 51.6553 1.14425C52.8713 1.41154 53.2234 2.18083 53.2234 3.0153C53.2234 4.04536 52.559 5.24493 50.6587 4.84073L50.4461 4.97763C52.0474 7.3898 53.4427 8.81754 54.4859 9.6129H56.8779C55.2101 8.53721 53.4161 6.99212 52.0939 5.3362"
                                                    fill="white"
                                                />
                                                <path d="M1.30399 14.6915H2.34717V15.0109L0.818953 15.0044L0.825597 12.5336H1.30399V14.6915Z" fill="white" />
                                                <path
                                                    d="M3.5033 15.0109H3.07141L4.21425 12.5336H4.49996L5.52984 15.0175H5.03151L4.77238 14.4046H3.77572L3.5033 15.0175V15.0109ZM4.29398 13.2181L3.90196 14.1113H4.65942L4.29398 13.2181Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.35705 12.5401C7.92183 12.5401 8.27398 12.7878 8.27398 13.1138C8.27398 13.4398 8.01485 13.6093 7.81552 13.6745C8.21418 13.7136 8.51318 13.9809 8.51318 14.2873C8.51318 14.711 8.0215 15.0109 7.50323 15.0109H6.53979V12.5401H7.35705ZM8.00821 14.3003C8.00821 14.0656 7.81552 13.8961 7.4235 13.8961H7.03148V14.7241H7.40357C7.7823 14.7241 8.00821 14.5481 8.00821 14.3003ZM7.26403 13.6093C7.57632 13.6093 7.78894 13.4463 7.78894 13.192C7.78894 12.9769 7.62283 12.8269 7.26403 12.8204H7.02483V13.6093H7.26403Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M12.347 13.7853C12.347 14.5611 11.7091 15.0696 10.9251 15.0696C10.1411 15.0696 9.50984 14.5741 9.50984 13.7853C9.50984 13.0486 10.1078 12.501 10.9317 12.501C11.8088 12.501 12.347 13.0356 12.347 13.7918V13.7853ZM10.0281 13.7918C10.0281 14.3525 10.3736 14.7632 10.9317 14.7632C11.4832 14.7632 11.8354 14.3525 11.8354 13.7918C11.8354 13.2311 11.4832 12.8204 10.9317 12.8204C10.3803 12.8204 10.0281 13.2246 10.0281 13.7918Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M15.0579 15.0566L14.2739 13.9092H13.9882V15.0175H13.5031V12.5466H14.2872C14.9649 12.5466 15.2905 12.8726 15.2905 13.1855C15.2905 13.5245 14.9649 13.7592 14.7523 13.8114L15.6094 15.0175L15.0646 15.0566H15.0579ZM14.2473 13.6158C14.6393 13.6158 14.8121 13.4072 14.8121 13.2181C14.8121 13.016 14.646 12.8335 14.2473 12.8335H13.9882V13.6158H14.2473Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M16.6858 15.0175H16.2539L17.3968 12.5401H17.6891L18.719 15.024H18.2207L17.9682 14.4112H16.9715L16.6991 15.024L16.6858 15.0175ZM17.4765 13.2246L17.0845 14.1178H17.8353L17.4698 13.2246H17.4765Z"
                                                    fill="white"
                                                />
                                                <path d="M19.1044 12.5531H21.3701V12.8726H20.4798V15.024H19.9947L20.0014 12.8726L19.1044 12.8661V12.5531Z" fill="white" />
                                                <path
                                                    d="M24.8385 13.7918C24.8385 14.5676 24.2006 15.0761 23.4166 15.0696C22.5993 15.0696 22.0013 14.5741 22.0013 13.7918C22.0013 13.0551 22.5927 12.5075 23.4232 12.5075C24.3003 12.5075 24.8385 13.0421 24.8385 13.7918ZM22.5196 13.7918C22.5196 14.346 22.8651 14.7632 23.4232 14.7632C23.9814 14.7632 24.3269 14.346 24.3269 13.7918C24.3269 13.2377 23.9747 12.8204 23.4232 12.8204C22.8718 12.8204 22.5196 13.2246 22.5196 13.7918Z"
                                                    fill="white"
                                                />
                                                <path d="M26.473 12.5531H25.9946V15.0305H26.473V12.5531Z" fill="white" />
                                                <path
                                                    d="M29.3035 15.0696L28.5195 13.9157H28.2338V15.0305H27.7488V12.5597H28.5328C29.2105 12.5597 29.5361 12.8856 29.5361 13.1985C29.5361 13.5376 29.2105 13.7723 28.9979 13.8244L29.855 15.0305L29.3102 15.0696H29.3035ZM28.4863 13.6288C28.8783 13.6288 29.0511 13.4202 29.0511 13.2311C29.0511 13.029 28.8849 12.8465 28.4929 12.8465H28.2338V13.6288H28.4863Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M32.5527 15.0305H30.8583L30.865 12.5597H32.5062V12.8791L31.3434 12.8726V13.6028H32.1939V13.9157H31.3434V14.7176H32.5527V15.0305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M35.3566 12.5597H36.227C37.1307 12.5597 37.7486 13.029 37.7486 13.7918C37.7486 14.5089 37.0376 15.037 36.227 15.037H35.3566V12.5597ZM36.2403 14.7176C36.7254 14.7176 37.2303 14.346 37.2303 13.7918C37.2303 13.1529 36.7453 12.8791 36.2337 12.8791H35.8416V14.7241H36.2403V14.7176Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M40.5924 15.037H38.8981L38.9047 12.5662H40.5459L40.5392 12.8791H39.3831V13.6093H40.2336V13.9222H39.3831V14.7241H40.5924V15.037Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.2302 15.0826L42.4462 13.9352H42.1605V15.0435H41.6754V12.5727H42.4595C43.1306 12.5727 43.4628 12.8987 43.4628 13.2116C43.4628 13.5506 43.1372 13.7853 42.9246 13.844L43.7817 15.05L43.2369 15.0892L43.2302 15.0826ZM42.413 13.6419C42.805 13.6419 42.9777 13.4332 42.9777 13.2442C42.9777 13.0421 42.8116 12.8595 42.413 12.8595H42.1538V13.6419H42.413Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M47.5624 15.0435H47.0906L47.0641 13.3746L46.2601 15.0696H45.9544L45.1837 13.4072L45.1173 15.0435H44.7186L44.8315 12.5662H45.2834L46.1604 14.4894L47.0641 12.5727H47.5026L47.5624 15.0435Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M48.5258 15.0435L49.662 12.5662H49.9544L50.9843 15.0435H50.4859L50.2334 14.4307H49.2368L48.9644 15.0435H48.5258ZM49.7484 13.2507L49.3564 14.1439H50.1138L49.7484 13.2507Z"
                                                    fill="white"
                                                />
                                                <path d="M51.3763 12.5727L53.6487 12.5792V12.8987H52.7517V15.05H52.2733V12.8987L51.3763 12.8921V12.5727Z" fill="white" />
                                                <path
                                                    d="M57.1104 13.8179C57.1104 14.6002 56.4659 15.1022 55.6885 15.1022C54.8712 15.1022 54.2732 14.6067 54.2732 13.8179C54.2732 13.0877 54.8646 12.5336 55.6952 12.5336C56.5722 12.5336 57.1171 13.0682 57.1171 13.8244L57.1104 13.8179ZM54.7915 13.8244C54.7915 14.3851 55.1437 14.7958 55.6952 14.7958C56.2533 14.7958 56.5988 14.3851 56.5988 13.8244C56.5988 13.2637 56.2533 12.853 55.6952 12.853C55.1437 12.853 54.7915 13.2572 54.7915 13.8244Z"
                                                    fill="white"
                                                />
                                                <path d="M58.7516 14.7371H59.7948V15.0566L58.2665 15.05V12.5792H58.7516V14.7371Z" fill="white" />
                                                <path
                                                    d="M63.3562 13.8244C63.3562 14.6002 62.7183 15.1022 61.9343 15.1022C61.117 15.1022 60.5123 14.6067 60.519 13.8179C60.519 13.0812 61.1103 12.5336 61.9343 12.5336C62.8113 12.5336 63.3562 13.0682 63.3562 13.8179V13.8244ZM61.0373 13.8179C61.0373 14.372 61.3828 14.7893 61.9409 14.7893C62.499 14.7893 62.8445 14.372 62.8445 13.8179C62.8445 13.2637 62.4924 12.8465 61.9409 12.84C61.3894 12.84 61.0373 13.2507 61.0373 13.8179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M65.881 15.1087C65.0106 15.1087 64.3993 14.5415 64.3993 13.8244C64.3993 13.1073 65.0173 12.5336 65.8744 12.5336C66.4192 12.5336 66.685 12.6574 66.8046 12.7031L66.6651 13.0095C66.5721 12.9704 66.3129 12.8661 65.8943 12.8661C65.3495 12.8661 64.9176 13.2963 64.9176 13.8244C64.9176 14.4046 65.3894 14.7762 65.9275 14.7762C66.2133 14.7762 66.3262 14.7436 66.4259 14.711V13.9874H66.9043V14.9131C66.7714 14.9718 66.4458 15.0957 65.8744 15.0957"
                                                    fill="white"
                                                />
                                                <path d="M68.5122 12.5857H68.0338V15.0566H68.5122V12.5857Z" fill="white" />
                                                <path
                                                    d="M72.4789 15.2326L72.3195 15.5846L70.6717 15.0696C70.0271 14.8479 69.675 14.4763 69.675 13.8309C69.675 13.0942 70.2663 12.5466 71.0969 12.5466C71.974 12.5466 72.5122 13.0812 72.5122 13.8309C72.5122 14.4177 72.1002 14.9001 71.5753 15.0109L72.4789 15.2326ZM70.1933 13.8309C70.1933 14.3851 70.5388 14.8023 71.0969 14.8023C71.655 14.8023 72.0005 14.3851 72.0005 13.8309C72.0005 13.2768 71.655 12.8595 71.0969 12.8595C70.5454 12.8595 70.1933 13.2768 70.1933 13.8309Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M75.8543 14.2416C75.8543 14.6393 75.5287 15.1152 74.7247 15.1087C73.9872 15.1087 73.5952 14.7632 73.5952 14.2547V12.5922H74.0802V14.2156C74.0802 14.6067 74.2862 14.7958 74.758 14.7958C75.2297 14.7958 75.4158 14.5155 75.4158 14.2156V12.5988H75.8543V14.2482V14.2416Z"
                                                    fill="white"
                                                />
                                                <path d="M78.7911 15.0696H77.0968V12.5988H78.738V12.9117H77.5818V13.6419H78.4323V13.9548H77.5818V14.7567H78.7911V15.0696Z" fill="white" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _namyang">
                                            <svg viewBox="0 0 77 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M76.7272 17.7035L76.7459 1.76682H74.6007V5.1741H70.304V7.41807H74.6007V11.4992H64.8439V10.7872H62.6987L62.6799 17.6971L76.7272 17.7098M74.6007 13.7431V15.4786H64.8439V13.7431H74.6007Z"
                                                    fill="white"
                                                />
                                                <path d="M58.8648 11.0351H40.8335V13.2791H44.5611V18.3328H46.7064V13.2791H53.0045V18.3455H55.1122V13.2791H58.8648V11.0351Z" fill="white" />
                                                <path d="M9.78703 7.00487H2.46946V2.38344H0.324219V9.2552H9.78703V7.00487Z" fill="white" />
                                                <path
                                                    d="M16.4166 17.7098V9.14713H17.8926V6.90316H16.4229V1.76682H14.2839V10.7808H1.58759V17.7098H16.4166ZM3.73283 15.4722V13.0248H14.2714V15.4722H3.73283Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M24.9038 11.5818C27.4555 11.5818 29.5257 9.42048 29.5257 6.7506C29.5257 4.08072 27.4555 1.91939 24.9038 1.91939C22.352 1.91939 20.2818 4.08072 20.2818 6.7506C20.2818 9.42048 22.352 11.5818 24.9038 11.5818Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.6619 6.25476H39.0135V4.01079H36.6619V1.77318H34.5167V9.80189C33.8412 9.39505 32.9156 9.00728 32.0775 9.00728C29.5257 9.00728 27.4555 11.1686 27.4555 13.8385C27.4555 16.5084 29.5257 18.6697 32.0775 18.6697C34.6292 18.6697 36.6994 16.5084 36.6994 13.8385C36.6994 13.3427 36.6807 13.1647 36.6682 12.6116V9.96717H39.0636V7.7232H36.6682V6.25476M32.0837 16.5465C30.6577 16.5465 29.4944 15.3387 29.4944 13.8448C29.4944 12.351 30.6515 11.1432 32.0837 11.1432C33.516 11.1432 34.673 12.351 34.673 13.8448C34.673 15.3387 33.516 16.5465 32.0837 16.5465Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.8523 0.0949707C47.2005 0.0949707 45.0427 2.3453 45.0427 5.12324C45.0427 7.90119 47.1942 10.1515 49.8523 10.1515C52.5104 10.1515 54.6619 7.90119 54.6619 5.12324C54.6619 2.3453 52.5104 0.0949707 49.8523 0.0949707ZM49.8523 7.93297C48.37 7.93297 47.1629 6.67431 47.1629 5.12324C47.1629 3.57217 48.37 2.31351 49.8523 2.31351C51.3346 2.31351 52.5417 3.57217 52.5417 5.12324C52.5417 6.67431 51.3346 7.93297 49.8523 7.93297Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M64.3624 1.13114C62.042 1.13114 60.1532 3.10176 60.1532 5.53008C60.1532 7.9584 62.0357 9.92902 64.3624 9.92902C66.689 9.92902 68.5653 7.9584 68.5653 5.53008C68.5653 3.10176 66.6827 1.13114 64.3624 1.13114ZM64.3624 7.76769C63.1803 7.76769 62.2234 6.76331 62.2234 5.53008C62.2234 4.29685 63.1803 3.29247 64.3624 3.29247C65.5444 3.29247 66.5013 4.29049 66.5013 5.53008C66.5013 6.76967 65.5444 7.76769 64.3624 7.76769Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="client-list__elem">
                                        <div className="client-logo _unicef">
                                            <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M49.9814 0.507814C47.0075 0.507814 44.587 2.96024 44.587 5.9767C44.587 8.99316 47.0075 11.4456 49.9814 11.4456C52.9553 11.4456 55.3757 8.99169 55.3757 5.9767C55.3757 2.96171 52.9553 0.507814 49.9814 0.507814ZM54.1879 2.92508C53.9119 3.11407 53.6214 3.28548 53.3194 3.43491C53.1417 3.07305 52.9264 2.73024 52.6749 2.41379C52.896 2.27608 53.107 2.12372 53.3035 1.95817C53.6373 2.24239 53.935 2.56762 54.1879 2.92655V2.92508ZM51.9192 1.1114C52.3498 1.2872 52.7544 1.52453 53.1287 1.8146C52.9437 1.96989 52.7429 2.11347 52.5333 2.23946C52.2689 1.9318 51.9698 1.65199 51.6461 1.40733C51.7443 1.31503 51.8368 1.21688 51.9192 1.1114ZM52.3368 2.35226C52.0478 2.51048 51.7414 2.6394 51.4279 2.7361C51.2964 2.43137 51.1461 2.13251 50.9785 1.84537C51.1519 1.76772 51.3166 1.67103 51.4712 1.55383C51.7877 1.78677 52.0781 2.05633 52.3382 2.35226H52.3368ZM51.6995 1.02789C51.6258 1.11579 51.5464 1.1993 51.4611 1.27548C51.1764 1.0777 50.873 0.909227 50.5565 0.768586C50.9496 0.811071 51.3325 0.897506 51.6995 1.02789ZM51.2776 1.41905C51.1475 1.51281 51.0088 1.59046 50.8643 1.65345C50.7082 1.40294 50.5305 1.15828 50.3441 0.919482C50.6707 1.05573 50.9842 1.22274 51.2776 1.41905ZM50.0927 0.957572C50.2906 1.20076 50.4785 1.46007 50.649 1.7311C50.4684 1.78677 50.2805 1.82193 50.0927 1.83072V0.956107V0.957572ZM50.0927 2.05633C50.3239 2.04461 50.5522 2.00359 50.7704 1.92887C50.9351 2.20723 51.0839 2.49876 51.2126 2.79909C50.8455 2.89432 50.4698 2.94706 50.0912 2.95585V2.05633H50.0927ZM49.8687 0.967827V1.83072C49.6823 1.82046 49.4987 1.78677 49.3195 1.7311C49.4857 1.46886 49.6692 1.21248 49.8687 0.967827ZM49.1071 1.65492C48.9583 1.59192 48.821 1.51281 48.6924 1.42052C48.9843 1.22567 49.2964 1.05866 49.623 0.922412C49.4395 1.15535 49.2646 1.40147 49.1071 1.65492ZM49.4178 0.765655C49.0985 0.906297 48.795 1.07624 48.5074 1.27401C48.4207 1.1949 48.3413 1.11286 48.2676 1.02643C48.6389 0.894576 49.0233 0.806676 49.4178 0.76419V0.765655ZM53.1142 10.152C52.396 9.75204 52.3816 9.19972 52.4206 8.99609C52.4582 8.78952 52.5984 8.88035 52.6879 8.88035C53.159 8.88035 53.6547 8.73825 54.2659 8.10536C54.9552 7.3919 55.172 5.80822 54.1128 4.77393C52.9712 3.66052 51.7573 3.85536 50.9741 4.85597C50.8137 5.06107 50.4221 5.21196 50.084 5.20024C49.5826 5.1812 49.899 5.58115 49.899 5.66465C49.899 5.74816 49.8224 5.80676 49.7776 5.79504C49.6071 5.74523 49.675 6.00161 49.675 6.07925C49.675 6.1569 49.6042 6.19645 49.5667 6.19645C49.3557 6.19645 49.4135 6.38837 49.4207 6.44257C49.4265 6.49385 49.4077 6.58321 49.3383 6.62277C49.2704 6.66086 49.1924 6.82934 49.1924 6.95826C49.1924 7.19119 49.4019 7.35235 49.7531 7.61751C50.1028 7.88268 50.1461 8.1332 50.1533 8.31486C50.1606 8.49505 50.1765 8.78659 50.2559 8.97997C50.3499 9.21145 50.3383 9.63776 49.8542 9.65681C49.2632 9.68171 48.2112 10.1608 48.1231 10.193C47.7893 10.3131 47.3471 10.3571 47.0032 10.2692C46.8182 10.1359 46.6404 9.99083 46.4743 9.83407C46.4049 9.59235 46.5248 9.33451 46.6462 9.16017C46.8428 9.36088 47.1361 9.34769 47.3008 9.35355C47.467 9.36088 48.2748 9.23196 48.3889 9.19386C48.5045 9.15431 48.5537 9.16749 48.6245 9.19386C48.9323 9.30667 49.3571 9.34183 49.5291 8.74264C49.701 8.14199 49.2935 8.31046 49.243 8.33537C49.1924 8.36174 49.1216 8.35441 49.1476 8.30314C49.2227 8.15078 49.11 8.16543 49.0464 8.15957C48.8817 8.14345 48.6649 8.32072 48.5941 8.38518C48.5233 8.44964 48.454 8.44378 48.428 8.43059C48.2083 8.31925 47.5552 8.4804 47.3514 8.12001C47.3702 8.02332 47.1852 6.56417 47.0913 6.31365C47.0711 6.25945 47.0523 6.17155 47.1159 6.07486C47.282 5.82141 47.7401 6.0939 47.9887 6.08804C48.2863 6.07925 48.334 5.95326 48.415 5.85217C48.493 5.75255 48.5508 5.80822 48.5927 5.78185C48.6476 5.74669 48.5956 5.67491 48.6144 5.63682C48.6346 5.59873 48.6563 5.61777 48.7069 5.57236C48.7589 5.52694 48.6996 5.43025 48.7256 5.39216C48.7993 5.28082 48.9987 5.37019 48.8788 5.07718C48.8123 4.91603 48.9048 4.74023 48.993 4.6245C49.1375 4.43551 49.6938 3.64147 48.7126 2.81667C47.7762 2.02996 46.8269 2.09296 46.217 2.7654C45.6072 3.43637 45.9121 4.41793 45.9757 4.67577C46.0393 4.93508 45.8558 5.16801 45.6448 5.2691C45.4772 5.34968 45.0957 5.60752 44.8081 5.86096C44.8544 3.75428 46.1159 1.9025 48.0494 1.11286C48.1317 1.21688 48.2228 1.3165 48.3225 1.4088C48.1057 1.56848 47.6361 1.9948 47.6361 1.9948C47.6361 1.9948 47.7011 2.00505 47.7604 2.01971C47.8023 2.02996 47.8904 2.05633 47.8904 2.05633C47.8904 2.05633 48.3037 1.70033 48.4988 1.55676C48.6505 1.67396 48.8152 1.77065 48.9901 1.8483C48.8962 2.00945 48.6606 2.45921 48.6606 2.45921C48.6606 2.45921 48.7155 2.49144 48.7632 2.52513C48.8123 2.55883 48.8427 2.58813 48.8427 2.58813C48.8427 2.58813 49.0999 2.09589 49.1967 1.9318C49.4135 2.00505 49.6389 2.04754 49.8672 2.0578V2.95878C49.7415 2.95585 49.4149 2.9412 49.2834 2.92801L49.2011 2.91922L49.2473 2.98954C49.282 3.04228 49.3094 3.09356 49.334 3.14044L49.3427 3.15948H49.3643C49.4597 3.16974 49.7574 3.17999 49.8687 3.18292V4.82227H50.0927V4.44723C50.4221 4.43111 50.6952 4.40767 51.0261 4.37984H51.0406L51.331 4.1176L51.1735 4.13079C50.8238 4.17767 50.5175 4.19818 50.2386 4.21429C50.2386 4.21429 50.1432 4.22015 50.0941 4.22308V3.18292C50.5001 3.17413 50.9062 3.117 51.3036 3.01152C51.412 3.28108 51.6172 3.93887 51.6172 3.93887L51.8281 3.87148C51.8281 3.87148 51.6244 3.21955 51.516 2.94852C51.8527 2.84304 52.1778 2.7024 52.4842 2.53099C52.7327 2.84011 52.9466 3.17706 53.1229 3.53599C52.9639 3.61071 52.6735 3.71472 52.6749 3.71472C52.9076 3.74109 53.0839 3.79676 53.0839 3.79676C53.0839 3.79676 53.1663 3.7616 53.2183 3.73816C53.2385 3.78504 53.279 3.88027 53.279 3.88027L53.5694 4.01066L53.5362 3.92861C53.5362 3.92861 53.4408 3.69568 53.4177 3.64147C53.7255 3.48765 54.0275 3.31185 54.3165 3.11407C54.8671 3.96671 55.159 4.95705 55.159 5.98109C55.159 7.68197 54.357 9.19533 53.1157 10.1549L53.1142 10.152Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0986 1.9611L44.0148 2.03582C43.6983 2.32003 42.9758 3.07012 43.0871 3.89199C43.0871 3.89492 43.0986 3.94912 43.0986 3.94912L43.1348 4.11174L43.2359 4.01798C43.6781 3.60778 44.0105 2.9119 44.1463 2.10907L44.1853 1.88346L44.1001 1.95964L44.0986 1.9611Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.6305 3.3807L42.5943 3.48032C42.5438 3.61803 42.4527 3.90517 42.4036 4.28901C42.3357 4.83253 42.3516 5.60019 42.8169 6.17301L42.8674 6.2404L42.9209 6.31072L42.9903 5.96205C43.0669 5.34528 42.9657 4.05461 42.7432 3.47739L42.6666 3.28254L42.6319 3.3807H42.6305Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.0943 5.60312L42.0871 5.70421C42.0481 6.25652 42.077 7.62044 43.1651 8.34416L43.2952 8.42913L43.2894 8.27384C43.2706 7.75669 42.6752 6.2111 42.2273 5.65733L42.1001 5.50057L42.0929 5.60166L42.0943 5.60312Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M42.2822 8.04237L42.301 8.13613C42.4599 8.91991 43.194 10.1886 44.3255 10.5578L44.4801 10.6091L44.4238 10.4538C44.2128 9.86777 43.1218 8.50238 42.4209 8.05262L42.2634 7.95007L42.2836 8.04383L42.2822 8.04237Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5567 3.1419L44.4671 3.19757C43.6246 3.71912 43.2302 4.35054 43.2605 5.12992L43.2677 5.30866L43.3905 5.20464C43.8472 4.82227 44.4165 3.84511 44.5856 3.28987L44.6463 3.0877L44.5581 3.14337L44.5567 3.1419Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.061 4.84864L43.9975 4.91017C43.7821 5.1182 43.0828 5.87122 43.1434 6.80297C43.1521 6.94654 43.1853 7.10036 43.2388 7.26005L43.2879 7.40948L43.379 7.28056C43.7128 6.80443 44.155 5.54892 44.1304 4.96438L44.1232 4.78711L44.061 4.84864Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.0972 6.46601L44.0495 6.5378C43.6969 7.06813 43.5177 7.61165 43.5293 8.11269C43.5394 8.48333 43.6564 8.83787 43.8761 9.16749L43.9498 9.27884L44.0119 9.16164C44.1636 8.87156 44.285 7.93103 44.2677 7.18826C44.2605 6.92603 44.2345 6.70774 44.1911 6.55977L44.1449 6.39569L44.0972 6.46748V6.46601Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.5047 8.19326L44.483 8.26798C44.3775 8.61225 44.3269 8.94921 44.3356 9.26858C44.3558 9.99083 44.6709 10.5563 45.2749 10.9489L45.376 11.0134L45.3977 10.8742L45.4064 10.7629C45.389 10.1754 44.9584 8.69576 44.6203 8.24307L44.5263 8.11855L44.5032 8.1918L44.5047 8.19326Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M43.3168 10.4875L43.3602 10.5622C43.8139 11.3328 44.5842 12.329 46.0249 12.0726L46.1448 12.0506L46.0769 11.9481C45.8081 11.5423 44.0596 10.5431 43.4411 10.4406L43.2721 10.4128L43.3154 10.4875H43.3168Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.4483 12.4462L45.2214 12.5077L45.4382 12.5986C46.3543 12.978 47.5017 13.0908 48.1679 12.8637C48.4178 12.7773 48.5696 12.6381 48.756 12.455C49.9279 12.578 51.0247 13.5655 51.6649 14.3727L51.6995 14.4122L51.7487 14.3961C51.8209 14.3712 51.9307 14.2848 51.9784 14.2335L52.0232 14.1837L51.9828 14.1295C51.3152 13.2446 50.2704 12.6967 50.2241 12.6747C49.2834 12.2103 47.6231 11.847 45.4468 12.4462H45.4483Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M45.496 9.97618L45.509 10.0538C45.6463 10.9284 45.996 12.077 47.454 11.9496L47.5479 11.9422L47.5248 11.8499C47.4265 11.4514 46.0913 10.297 45.6246 9.97179L45.4844 9.89854L45.496 9.97618Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.7991 1.88492L55.8381 2.11054C55.974 2.91336 56.3063 3.60924 56.7485 4.01945L56.8497 4.11321L56.8843 3.95059C56.8843 3.95059 56.8959 3.89638 56.8959 3.89345C57.0072 3.07158 56.2847 2.3215 55.9682 2.03729L55.8829 1.96257L55.7977 1.88639L55.7991 1.88492Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.3179 3.28401L57.2413 3.47886C57.0173 4.05607 56.9161 5.34675 56.9927 5.96352L57.0621 6.31219L57.117 6.24187L57.169 6.17448C57.6343 5.60166 57.6502 4.83253 57.5809 4.29047C57.5317 3.90664 57.4407 3.61803 57.3916 3.48179L57.3554 3.38217L57.3193 3.28401H57.3179Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.8814 5.50057L57.7543 5.65733C57.3077 6.2111 56.7109 7.75522 56.6936 8.27384L56.6878 8.42913C56.6878 8.42913 56.815 8.34562 56.815 8.34416C57.9045 7.62044 57.932 6.25798 57.8944 5.70421L57.8872 5.60312L57.8814 5.50204V5.50057Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M57.721 7.95007L57.5621 8.05262C56.8612 8.50238 55.7702 9.86777 55.5592 10.4538L55.5029 10.6091L55.6589 10.5578C56.7904 10.1901 57.5245 8.91991 57.6835 8.13613L57.7037 8.04237L57.7225 7.94861L57.721 7.95007Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.3815 3.05986L55.4393 3.2635C55.5954 3.82167 56.1474 4.81055 56.5953 5.20171L56.7167 5.30719L56.7268 5.12846C56.7731 4.34907 56.3901 3.71033 55.5578 3.17267L55.4697 3.11553L55.3829 3.0584L55.3815 3.05986Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.8598 4.78711L55.8526 4.96438C55.8295 5.54892 56.2702 6.80443 56.604 7.28056L56.695 7.40948L56.7456 7.26005C56.7991 7.0989 56.8309 6.94654 56.841 6.80297C56.9017 5.87122 56.2037 5.1182 55.987 4.91017L55.8598 4.78711Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.841 6.39423L55.7933 6.55831C55.75 6.70628 55.724 6.92456 55.7182 7.1868C55.6994 7.93103 55.8208 8.8701 55.9725 9.16017L56.0347 9.27737L56.1098 9.16603C56.3294 8.8364 56.4465 8.48187 56.4552 8.11122C56.4667 7.61019 56.2875 7.0652 55.935 6.53633L55.8425 6.39276L55.841 6.39423Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M55.4538 8.12001L55.3613 8.24454C55.0231 8.69576 54.5911 10.1769 54.5752 10.7644C54.5752 10.7644 54.5838 10.8728 54.5838 10.8757L54.6055 11.0149L54.7081 10.9504C55.3107 10.5593 55.6272 9.99376 55.6474 9.27005C55.6561 8.95067 55.6069 8.61372 55.5 8.26944L55.4769 8.19473L55.4538 8.12148V8.12001Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M56.7095 10.4128L56.5419 10.4406C55.9234 10.5431 54.1749 11.5437 53.9061 11.9481L53.8382 12.0506L53.9581 12.0726C55.4003 12.3275 56.1691 11.3328 56.6228 10.5622L56.7095 10.4128Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M49.7588 12.6747C49.7126 12.6967 48.6678 13.2461 48.0002 14.1295L47.9598 14.1837L48.0046 14.2335C48.0508 14.2848 48.1606 14.3712 48.2329 14.3961L48.282 14.4122L48.3167 14.3727C48.9554 13.5655 50.0536 12.578 51.2256 12.455C51.4105 12.6381 51.5637 12.7773 51.8151 12.8637C52.4799 13.0908 53.6287 12.978 54.5448 12.5986L54.7616 12.5077L54.5347 12.4462C52.357 11.847 50.6981 12.2103 49.7574 12.6747H49.7588Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M54.4986 9.89854L54.3584 9.97179C53.8917 10.297 52.5564 11.4529 52.4582 11.8499L52.4351 11.9422L52.5275 11.9496C53.9856 12.077 54.3367 10.9284 54.474 10.0538L54.487 9.97618L54.4986 9.89854Z"
                                                    fill="white"
                                                />
                                                <path d="M17.218 0.893111H19.0604V2.59545H17.218V0.893111ZM17.3639 4.53073H18.913V12.8271H17.3639V4.53073Z" fill="white" />
                                                <path
                                                    d="M5.67207 4.53659H7.22116V12.833H5.70531V11.6097H5.67352C5.05359 12.6513 4.01027 13.0805 2.86869 13.0805C1.15776 13.0805 0.179469 11.7591 0.179469 10.089V4.53659H1.72711V9.44585C1.72711 10.8845 2.05369 11.9408 3.5363 11.9408C4.17212 11.9408 5.03625 11.6097 5.36139 10.7512C5.65473 9.97325 5.67207 8.99902 5.67207 8.79978V4.53659Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10.3135 5.75988H10.3468C10.8684 4.71972 12.0086 4.28901 12.825 4.28901C13.3958 4.28901 15.9218 4.43697 15.9218 7.0989V12.8344H14.3741V7.61165C14.3741 6.2404 13.8033 5.49618 12.4984 5.49618C12.4984 5.49618 11.6502 5.44637 10.9985 6.10709C10.7702 6.33856 10.3468 6.70188 10.3468 8.32218V12.8344H8.7977V4.53659H10.3135V5.75988Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M25.3983 7.19852C25.3174 6.16422 24.8319 5.44197 23.7308 5.44197C22.2583 5.44197 21.6904 6.73704 21.6904 8.67672C21.6904 10.6164 22.2583 11.9129 23.7308 11.9129C24.7495 11.9129 25.3824 11.242 25.4619 10.0568H27.0023C26.8708 11.9129 25.511 13.0454 23.7134 13.0454C21.1066 13.0454 20.0705 11.1746 20.0705 8.74411C20.0705 6.31365 21.2684 4.30952 23.8449 4.30952C25.5616 4.30952 26.8564 5.41121 26.9344 7.19999H25.3983V7.19852Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.3144 8.97118C29.2017 10.4171 29.784 11.9115 31.3533 11.9115C32.5527 11.9115 33.151 11.4353 33.3287 10.234H34.9501C34.7058 12.1092 33.281 13.0439 31.3389 13.0439C28.7306 13.0439 27.6931 11.1731 27.6931 8.74264C27.6931 6.31219 28.8939 4.30805 31.469 4.30805C33.8981 4.35933 35.0469 5.9181 35.0469 8.20205V8.97118H29.3144ZM33.4284 7.88854C33.4602 6.50996 32.8446 5.44197 31.3548 5.44197C30.073 5.44197 29.3158 6.53926 29.3158 7.88854H33.4299H33.4284Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M36.7896 12.7978V5.63828H35.3908V4.55271H36.7896V2.78151C36.8402 0.975152 38.1826 0.499023 39.3329 0.499023C39.7042 0.499023 40.0626 0.597179 40.4369 0.66164V1.95817C40.1753 1.94499 39.9167 1.90836 39.6566 1.90836C38.7838 1.90836 38.2809 2.1413 38.3286 3.04228V4.55271H40.2086V5.63828H38.3286V12.7978H36.7896Z"
                                                    fill="white"
                                                />
                                                <path d="M57.3323 18.8307V18.5157H0.147677V18.8307H57.3323Z" fill="white" />
                                                <path
                                                    d="M1.09563 29.8095V25.1464H0.0566406V24.5721H1.09563V23.4557C1.09563 22.5592 1.45544 22.1519 2.33981 22.1519C2.53489 22.1519 2.74153 22.2251 2.92649 22.2662V22.7672C2.80366 22.7467 2.66928 22.7262 2.54645 22.7262C1.70254 22.7262 1.68231 23.154 1.71266 23.904V24.5721H2.88603V25.1464H1.71266V29.8095H1.09563Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M7.93212 27.1915C7.93212 28.5686 7.17058 29.9663 5.52468 29.9663C3.87878 29.9663 3.11724 28.5686 3.11724 27.1915C3.11724 25.8144 3.87878 24.4168 5.52468 24.4168C7.17058 24.4168 7.93212 25.8144 7.93212 27.1915ZM5.52468 24.9911C4.2805 24.9911 3.78629 26.2217 3.78629 27.1915C3.78629 28.1614 4.2805 29.392 5.52468 29.392C6.76886 29.392 7.26306 28.1614 7.26306 27.1915C7.26306 26.2217 6.76886 24.9911 5.52468 24.9911Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M9.44797 29.8095H8.83093V25.7514C8.84105 25.3441 8.80059 24.9281 8.77891 24.5736H9.41617L9.44652 25.3456H9.46675C9.65172 24.8138 10.1156 24.4388 10.63 24.4168C10.8352 24.4065 11.0418 24.4168 11.247 24.4271V25.0321C11.1242 25.0218 10.9898 24.9896 10.867 24.9896C9.95084 24.9896 9.4682 25.6577 9.44652 26.6583V29.808L9.44797 29.8095Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.2426 27.3366C14.2628 28.4529 14.7672 29.392 16.033 29.392C16.7642 29.392 17.3711 28.8602 17.5243 28.1409H18.1731C17.8538 29.392 17.0821 29.9663 15.8379 29.9663C14.2946 29.9663 13.575 28.6214 13.575 27.1915C13.575 25.7617 14.3467 24.4168 15.8798 24.4168C17.6081 24.4168 18.2353 25.7001 18.2353 27.338H14.2441L14.2426 27.3366ZM17.5662 26.7623C17.494 25.75 16.9593 24.9896 15.8885 24.9896C14.8799 24.9896 14.3452 25.8452 14.2628 26.7623H17.5662Z"
                                                    fill="white"
                                                />
                                                <path d="M19.0676 24.5721L20.8479 28.9422L22.5661 24.5721H23.2452L21.1976 29.808H20.4982L18.3884 24.5721H19.0676Z" fill="white" />
                                                <path
                                                    d="M24.0414 27.3366C24.0617 28.4529 24.566 29.392 25.8318 29.392C26.563 29.392 27.17 28.8602 27.3231 28.1409H27.972C27.6526 29.392 26.8809 29.9663 25.6368 29.9663C24.0935 29.9663 23.3738 28.6214 23.3738 27.1915C23.3738 25.7617 24.1455 24.4168 25.6787 24.4168C27.4069 24.4168 28.0341 25.7001 28.0341 27.338H24.0429L24.0414 27.3366ZM27.365 26.7623C27.2928 25.75 26.7581 24.9896 25.6873 24.9896C24.6787 24.9896 24.144 25.8452 24.0617 26.7623H27.365Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M29.6121 29.8095H28.995V25.7514C29.0052 25.3441 28.9647 24.9281 28.943 24.5736H29.5803L29.6106 25.3456H29.6309C29.8158 24.8138 30.2797 24.4388 30.7941 24.4168C30.9993 24.4065 31.206 24.4168 31.4111 24.4271V25.0321C31.2883 25.0218 31.1539 24.9896 31.0311 24.9896C30.115 24.9896 29.6323 25.6577 29.6106 26.6583V29.808L29.6121 29.8095Z"
                                                    fill="white"
                                                />
                                                <path d="M32.7391 24.5721L34.4775 28.9525L36.2058 24.5721H36.8749L34.0252 31.8107H33.3461L34.1278 29.808L31.9877 24.5721H32.7391Z" fill="white" />
                                                <path
                                                    d="M42.7605 26.1792C42.7085 25.3764 42.2056 24.9896 41.3516 24.9896C40.4051 24.9896 39.8184 25.9902 39.8184 27.1798C39.8184 28.3694 40.4051 29.3905 41.3516 29.3905C42.1536 29.3905 42.7099 28.8895 42.7605 28.1702H43.4296C43.2648 29.37 42.5857 29.9648 41.4137 29.9648C39.8704 29.9648 39.1508 28.6199 39.1508 27.1901C39.1508 25.7602 39.9224 24.4153 41.4556 24.4153C42.5149 24.4153 43.379 25.0629 43.431 26.1777H42.762L42.7605 26.1792Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M44.9078 25.3661H44.9281C45.2879 24.7201 45.8746 24.4168 46.5436 24.4168C48.2314 24.4168 48.3644 25.9287 48.3644 26.5337V29.8095H47.7473V26.4297C47.7473 25.5229 47.2329 24.9896 46.389 24.9896C45.3703 24.9896 44.9078 25.8554 44.9078 26.7945V29.8095H44.2908V22.2793H44.9078V25.3661Z"
                                                    fill="white"
                                                />
                                                <path d="M50.0724 23.0602H49.3528V22.2779H50.0724V23.0602ZM50.0204 24.5721V29.808H49.4034V24.5721H50.0204Z" fill="white" />
                                                <path d="M51.8527 29.8095H51.2357V22.2793H51.8527V29.8095Z" fill="white" />
                                                <path
                                                    d="M56.7109 29.0374L56.6907 28.995C56.2688 29.6205 55.6416 29.9648 54.9205 29.9648C53.3873 29.9648 52.8007 28.4837 52.8007 27.1696C52.8007 25.8554 53.3873 24.4153 54.9205 24.4153C55.6098 24.4153 56.3295 24.7494 56.6907 25.3647L56.7109 25.3441V22.2779H57.328V28.6302C57.328 29.0374 57.3583 29.4535 57.38 29.808H56.7427L56.7124 29.036L56.7109 29.0374ZM55.0231 24.9911C53.8498 24.9911 53.4697 26.0972 53.4697 27.0978C53.4697 28.0984 53.7472 29.392 54.9306 29.392C56.2789 29.392 56.6893 28.2551 56.6893 27.0655C56.6893 26.0019 56.2269 24.9896 55.0231 24.9896V24.9911Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                    {/* <li className="client-list__elem">
                                        <div className="client-logo _bioderma"></div>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="company_profile-block">
                                <div className="text-block">
                                    <p className="title">
                                        지금,
                                        {device === 'moible' ? <br /> : ' '}
                                        브랜드의 고민은
                                        {device === 'moible' ? <br /> : ' '}
                                        무엇인가요?
                                    </p>
                                    <p className="desc">
                                        미니버타이징 소개서를
                                        {device === 'moible' ? <br /> : ' '}
                                        메일로 보내드립니다.
                                    </p>
                                </div>
                                <button type="button" className="btn-company_profile">
                                    소개서 받기
                                </button>
                            </div>
                            <div className="portfolio-block">
                                <p className="small-title">
                                    미니버타이징의
                                    <br />
                                    포트폴리오 확인하기
                                </p>
                                <div className="box-container">
                                    <Swiper
                                        // install Swiper modules
                                        modules={[Scrollbar, A11y]}
                                        spaceBetween={device === 'mobile' ? 10 : 20}
                                        slidesPerView={'auto'}
                                        // slidesOffsetBefore={device === 'mobile' ? 64 : 150}
                                        // slidesOffsetAfter={device === 'mobile' ? 64 : 150}
                                        slidesOffsetBefore={window.innerWidth >= 1200 ? 0 : window.innerWidth >= 720 ? (window.innerWidth / 100) * 2 * 3 : (window.innerWidth / 100) * 2.666666 * 3}
                                        slidesOffsetAfter={
                                            window.innerWidth >= 1200
                                                ? (window.innerWidth / 100) * 6.8
                                                : window.innerWidth >= 720
                                                ? (window.innerWidth / 100) * 2 * 3
                                                : (window.innerWidth / 100) * 2.666666 * 3
                                        }
                                        // freeMode={true}
                                        updateOnWindowResize={true}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                        onResize={(swiper) => {
                                            // if(device==='desktop') {
                                            //     swiper.params.slidesOffsetAfter = (window.innerWidth-1200)/2;
                                            //     swiper.params.slidesOffsetBefore = (window.innerWidth-1200)/2;
                                            //     swiper.update();
                                            // }
                                        }}
                                    >
                                        {workList.map((slideContent, index) => (
                                            <SwiperSlide className="related-box" key={index}>
                                                {/* <div className="related-box" key={item.idx}> */}
                                                <WorkBox item={slideContent} />
                                                {/* </div> */}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                {device === 'mobile' ? (
                                    <button type="button" className="go-top" onClick={goTopHandler}>
                                        Back to top
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <div>{device === 'mobile' ? null : <Footer />}</div>
                </div>
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default About;
