// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeColor } from './../store.js';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SmoothScrollbar from 'smooth-scrollbar';
import PageTransition from '../components/PageTransition';
import WorkBox from '../components/WorkBox';
import Footer from '../components/Footer';
// import lottie from 'lottie-web';
import Lottie from 'lottie-react';
import animationData from '../about_title_animation.json';
import Header from '../components/Header';

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
    const scrollContainerRef = useRef(null);
    const goTopRef = useRef(null);

    let scroller;
    let bodyScrollBar;

    useEffect(() => {
        // const container = document.querySelector('#anim-container');
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

        // SmoothScrollbar Setup
        // const scroller = document.querySelector('[data-scrollbar]');
        // const bodyScrollBar = SmoothScrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });
        // const bodyScrollBar = SmoothScrollbar.init(scroller, { damping: 0.1, delegateTo: document });
        // scroller = document.querySelector('[data-scrollbar]');
        scroller = scrollContainerRef.current;
        bodyScrollBar = SmoothScrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: false, thumbMinSize: 1 });
        // @todo 스타일 커스텀!!


        // SmoothScrollbar와 ScrollTrigger 연동
        // ScrollTrigger.scrollerProxy('[data-scrollbar]', {
        ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
            scrollTop(value) {
              if (arguments.length) {
                bodyScrollBar.scrollTop = value;
              }
              return bodyScrollBar.scrollTop;
            }
        });
        if(device === 'mobile') {
            goTopRef.current.addEventListener('click', goTopHandler);
        }

        bodyScrollBar.addListener(ScrollTrigger.update);
        // bodyScrollBar.addListener(ScrollTrigger.refresh); 
        ScrollTrigger.defaults({ scroller: scroller });

        let posterTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.poster-section',
                start: 'top-=500 top',
                end: 'bottom top',
                // markers: true,
            },
        });
        posterTl.addLabel('start').to('.poster-section', { backgroundPosition: '40% center', duration: 8, ease: 'linear' }, 'start');

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
                end: 'bottom+=2000 top',
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
        tl.addLabel('start', '+=0.3')
            .to('.ani-box._01 .title', { autoAlpha: 0, duration: 1 }, 'start')
            // .set('#scroll-animation_container', { backgroundColor: '#ffffff' })
            .addLabel('scale-down')
            .set('.ani-box._02 .typo-wrap', { autoAlpha: 1}, 'scale-down')
            .to('.ani-box._01', { width: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', height: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', duration: 1 }, 'scale-down')
            .to('.ani-box._01 .desc-block .desc', { autoAlpha: 1, duration: 0.2 }, 'scale-down+=0.2')
            .to('.ani-box._01 .desc-block .desc', { fontSize: window.innerWidth < 1200 ? 1.2 + 'rem' : 2.5 + 'rem', duration: 0.5 }, 'scale-down+=0.5')
            // .to('.ani-box._01', { width: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', height: window.innerWidth < 1200 ? 28 + 'rem' : 55 + 'rem', duration: 1 }, 'scale-up')
            .addLabel('bg-in', '+=0.8')
            .to('.ani-box._01 .desc-block .desc', { autoAlpha: 0, duration: 0.3 }, 'bg-in')
            .to('.ani-box._01', { height: 100 + '%', duration: 0.8 })
            .to('.ani-box._01', { width: 100 + '%', duration: 0.8 })
            .set('.ani-box._03', { autoAlpha: 1 })
            .addLabel('typo-scale-down')
            .to('.ani-box._01', { autoAlpha: 0, duration: 1 }, 'typo-scale-down')
            .to('.ani-box._03 .typo', { fontSize: window.innerWidth < 1200 ? 4 + 'rem' : 13 + 'rem', duration: 3 }, 'typo-scale-down')
            .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -50, duration: 0.5 })
            .addLabel('show-typo1')
            .to('.ani-box._03 .typo._02', { autoAlpha: 1, duration: 0.5 }, 'show-typo1')
            .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -100, duration: 0.5 })
            .addLabel('show-typo2')
            .to('.ani-box._03 .typo._03', { autoAlpha: 1, duration: 0.5 }, 'show-typo2');

        // let tl2 = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '#scroll-animation_container .ani-block._02',
        //         pin: true,
        //         start: 'top top',
        //         end: 'bottom top',
        //         markers: true,
        //         scrub: true,
        //     },
        // });
        // tl2.addLabel('start')
        //     // .set('.ani-box._03 .typo', { scale: window.innerWidth < 1200 ? 20 : 8 })
        //     .addLabel('typo-scale-down')
        //     // .to('.scroll-animation_bg', { autoAlpha: 0, duration: 1 }, 'typo-scale-down')
        //     .to('.ani-box._03 .typo', { fontSize: window.innerWidth < 1200 ? 4 + 'rem' : 13 + 'rem', duration: 4 }, 'typo-scale-down')
        //     // .to('.ani-box._03 .typo', { scale: 1, duration: 1 }, 'typo-scale-down')
        //     .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -50, duration: 1.2 })
        //     .addLabel('show-typo1')
        //     .to('.ani-box._03 .typo._02', { autoAlpha: 1, duration: 0.5 }, 'show-typo1')
        //     .to('.ani-box._03 .typo-element .typo-wrap', { yPercent: -100, duration: 1.2 })
        //     .addLabel('show-typo2')
        //     .to('.ani-box._03 .typo._03', { autoAlpha: 1, duration: 0.5 }, 'show-typo2');
        // .set('#scroll-animation_container', { backgroundColor: '#000000' });

        let tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._03',
                // start: window.innerWidth < 1200 ? 'top-=300 top' : 'top top',
                start: 'top top',
                end: 'bottom top',
                // markers: true,
                onLeaveBack: function () {
                    tl3.reverse();
                },
            },
        });
        tl3.addLabel('start').to(window.innerWidth < 1200 ? '.text-section .desc span' : '.text-section .desc .text-box', { autoAlpha: 1, y: 0, stagger: 0.1 }, 'start');

        let tl3_1 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._03',
                start: 'top top',
                end: 'bottom+=1000 top',
                // markers: true,
                pin: true,
                scrub: true,
            },
        });
        tl3_1
            .addLabel('start', '+=1')
            .to('.slide-wrapper', { rotate: -10, duration: 1 }, 'start')
            .to('.slide-wrapper', { rotate: -20, duration: 1 })
            .to('.slide-wrapper', { rotate: -30, duration: 1 });

        let tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-animation_container .ani-block._04',
                pin: true,
                start: 'top top',
                end: 'bottom+=1500 top',
                // markers: true,
                scrub: true,
            },
        });

        tl4.addLabel('start', '+=2')
            .to('.ani-block._04 .director-box._01', { autoAlpha: 1, y: 0, duration: 1 }, 'start')
            .to('.ani-block._04 .director-box._01 .img-box', { autoAlpha: 1, duration: 1 }, 'start+=0.4')
            // .to('.ani-block._04 .director-box._01 .img-box', { y: 0, duration: 1 }, 'start+=0.5')
            .to('.ani-block._04 .director-box._01 .text-box .title', { autoAlpha: 1, duration: 1 }, 'start+=0.5')
            .to('.ani-block._04 .director-box._01 .text-box .title', { y: 0, duration: 1 }, 'start+=0.6')
            .to('.ani-block._04 .director-box._01 .text-box .desc', { autoAlpha: 1, duration: 1 }, 'start+=0.6')
            .to('.ani-block._04 .director-box._01 .text-box .desc', { y: 0, duration: 1 }, 'start+=0.7')
            .addLabel('box-01-out', window.innerWidth < 1200 ? '+=5' : '+=1')
            .addLabel('box-02-in', '+=8')
            // .to('.ani-block._04 .director-box._01', { autoAlpha: 0, y: '-2rem', duration: 3 }, 'box-01-out')
            .to(
                window.innerWidth < 1200 ? '.ani-block._04 .director-box._01' : '.ani-block._04 .director-block > .title',
                { autoAlpha: 0, y: window.innerWidth < 1200 ? '-2rem' : '-80vh', duration: 3 },
                'box-01-out'
            )
            .to('.ani-block._04 .director-box._02', { autoAlpha: 1, y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in' : 'start')
            .to('.ani-block._04 .director-box._02 .img-box', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.4' : 'start+=0.4')
            // .to('.ani-block._04 .director-box._02 .img-box', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.5' : 'start+=0.5')
            .to('.ani-block._04 .director-box._02 .text-box .title', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.5' : 'start+=0.5')
            .to('.ani-block._04 .director-box._02 .text-box .title', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.6' : 'start+=0.6')
            .to('.ani-block._04 .director-box._02 .text-box .desc', { autoAlpha: 1, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.6' : 'start+=0.6')
            .to('.ani-block._04 .director-box._02 .text-box .desc', { y: 0, duration: 1 }, window.innerWidth < 1200 ? 'box-02-in+=0.7' : 'start+=0.7')
            .addLabel('box-02-out', window.innerWidth < 1200 ? '+=5' : '+=1')
            // .to('.ani-block._04 .director-box._02', { autoAlpha: 0, y: '-2rem', duration: 3 }, window.innerWidth < 1200 ? 'box-02-out' : 'box-01-out');
            .to(
                window.innerWidth < 1200 ? '.ani-block._04 .director-box._02' : '.ani-block._04 .director-block > .title',
                { autoAlpha: 0, y: window.innerWidth < 1200 ? '-2rem' : '-80vh', duration: 3 },
                window.innerWidth < 1200 ? 'box-02-out' : 'box-01-out'
            );
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
        // const slideAngle = 10;
        // const slideWrapperAngle = 0;

        // * 원형 슬라이드 세팅
        // function circularSliderSetting() {
        //     // * 슬라이드들 초기 각도 세팅
        //     for (let index = 0; index < sliderWrapperRef.current.children.length; index++) {
        //         let $this = sliderWrapperRef.current.children[index];
        //         console.log(sliderWrapperRef.current.children[index]);

        //         gsap.set($this, { transform: 'rotate(' + slideAngle * index + 'deg)' });
        //         $this.dataset.elRotation = slideAngle * index;
        //     }
        //     gsap.set('.slide-wrapper', { transform: 'rotate(' + slideWrapperAngle + 'deg)' });

        //     // * Draggable 세팅
        //     Draggable.create('.slide-wrapper', {
        //         type: 'rotation',
        //         // dragResistance: 0.78,
        //         edgeResistance: 0.3,
        //         force3D: true,
        //         dragClickable: false,
        //         bounds: {
        //             maxRotation: -(slideAngle * 3),
        //             // maxRotation: -360,
        //             minRotation: 0,
        //         },
        //         onClick: function () {},
        //         onDragStart: function () {},
        //         onMove: function () {
        //             let direction = this.getDirection();
        //             console.log('움직인 방향', this.getDirection());
        //             // console.log('마지막각도', lastSlideWrapperAngle);
        //             console.log('로테이트', this.rotation);
        //             console.log('슬라이드 앵글', slideAngle);
        //             console.log('움직인 각도', Math.abs(slideWrapperAngle - this.rotation));
        //             if (Math.abs(slideWrapperAngle - this.rotation) > 5) {
        //                 console.log('클론 슬라이드 추가 해야함', direction);
        //                 switch (direction) {
        //                     case 'clockwise':
        //                         // TODO: 시계방향, 제일 첫번째 슬라이드를 맨 마지막 슬라이드 뒤에 붙여야함
        //                         console.log('시계방향');
        //                         break;

        //                     case 'counter-clockwise':
        //                         // TODO: 반시계방향, 제일 마지막 슬라이드를 첫번째 슬라이드 얖에 붙여야함
        //                         console.log('반시계방향');
        //                         break;

        //                     default:
        //                         break;
        //                 }
        //             }
        //         },
        //         onDragEnd: function () {
        //             customSnap(this.rotation);
        //         },
        //     });
        // }
        // circularSliderSetting();

        // * 원형 슬라이드 드래그 종료 후 가장 인접한 각도로 세팅해주는 함수
        // function customSnap(value) {
        //     let $nextEl = '';
        //     let snapVal = Math.round(value / slideAngle) * slideAngle;
        //     let rotaVal = 0;
        //     gsap.to('.slide-wrapper', { duration: 0.25, rotation: snapVal, ease: 'back.out(1.7)' });
        //     for (let index = 0; index < sliderWrapperRef.current.children.length; index++) {
        //         let $this = sliderWrapperRef.current.children[index];
        //         rotaVal = $this.dataset.elRotation;
        //         if (Math.abs(snapVal) == rotaVal) {
        //             $nextEl = $this;
        //         }
        //     }
        //     // console.log(snapVal, rotaVal);
        //     // TODO: 원형 슬라이드를 컴포넌트화 했으나 그 후,  액티브 클래스 부여 함수 작동 안됨. 수정해야함
        //     // activeClassChange($nextEl);
        // }

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
        bodyScrollBar.scrollTo(0, 0);
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth',
        //     duration: window.innerHeight * 0.1,
        // });
    };

    let [workCategoryData, setWorkCategoryData] = useState(['video', 'development', 'product-manager', 'designer']);

    function WorkSlide({ workCategory, index }) {
        const slideAngle = 10;
        return (
            <div className={`slide`} data-work-category={workCategory} data-el-rotation={index * slideAngle} style={{ transform: 'rotate(' + index * slideAngle + 'deg)' }}>
                <div className="card">{/* <div className="desc"></div> */}</div>
            </div>
        );
    }

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeIn', duration: 0.7 }} exit={{ opacity: 0 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName} data-scrollbar ref={scrollContainerRef}>
                <Header />
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
                    <div className="poster-section"></div>
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
                                            깊이 있게 관찰하여 제안합니다. 새로운 전략으로 브랜드가 사랑 받을 아이디어를 기어코 가지고 옵니다. 당신의 브랜드가 잘 되는 것이 우리의 일입니다.
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
                                                <span>프로덕션입니다</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="ani-block _02">
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
                            </div> */}
                            <div className="ani-block _03">
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
                            </div>
                            <div className="ani-block _04">
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
                                            <div className="inner">
                                                <div className="img-box"></div>
                                                <div className="text-box">
                                                    <p className="title">디렉터 양선혜</p>
                                                    <p className="desc">대학교때부터 광고 일에 연루되어 크리에이티브하다는 오명을 썼으나 현재는 업으로 삼고 대행사 대표로 일하고 있다.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="director-box _02">
                                            <div className="inner">
                                                <div className="img-box"></div>
                                                <div className="text-box">
                                                    <p className="title">디렉터 양건영</p>
                                                    <p className="desc">자신의 머리카락은 못 잡지만 크리에이티브는 잘 잡는 편이다. 빡빡한 마케팅에 설탕 같은 존재가 되고자 한다.</p>
                                                </div>
                                            </div>
                                        </div>
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
                                <div className="client-logo _nescafe-dolcegusto">
                                    <svg viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M67.6274 30.2274C67.2204 30.2274 66.9018 29.9114 66.9018 29.5094C66.9018 29.1074 67.2204 28.7914 67.6274 28.7914C68.0344 28.7914 68.3581 29.1125 68.3581 29.5094C68.3581 29.9063 68.0344 30.2274 67.6274 30.2274V30.1086C67.9637 30.1086 68.2392 29.8507 68.2392 29.5094C68.2392 29.1681 67.9637 28.9077 67.6274 28.9077C67.2911 28.9077 67.0181 29.1706 67.0181 29.5094C67.0181 29.8482 67.2987 30.1086 67.6274 30.1086V30.2274Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M67.4757 29.919H67.3544V29.115H67.6679C67.8549 29.115 67.951 29.163 67.951 29.3274C67.951 29.4917 67.8423 29.5347 67.7437 29.5347L67.9637 29.919H67.817L67.6173 29.5473H67.4757V29.4285H67.6704C67.7639 29.4285 67.8297 29.426 67.8297 29.3274C67.8297 29.249 67.7816 29.2313 67.6704 29.2313H67.4757V29.919Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M63.4988 18.5546C63.3648 19.3586 63.0817 20.1322 62.4572 20.782C62.1563 21.0904 61.7291 21.4115 61.3195 21.5354H63.0387C63.562 21.5354 64.5935 21.28 65.132 20.7238C66.1181 19.7024 66.108 18.585 66.3127 17.068H64.8388C64.4621 17.068 63.7441 17.0857 63.4988 18.5546Z"
                                            fill="#E1251B"
                                        />
                                        <path
                                            d="M19.0325 30.1592H20.7997V23.2521L23.8917 28.7661C24.5339 29.924 24.9687 30.3109 26.1722 30.3109C26.5312 30.3109 26.9837 30.2653 27.1379 30.1718V21.5025H57.7016C58.2022 21.5025 59.8658 21.0879 59.8658 20.1145H25.3909V27.0039L22.2837 21.5025C21.6416 20.3471 21.2042 19.9578 20.0033 19.9578C19.6443 19.9578 19.1892 20.0033 19.0325 20.0943V30.1592Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M65.5972 25.6994H62.7328V24.1142H66.0574V22.7085H60.7532V27.1379C60.7532 28.1846 60.9276 29.1175 61.3726 29.5625C61.9389 30.1162 62.9224 30.321 64.2194 30.321C64.8995 30.321 65.6276 30.2123 66.0852 29.9872V28.6776C65.534 28.8344 64.9652 28.9127 64.409 28.9127C63.653 28.9127 63.1904 28.847 62.9553 28.5032C62.7505 28.2023 62.7328 27.727 62.7328 27.1405V27.1101H65.5972V25.6994ZM50.0841 24.4808C50.4962 25.3201 50.8274 26.3643 51.1131 27.4388H49.1208C49.3711 26.4427 49.7048 25.4137 50.0841 24.4808ZM43.1391 26.4275C43.1391 27.5045 43.2048 28.1846 43.4222 28.5158C43.6346 28.8318 44.1503 28.9127 44.7066 28.9127C45.3234 28.9127 45.7962 28.847 46.3499 28.6776L46.0465 30.053C45.6698 30.2426 45.101 30.3235 44.5599 30.3235C43.4677 30.3235 42.3781 30.1642 41.7763 29.5347C41.2075 28.9456 41.0153 27.7295 41.0153 26.43C41.0153 25.1305 41.2075 23.8993 41.7763 23.3102C42.3781 22.6958 43.4677 22.5366 44.5599 22.5366C45.1465 22.5366 45.781 22.6503 46.1931 22.8526V24.1824C45.685 24.008 45.2122 23.9448 44.7066 23.9448C44.1503 23.9448 43.6321 24.0257 43.4222 24.3417C43.2048 24.6906 43.1391 25.3555 43.1391 26.43M59.5851 25.7019H56.5437V24.1167H59.8683V22.711H54.5666V28.9153C54.5666 30.0075 55.4869 30.1516 56.5437 30.1516V27.1127H59.5851V25.7019ZM37.4556 22.5189C38.5781 22.5189 39.3695 22.7565 39.6855 22.9487V24.2937C39.0054 24.0864 38.343 23.9423 37.5517 23.9423C37.0258 23.9423 36.7401 23.9903 36.553 24.1319C36.3634 24.2735 36.3154 24.908 36.553 25.0648C37.1876 25.4921 39.0711 25.8081 39.7007 26.5059C40.4313 27.2997 40.2746 29.1352 39.5136 29.7193C38.927 30.1617 37.9309 30.321 37.1092 30.321C35.9033 30.321 35.1473 30.1162 34.7808 29.9089V28.5462C35.5089 28.7535 36.285 28.9102 37.0738 28.9102C37.5972 28.9102 37.9183 28.8318 38.075 28.7054C38.2469 28.5639 38.3102 27.9293 38.075 27.7725C37.4404 27.3427 35.6682 27.0899 35.0032 26.3946C34.356 25.712 34.4799 23.8007 35.0664 23.2445C35.701 22.6453 36.553 22.5163 37.4556 22.5163M33.2309 27.1076V25.6994H30.3639V24.1142H33.686V22.7085H28.3869V27.1379C28.3869 28.1846 28.5588 29.1175 29.0012 29.5625C29.5726 30.1162 30.551 30.321 31.8505 30.321C32.5332 30.321 33.2588 30.2123 33.7164 29.9872V28.6776C33.1652 28.8344 32.5938 28.9127 32.0402 28.9127C31.2792 28.9127 30.8216 28.847 30.5839 28.5032C30.3791 28.2023 30.3614 27.727 30.3614 27.1405V27.1101H33.2284L33.2309 27.1076ZM53.8334 30.1465C53.2494 27.4236 52.314 24.3695 51.4468 22.6453H49.1815C48.2334 24.367 47.4724 26.9787 46.8404 30.1465H48.5975C48.6607 29.6864 48.7391 29.1959 48.8503 28.6903H51.3988C51.51 29.1959 51.6061 29.7041 51.6844 30.1465H53.836H53.8334Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M71.7434 64.9298C71.3388 64.9298 71.0203 64.6163 71.0203 64.2168C71.0203 63.8174 71.3388 63.5014 71.7434 63.5014C72.1479 63.5014 72.469 63.8224 72.469 64.2168C72.469 64.6112 72.1479 64.9298 71.7434 64.9298V64.8135C72.0796 64.8135 72.3527 64.5582 72.3527 64.2168C72.3527 63.8755 72.0796 63.6177 71.7434 63.6177C71.4071 63.6177 71.1366 63.8781 71.1366 64.2168C71.1366 64.5556 71.4172 64.8135 71.7434 64.8135V64.9298Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M71.5917 64.6214H71.4703V63.8224H71.7838C71.9709 63.8224 72.067 63.8705 72.067 64.0348C72.067 64.1991 71.9583 64.2396 71.8622 64.2396L72.0821 64.6214H71.933L71.7332 64.2522H71.5942V64.1334H71.7863C71.8799 64.1334 71.9456 64.1284 71.9456 64.0323C71.9456 63.9539 71.9001 63.9362 71.7863 63.9362H71.5942V64.6188L71.5917 64.6214Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M36.285 48.3472C39.0509 48.3472 39.5995 44.9619 39.5995 42.7017C39.5995 40.4414 39.0509 37.0587 36.285 37.0587C33.5192 37.0587 32.9655 40.444 32.9655 42.7017C32.9655 44.9594 33.5268 48.3472 36.285 48.3472ZM30.5207 42.7017C30.5207 38.6186 32.7531 36.1612 36.285 36.1612C39.817 36.1612 42.057 38.6161 42.057 42.7017C42.057 46.7873 39.8144 49.2472 36.285 49.2472C32.7556 49.2472 30.5207 46.7898 30.5207 42.7017Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M59.2994 48.8124C58.5587 49.0829 57.6384 49.2498 56.3465 49.2498C51.4847 49.2498 49.3307 46.5496 49.3307 42.3275C49.3307 38.6995 51.0473 36.1637 55.2897 36.1637C57.1732 36.1637 59.6332 36.7073 59.6332 38.6995C59.6332 39.4908 59.0542 39.9788 58.3362 39.9788C57.2845 39.9788 57.067 39.1369 56.8496 38.2394C56.7105 37.6351 56.2049 37.0612 54.9383 37.0612C53.0649 37.0612 51.6238 38.429 51.6238 41.4477C51.6238 44.9113 53.9169 48.2385 57.7522 48.2385C58.2831 48.2385 58.8014 48.1272 59.302 48.0236V48.8149L59.2994 48.8124Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M69.0331 40.3858C69.0331 38.9422 68.5376 37.0587 66.4063 37.0587C64.275 37.0587 63.4584 39.3796 63.4584 40.3858H69.0331ZM71.1315 48.7568C70.4717 48.9995 69.5337 49.2472 67.8448 49.2472C63.5696 49.2472 61.1653 46.9289 61.1653 42.3452C61.1653 38.3683 62.7884 36.1612 66.7729 36.1612C69.2556 36.1612 71.4905 37.5289 71.4905 40.6841V41.2859H63.4584C63.4584 43.5764 64.5885 48.2359 69.2025 48.2359C69.832 48.2359 70.5829 48.1576 71.1315 47.882V48.7568Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M41.2302 52.3443H39.152V58.7205C39.152 61.1021 37.6503 63.562 35.9336 63.562C34.5507 63.562 33.8074 62.5356 33.8074 60.3714V52.2685H29.7294V52.721C30.5258 52.769 31.7444 52.8474 31.7444 54.4175V60.9453C31.7444 63.3775 32.9048 64.8919 35.1322 64.8919C37.9688 64.8919 38.7627 62.6241 39.1065 61.7518H39.1596V64.8186L41.2328 64.8464L41.2252 52.3418L41.2302 52.3443Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M42.4665 48.4736C43.6447 48.4736 44.5877 48.2183 44.5877 46.4333V35.3193C44.5877 33.6987 43.3059 33.6102 42.4665 33.5318V33.0565L46.7696 32.4017V46.4333C46.7696 48.2183 47.7177 48.4736 48.8857 48.4736V48.9388H42.464V48.4736H42.4665Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M51.0574 55.5273C50.8425 54.6627 50.213 53.1988 48.2789 53.1988C47.2702 53.1988 46.0187 53.6261 46.0187 54.8548C46.0187 56.3414 48.3573 57.1024 49.8818 57.9367C51.2723 58.6699 52.4227 59.4031 52.4227 61.365C52.4227 63.6126 50.433 64.8919 47.4067 64.8919C45.8796 64.8919 44.6282 64.6618 43.8925 64.4216L43.7003 61.5167H44.3829C44.6535 62.4344 45.3032 64.0297 47.5963 64.0297C49.3661 64.0297 50.2914 62.8036 50.2914 61.9086C50.2914 60.0579 46.7999 59.1376 45.3032 58.0682C44.2186 57.3097 43.8899 56.6549 43.8899 55.583C43.8899 53.1483 46.1805 52.3393 48.4129 52.3393C49.5253 52.3393 50.9437 52.6047 51.5454 52.7893L51.7375 55.5299H51.0549L51.0574 55.5273Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M60.5863 64.7907C60.1666 64.8438 59.7394 64.8919 59.3096 64.8919C55.32 64.8919 55.1026 63.9236 55.1026 60.9984V53.4618H52.9536V52.6047C55.1026 52.6047 56.4754 51.5302 56.4754 48.6733H57.1656V52.6047H60.3512V53.4618H57.1656V61.7316C57.1656 63.7188 58.0657 64.0297 59.5245 64.0297C59.8683 64.0297 60.2147 63.9514 60.5838 63.8958V64.7882L60.5863 64.7907Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M66.2571 64.0297C68.9067 64.0297 69.4401 60.786 69.4401 58.6168C69.4401 56.4476 68.9067 53.1963 66.2571 53.1963C63.6075 53.1963 63.0842 56.4375 63.0842 58.6168C63.0842 60.7962 63.6101 64.0297 66.2571 64.0297ZM60.7279 58.6168C60.7279 54.693 62.8642 52.3367 66.2571 52.3367C69.65 52.3367 71.799 54.693 71.799 58.6168C71.799 62.5406 69.6576 64.8919 66.2571 64.8919C62.8567 64.8919 60.7279 62.5381 60.7279 58.6168Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M20.5367 49.0804C17.3461 50.0866 14.1201 51.467 14.1201 56.8521C14.1201 59.666 14.8508 61.5395 16.0087 62.7833C17.3385 64.3963 19.4243 65.2711 22.4 65.2711C24.9712 65.2711 27.5121 64.7427 28.3338 64.5733V56.0633H23.0245V56.4678C25.4769 56.8066 25.8764 56.9937 25.8764 58.8873V63.9741C25.1381 64.1334 24.6957 64.184 23.8942 64.189V64.184C23.3026 64.184 22.7565 64.146 22.2534 64.0803C18.1981 63.4381 17.0352 60.0427 16.9517 56.5639C17.0175 52.6351 18.4206 50.7465 22.0764 49.586C25.267 48.5798 28.5259 47.2095 28.5259 41.832C28.5259 34.4142 23.4948 33.5242 18.7518 33.5242H12.0546V34.0172C13.5993 34.0172 14.5373 34.2018 14.5373 36.06V49.5759C15.4222 49.4444 17.0908 49.136 17.0908 47.1994V36.5859C17.0933 34.6442 17.3158 34.5001 18.7518 34.5001C24.1824 34.5001 25.6968 37.2559 25.6968 41.832C25.6968 45.9555 24.281 47.8896 20.5393 49.0804"
                                            fill="white"
                                        />
                                        <path
                                            d="M43 0C19.2524 0 0 19.2524 0 43C0 66.7476 19.2524 86 43 86C66.7476 86 86 66.7476 86 43C86 19.2524 66.7501 0 43 0ZM83.133 43C83.133 65.1649 65.1649 83.133 43 83.133C20.8351 83.133 2.867 65.1649 2.867 43C2.867 20.8351 20.8351 2.867 43 2.867C65.1649 2.867 83.133 20.8351 83.133 43Z"
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
                                        <path d="M32.5527 15.0305H30.8583L30.865 12.5597H32.5062V12.8791L31.3434 12.8726V13.6028H32.1939V13.9157H31.3434V14.7176H32.5527V15.0305Z" fill="white" />
                                        <path
                                            d="M35.3566 12.5597H36.227C37.1307 12.5597 37.7486 13.029 37.7486 13.7918C37.7486 14.5089 37.0376 15.037 36.227 15.037H35.3566V12.5597ZM36.2403 14.7176C36.7254 14.7176 37.2303 14.346 37.2303 13.7918C37.2303 13.1529 36.7453 12.8791 36.2337 12.8791H35.8416V14.7241H36.2403V14.7176Z"
                                            fill="white"
                                        />
                                        <path d="M40.5924 15.037H38.8981L38.9047 12.5662H40.5459L40.5392 12.8791H39.3831V13.6093H40.2336V13.9222H39.3831V14.7241H40.5924V15.037Z" fill="white" />
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
                                <div className="client-logo _royalcanin">
                                    <svg viewBox="0 0 177 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M134.935 35.9838C134.915 36.2543 134.877 36.5249 134.876 36.7955C134.872 39.929 134.88 43.0639 134.87 46.1974C134.866 47.6641 134.254 48.5047 133.018 48.8141C131.585 49.1725 130.271 48.2873 130.078 46.8249C130.033 46.4953 130 46.16 130 45.8275C129.996 40.4918 129.996 35.1576 129.997 29.8219C129.997 28.2257 131.022 26.8194 132.465 26.4279C133.905 26.0379 135.507 26.7086 136.298 28.1062C138.201 31.4728 140.075 34.8553 141.965 38.2291C142.098 38.4666 142.268 38.6811 142.597 38.8682C142.629 38.5775 142.689 38.2882 142.689 37.9974C142.696 34.887 142.69 31.7765 142.694 28.6675C142.694 27.3361 143.673 26.3531 144.979 26.3545C146.305 26.3559 147.37 27.3793 147.37 28.6719C147.372 34.3415 147.374 40.0111 147.37 45.6821C147.37 47.3229 146.664 48.3391 145.298 48.709C143.58 49.1739 142.291 48.6716 141.478 47.2064C139.544 43.7203 137.614 40.2313 135.679 36.7466C135.523 36.4645 135.338 36.1997 135.166 35.9262C135.091 35.9449 135.013 35.965 134.937 35.9838H134.935Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M172.24 38.6984C172.257 38.4263 172.29 38.1529 172.29 37.8808C172.294 34.7963 172.29 31.7103 172.293 28.6258C172.293 27.2368 173.245 26.2322 174.567 26.2163C175.947 26.2005 176.997 27.2397 176.997 28.6431C176.999 34.2393 177.004 39.8355 176.994 45.4316C176.989 47.844 175.234 49.1941 172.909 48.6068C172.125 48.4082 171.575 47.9433 171.181 47.2279C169.19 43.6109 167.181 40.0039 165.175 36.3954C165.055 36.1781 164.909 35.9751 164.775 35.765C164.71 35.7765 164.646 35.788 164.582 35.7981C164.552 36.0557 164.497 36.3119 164.497 36.5696C164.491 39.7505 164.499 42.9315 164.491 46.111C164.486 48.2556 162.622 49.374 160.727 48.3765C160.091 48.0412 159.707 47.5302 159.702 46.7803C159.687 45.0114 159.665 43.2424 159.662 41.4734C159.656 37.5282 159.705 33.5815 159.639 29.6362C159.612 27.9939 160.809 26.6769 162.067 26.2984C163.493 25.8694 165.122 26.5603 165.906 27.945C167.822 31.3303 169.71 34.7301 171.612 38.1226C171.735 38.3414 171.884 38.5458 172.021 38.7559L172.241 38.6955L172.24 38.6984Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M14.969 37.662C14.9919 31.3606 20.0105 26.3876 26.3268 26.4092C32.4899 26.4294 37.4442 31.5477 37.4156 37.8664C37.3884 43.9736 32.2381 49.0516 26.1236 48.9983C19.929 48.9451 14.9461 43.8815 14.9675 37.662H14.969ZM26.2109 43.8354C29.5614 43.8527 32.324 41.115 32.3411 37.7628C32.3583 34.3544 29.6458 31.5621 26.2795 31.5261C22.9562 31.4901 20.1421 34.2565 20.1164 37.5843C20.0906 41.0575 22.7817 43.8167 26.2094 43.834L26.2109 43.8354Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M5.09618 43.9952C5.09618 44.8789 5.13624 45.767 5.08617 46.6479C5.0175 47.8526 4.13194 48.8199 3.03607 48.9811C2.11475 49.1164 0.975963 48.5118 0.651209 47.6281C0.465227 47.1214 0.367944 46.5644 0.327886 46.0232C0.216297 44.4989 0.117584 42.9718 0.084679 41.4432C0.030315 38.9344 0.0560664 36.4228 0.00170235 33.914C-0.0540923 31.3044 1.26638 29.4448 3.26068 28.0472C8.21353 24.5755 13.9132 27.6614 14.6499 33.0878C14.9933 35.611 14.0648 37.7455 12.3137 39.5087C11.8016 40.024 11.7701 40.4213 12.1406 40.9711C13.0462 42.3154 13.9418 43.667 14.8374 45.02C15.3424 45.7828 15.6585 46.5745 15.2794 47.5101C14.7172 48.8933 12.8216 49.4373 11.803 48.3665C10.6413 47.1459 9.62985 45.78 8.58406 44.4529C7.75716 43.405 6.99177 42.3083 6.16343 41.2618C5.99176 41.0459 5.66557 40.9524 5.41092 40.8041C5.32079 41.079 5.16628 41.3496 5.15341 41.6289C5.11764 42.4162 5.14053 43.2064 5.14053 43.9952C5.12623 43.9952 5.11192 43.9952 5.09618 43.9952ZM4.67701 33.9111C4.67701 35.267 5.83296 36.3609 7.28791 36.3839C8.74429 36.4069 9.9961 35.2641 9.99753 33.9125C9.99896 32.5826 8.80581 31.4671 7.36087 31.4484C5.87158 31.4282 4.67701 32.525 4.67701 33.9111Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M111.252 37.2432C111.252 34.3501 111.262 31.457 111.245 28.5639C111.239 27.6312 111.468 26.8396 112.369 26.4308C113.366 25.9788 114.368 25.9918 115.266 26.6798C115.601 26.936 115.886 27.2771 116.138 27.6211C120.414 33.4505 124.66 39.3043 128.975 45.1063C129.676 46.0491 129.226 47.6741 128.454 48.2441C127.387 49.0315 126.036 49.0041 125.255 48.0455C124.398 46.9919 123.631 45.8634 122.787 44.7983C122.605 44.5695 122.265 44.3421 121.992 44.3363C120.302 44.2946 118.611 44.3262 116.922 44.3075C116.382 44.3018 116.15 44.4788 116.166 45.0545C116.18 45.6 116.096 46.1499 116.023 46.694C115.84 48.0858 114.869 48.8515 113.426 48.7637C112.147 48.686 111.263 47.6713 111.256 46.2103C111.242 43.2222 111.252 40.2327 111.252 37.2446V37.2432ZM116.406 35.8038C116.334 35.8283 116.262 35.8528 116.189 35.8772C116.189 36.9668 116.175 38.0579 116.206 39.146C116.21 39.2885 116.441 39.5433 116.567 39.5433C117.309 39.5461 118.052 39.4886 119.042 39.4382C118.076 38.1054 117.242 36.9539 116.408 35.8024L116.406 35.8038Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M62.0539 44.2874C60.0067 44.2874 58.0353 44.2744 56.0639 44.3075C55.8664 44.3104 55.6347 44.5695 55.4873 44.7623C54.6876 45.803 53.9365 46.8811 53.1168 47.9044C52.3643 48.8415 51.5116 48.9911 50.3828 48.4874C49.4129 48.0541 48.7648 46.9473 48.9336 45.9325C48.978 45.6634 49.1224 45.3899 49.2855 45.1654C53.606 39.2496 57.928 33.3325 62.2714 27.4326C63.2356 26.1228 64.3701 25.7816 65.6977 26.2681C66.5504 26.5805 67.0196 27.1908 67.0211 28.1048C67.0297 34.1543 67.0425 40.2039 67.0154 46.2521C67.0068 48.2341 65.2228 49.292 63.4631 48.4413C62.5017 47.9778 62.3229 47.1042 62.2227 46.1815C62.1584 45.5885 62.1169 44.9941 62.0539 44.2859V44.2874ZM62.0368 39.4655V35.8182C61.114 36.8258 60.3286 37.8866 59.5675 38.9661C59.3343 39.2971 59.5517 39.4555 59.8765 39.4612C60.5832 39.4742 61.29 39.4655 62.0368 39.4655Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M90.2588 37.7268C90.3518 31.1461 95.7167 26.1055 102.276 26.5747C105.079 26.7748 107.435 27.9982 109.263 30.1731C109.964 31.0079 109.933 32.0601 109.21 32.9913C108.492 33.9154 107.527 34.2249 106.569 33.7355C105.851 33.3685 105.185 32.9007 104.508 32.4559C102.399 31.0684 99.9328 31.0353 97.8741 32.4502C95.7124 33.9341 94.864 36.0687 95.2374 38.6134C95.6895 41.6865 97.6623 43.5806 100.622 43.9808C101.67 44.1218 102.671 43.88 103.587 43.3935C104.488 42.9142 105.349 42.3543 106.208 41.7987C107.182 41.1683 108.18 41.1985 108.956 41.9239C109.804 42.717 110.007 43.9865 109.412 44.9279C108.203 46.8422 106.342 47.7476 104.256 48.3837C97.9757 50.2995 91.6937 45.8231 90.595 40.2773C90.4291 39.4382 90.3676 38.5775 90.2588 37.7282V37.7268Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M45.42 48.7378C44.141 48.7465 43.0909 47.772 43.0394 46.4752C42.9378 43.9203 42.8792 41.3626 42.7619 38.8092C42.7433 38.4163 42.6031 37.947 42.3527 37.6577C40.4471 35.4584 38.4957 33.2979 36.5686 31.1173C36.2696 30.7791 35.9964 30.412 35.7561 30.0292C35.1795 29.1152 35.2925 27.9191 36.0021 27.1102C36.6345 26.3891 37.5987 26.1861 38.6059 26.7043C39.1838 27.0022 39.7189 27.4383 40.1724 27.9104C41.6617 29.4563 43.0923 31.0583 44.5716 32.6142C45.1725 33.2461 45.2726 33.1957 45.8606 32.5293C47.4844 30.6913 49.111 28.8547 50.7619 27.0396C51.7019 26.0062 53.2083 26.2926 53.9236 26.9576C54.8249 27.7982 54.9494 29.1037 54.0896 30.1904C52.1969 32.5869 50.2684 34.9561 48.3199 37.308C47.8663 37.8564 47.6646 38.3975 47.6775 39.1143C47.7204 41.5037 47.7362 43.8944 47.6889 46.2837C47.6575 47.8843 46.8177 48.7277 45.4171 48.7378H45.42Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M70.2371 37.6304C70.2371 34.6193 70.23 31.6067 70.24 28.5956C70.2457 27.1418 71.2157 26.1544 72.6377 26.117C74.1699 26.0753 75.1342 27.0339 75.1456 28.6762C75.1642 31.4253 75.1514 34.173 75.1514 36.9222C75.1514 38.8337 75.1514 40.7466 75.1514 42.658C75.1514 43.3288 75.4966 43.667 76.1871 43.6728C77.5191 43.6857 78.8524 43.6987 80.1843 43.7131C81.6307 43.7289 82.5835 44.6544 82.6007 46.0549C82.6164 47.3834 81.6564 48.3003 80.19 48.3075C77.4532 48.3219 74.7164 48.3147 71.9796 48.3147C70.7379 48.3147 70.2429 47.8354 70.2414 46.5932C70.2357 43.6051 70.24 40.6185 70.2386 37.6304H70.2371Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M155.922 37.5685C155.922 40.5062 155.923 43.4453 155.922 46.383C155.922 47.7044 154.868 48.7076 153.458 48.7407C151.843 48.7781 150.852 47.9721 150.839 46.4881C150.807 42.6148 150.822 38.7415 150.823 34.8683C150.823 32.8632 150.836 30.8582 150.84 28.8532C150.843 27.5031 151.876 26.5359 153.367 26.497C154.912 26.4567 155.906 27.2886 155.922 28.7467C155.953 31.6873 155.932 34.6279 155.932 37.5685H155.922Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M101.519 19.4384C101.539 20.4633 100.957 20.9037 100.149 20.6403C99.8355 20.5381 99.5379 20.3769 99.2475 20.2171C94.422 17.5817 89.2746 16.6072 83.8181 17.1225C79.9826 17.4838 76.3674 18.5763 72.9239 20.2819C72.8595 20.3136 72.7951 20.3423 72.7293 20.3726C71.9553 20.7367 71.353 20.682 71.0469 20.2214C70.7107 19.7162 70.8652 18.9635 71.5075 18.4554C71.9682 18.0898 72.4875 17.7702 73.024 17.5299C77.5205 15.5248 82.2044 14.4353 87.1529 14.6396C91.6637 14.8268 95.9341 15.9207 99.9313 18.0437C100.329 18.2553 100.724 18.4942 101.063 18.7864C101.296 18.9865 101.429 19.3031 101.518 19.4356L101.519 19.4384Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M86.3589 17.8149C90.8053 17.9127 95.0386 18.8296 98.9313 21.0721C99.8169 21.5831 100.153 22.071 99.8326 22.451C99.3061 23.0742 98.7396 22.6424 98.2246 22.3819C94.5064 20.4978 90.6065 19.2744 86.4161 19.1808C82.5635 19.0944 78.9239 20.0012 75.4804 21.7227C74.9053 22.0091 74.3459 22.3402 73.7479 22.5633C73.3173 22.7245 72.8323 22.7288 72.6134 22.1588C72.4074 21.6248 72.7322 21.3729 73.1442 21.1541C76.7251 19.2542 80.5234 18.1315 84.5778 17.9185C85.1715 17.8868 85.7652 17.848 86.3604 17.8134L86.3589 17.8149Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M88.8883 3.02266C88.8911 4.69231 87.5821 6.03522 85.9297 6.05825C84.2945 6.08128 82.9397 4.73261 82.9283 3.07016C82.9168 1.36453 84.2502 -0.00716856 85.9169 2.81896e-05C87.5578 0.00722494 88.8854 1.35733 88.8883 3.02266Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M104.604 10.4137C102.931 10.4195 101.609 9.12694 101.578 7.45586C101.547 5.77901 102.901 4.42171 104.601 4.42747C106.255 4.43178 107.598 5.77182 107.598 7.41699C107.598 9.06649 106.256 10.4094 104.604 10.4137Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M77.9683 14.31C76.3145 14.3057 74.9625 12.9642 74.9625 11.3248C74.9625 9.65374 76.3373 8.30219 78.0269 8.31659C79.6664 8.32954 81.0184 9.70988 80.9969 11.3479C80.9755 12.9959 79.6278 14.3144 77.9683 14.31Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M79.3345 4.15543C79.3374 5.8625 78.0584 7.16079 76.3688 7.16511C74.695 7.16943 73.3674 5.8481 73.3659 4.17414C73.3659 2.50881 74.7007 1.15295 76.3488 1.14575C78.0083 1.13855 79.3302 2.47139 79.3345 4.15543Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M93.9813 8.00857C95.6451 8.00569 96.9871 9.31837 97.0086 10.9679C97.03 12.6318 95.6509 14.0049 93.9656 13.9977C92.3218 13.9905 90.967 12.6274 90.9741 10.988C90.9813 9.33709 92.3204 8.01001 93.9813 8.00713V8.00857Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M67.3687 10.4137C65.6935 10.418 64.3658 9.10391 64.3601 7.43571C64.3544 5.75455 65.6634 4.43178 67.3344 4.42747C69.0383 4.42315 70.3187 5.69697 70.3258 7.4026C70.3316 9.10967 69.0554 10.4094 67.3687 10.4137Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M70.5719 16.9138C68.9109 16.9297 67.5633 15.6285 67.5218 13.9689C67.4817 12.3511 68.8437 10.9348 70.4689 10.906C72.1442 10.8757 73.5433 12.2345 73.5548 13.9013C73.5662 15.5421 72.2243 16.898 70.5705 16.9138H70.5719Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M104.645 13.9157C104.645 15.6227 103.369 16.9109 101.672 16.9124C99.9957 16.9138 98.6724 15.5954 98.6709 13.9214C98.6695 12.2618 100.014 10.9074 101.665 10.9045C103.333 10.9031 104.644 12.2259 104.645 13.9142V13.9157Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M92.4677 4.15399C92.472 2.47427 93.8025 1.13711 95.4592 1.14575C97.1015 1.15439 98.4549 2.52321 98.4535 4.17414C98.4506 5.83659 97.1073 7.16943 95.4391 7.16511C93.7524 7.16079 92.4634 5.85386 92.4691 4.15399H92.4677Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M88.8883 10.0337C88.884 11.7192 87.5921 13.0103 85.9083 13.0103C84.1844 13.0103 82.914 11.712 82.9283 9.96608C82.9426 8.2878 84.2487 7.0111 85.9383 7.01973C87.605 7.02981 88.8911 8.34537 88.8868 10.0323L88.8883 10.0337Z"
                                            fill="white"
                                        />
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
                                        <path d="M79.8987 2.27328L81.5792 0.553955L83.2597 2.27328L81.5792 3.97524L79.8987 2.27328ZM82.7281 5.26039V14.4152H80.4303V5.26039H82.7281Z" fill="white" />
                                        <path d="M87.0543 14.4152H84.7565V1.45703L87.0543 1.04023V14.4152Z" fill="white" />
                                        <path d="M88.5486 2.27328L90.2291 0.553955L91.9097 2.27328L90.2291 3.97524L88.5486 2.27328ZM91.3781 5.26039V14.4152H89.0802V5.26039H91.3781Z" fill="white" />
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
                                <div className="client-logo _solgar">
                                    <svg viewBox="0 0 121 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 67.4489C0.0219133 67.4306 0.0547832 67.4161 0.0657398 67.3924C0.524093 66.4516 1.38419 66.189 2.32098 66.0395C3.47325 65.8554 4.57987 66.0887 5.74493 66.3713C5.69015 66.5664 5.64084 66.7378 5.58058 66.9511C5.1131 66.8673 4.67118 66.7925 4.23109 66.7068C3.43308 66.5518 2.6369 66.5336 1.84802 66.7579C1.61245 66.8253 1.37871 66.9201 1.16323 67.0387C0.894792 67.1863 0.703051 67.4142 0.730443 67.7424C0.757834 68.0506 0.96601 68.2438 1.24358 68.3386C1.51749 68.4334 1.80054 68.5301 2.08541 68.5556C3.2103 68.6541 4.33518 68.6468 5.42354 68.3095C5.79424 68.1946 6.15398 68.0141 6.47903 67.8008C7.21677 67.3176 7.59295 66.0286 6.50642 65.2464C6.18868 65.0185 5.83624 64.838 5.49293 64.6465C5.07292 64.4132 4.62918 64.2162 4.22561 63.961C3.07882 63.2353 2.78481 62.2325 3.32534 60.9854C3.56821 60.4275 3.93343 59.9571 4.38266 59.5542C5.33771 58.6936 6.44433 58.1284 7.72261 57.9552C8.07322 57.9078 8.45853 57.9297 8.80001 58.0245C9.48845 58.2177 9.80254 58.8741 9.55236 59.5469C9.45375 59.8131 9.30584 60.0866 9.11045 60.289C8.00748 61.4358 6.63972 62.0612 5.06927 62.2599C5.03092 62.2654 4.9871 62.2417 4.95058 62.2325C4.87753 61.7567 4.90127 61.7056 5.30667 61.6035C6.11563 61.3975 6.90086 61.1222 7.61852 60.6974C7.96548 60.4913 8.28322 60.227 8.58453 59.9571C8.80366 59.7602 8.93697 59.494 8.94427 59.1841C8.95157 58.8942 8.84931 58.6918 8.56992 58.6152C8.338 58.5514 8.07322 58.5167 7.84313 58.5623C6.47172 58.8358 5.30849 59.4995 4.36805 60.5314C4.17448 60.7429 4.01743 61 3.89691 61.2626C3.60839 61.8952 3.73987 62.5881 4.24205 63.0712C4.45935 63.2809 4.71866 63.4559 4.98162 63.6073C5.32127 63.8042 5.6865 63.9573 6.03528 64.1378C6.30737 64.2782 6.57764 64.4223 6.83694 64.5845C8.3307 65.5199 7.99287 67.3358 7.12182 68.1198C6.75842 68.448 6.34572 68.6923 5.88737 68.8473C4.46118 69.3287 3.0076 69.4271 1.5321 69.1135C0.947749 68.9895 0.416352 68.7653 0.111393 68.1964C0.0967837 68.1691 0.0383482 68.1636 0 68.1472C0 67.9138 0 67.6804 0 67.4471V67.4489Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M32.5577 25.4483H27.4665C28.1933 22.8702 29.2122 20.4544 30.5033 18.1553C33.5328 12.7512 37.6872 8.41182 42.9738 5.17371C48.2713 1.92831 54.0455 0.194396 60.2524 0.0157168C78.8075 -0.518498 91.9646 12.6582 95.2844 25.4374H90.2645C87.5874 18.035 82.8523 12.3446 75.9204 8.53944C70.831 5.74621 65.3527 4.59392 59.5676 4.91116C56.549 5.07526 53.6181 5.70063 50.784 6.7563C47.9627 7.80649 45.3532 9.24322 42.9592 11.0665C40.5505 12.9007 38.4596 15.043 36.6847 17.4935C34.9206 19.9312 33.5547 22.5749 32.5577 25.4483Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M27.545 45.3018H32.585C35.2256 52.5073 39.8183 58.0719 46.4963 61.8606C51.3264 64.5991 56.549 65.8718 62.0986 65.7423C75.5588 65.4269 86.3201 56.5732 90.2042 45.3164H95.2479C91.8166 58.0409 79.1782 70.3643 61.9068 70.5995C44.2192 70.8401 31.1132 58.4219 27.545 45.3018Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M41.5531 25.4319C41.4873 25.2551 41.6188 25.1329 41.6864 25.0016C42.9245 22.6405 44.5351 20.5656 46.5201 18.7843C49.6664 15.9601 53.3223 14.1387 57.4877 13.4057C67.1806 11.6991 76.6161 16.3667 81.123 24.9743C81.1887 25.1001 81.2471 25.2314 81.3457 25.4319H41.5531Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M81.2654 45.2781C80.9823 46.6492 77.9948 50.4908 75.725 52.3724C71.8591 55.5795 67.4107 57.3371 62.3908 57.5468C51.5291 57.9989 44.0968 50.901 41.522 45.2762H81.2636L81.2654 45.2781Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M101.219 37.7571C101.285 37.8574 101.325 37.9322 101.378 37.996C101.95 38.6779 102.523 39.358 103.097 40.038C103.422 40.4246 103.801 40.7327 104.291 40.8931C104.373 40.9205 104.453 40.9606 104.526 41.008C104.957 41.2851 104.95 41.8795 104.497 42.1165C104.324 42.2077 104.108 42.2515 103.911 42.2515C102.423 42.2624 100.933 42.2606 99.4443 42.2551C98.9768 42.2551 98.712 42.0673 98.6463 41.7282C98.5696 41.338 98.7558 41.0007 99.1539 40.8129C99.2836 40.7509 99.4187 40.6981 99.6105 40.6142C99.5118 40.4501 99.4461 40.2933 99.3384 40.1711C98.8837 39.6588 98.4144 39.1592 97.9542 38.6524C97.8446 38.532 97.7205 38.5065 97.5652 38.5047C97.0265 38.4992 96.486 38.4791 95.9473 38.4609C95.4579 38.4445 95.31 38.5758 95.2972 39.0589C95.2899 39.3507 95.2972 39.6424 95.3008 39.9341C95.3045 40.2751 95.4597 40.5157 95.7775 40.6488C95.9254 40.7108 96.0733 40.7746 96.2176 40.8421C96.5024 40.9788 96.6175 41.2195 96.5937 41.5203C96.57 41.8157 96.4403 42.06 96.139 42.153C95.9601 42.2077 95.7702 42.2478 95.5839 42.2496C94.2709 42.2569 92.9561 42.2569 91.6432 42.2496C91.4861 42.2496 91.3236 42.2205 91.1702 42.1804C90.8561 42.0983 90.6735 41.8923 90.6479 41.5586C90.6187 41.1794 90.7173 40.9952 91.0606 40.822C91.1392 40.7819 91.2177 40.7418 91.3017 40.7181C91.7673 40.5832 91.9481 40.2586 91.939 39.7974C91.9335 39.564 91.9426 39.3306 91.9426 39.0972C91.9426 36.6632 91.9426 34.2273 91.9426 31.7933C91.9426 31.6766 91.9335 31.5599 91.9426 31.4432C91.9956 30.8215 91.8039 30.3839 91.1465 30.1779C90.6991 30.0393 90.5986 29.7986 90.6516 29.3756C90.6972 29.0237 90.8999 28.8323 91.3345 28.7557C91.5208 28.7229 91.7107 28.7065 91.8988 28.7065C93.4601 28.7028 95.0233 28.6901 96.5846 28.7083C97.9286 28.7247 99.269 28.8104 100.545 29.2972C101.716 29.7439 102.711 30.4331 103.46 31.4505C104.114 32.3384 104.431 33.3303 104.347 34.4425C104.274 35.396 103.873 36.1727 103.137 36.7799C102.693 37.1463 102.183 37.3961 101.648 37.5967C101.517 37.6459 101.384 37.6933 101.219 37.7535V37.7571ZM95.2935 33.5436C95.2935 34.0979 95.2935 34.6503 95.2935 35.2046C95.2935 35.4088 95.2935 35.613 95.3155 35.8154C95.3922 36.479 95.6862 36.7817 96.3563 36.8291C96.8056 36.8601 97.2621 36.8637 97.7077 36.8109C99.0279 36.6559 99.9209 35.8573 100.184 34.6303C100.335 33.9192 100.315 33.2081 100.104 32.5116C99.8278 31.6018 99.2416 30.971 98.334 30.6592C97.631 30.4185 96.9078 30.3675 96.1774 30.4969C95.5182 30.6136 95.3045 30.8689 95.2954 31.5307C95.2862 32.2017 95.2935 32.8708 95.2935 33.5418V33.5436Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M48.1234 36.0159C48.107 37.4253 47.7728 38.7308 46.9255 39.8776C46.0562 41.0518 44.8711 41.7665 43.4832 42.1402C41.48 42.6799 39.464 42.6453 37.4827 42.0454C34.8914 41.2614 33.4159 39.4072 33.2297 36.6705C33.0087 33.4214 34.7727 30.2781 37.9921 29.0019C42.3967 27.2534 47.3747 30.156 48.0156 34.8436C48.0686 35.2319 48.0887 35.6257 48.1252 36.0159H48.1234ZM37.2544 35.8737C37.3037 36.3514 37.3256 36.8327 37.4078 37.3031C37.5794 38.2677 37.9392 39.1501 38.6788 39.8338C39.8712 40.9369 41.7831 40.8749 42.9044 39.6989C43.3463 39.2358 43.6184 38.6761 43.801 38.0689C44.1096 37.0461 44.1224 35.9995 44.0311 34.9511C43.9471 33.9739 43.7225 33.0258 43.2696 32.1452C42.9865 31.5945 42.6323 31.1004 42.1319 30.7248C41.1623 29.9937 39.9917 30.0484 39.0969 30.8689C38.6715 31.259 38.3555 31.7294 38.1017 32.2418C37.5356 33.385 37.2818 34.5993 37.2526 35.8737H37.2544Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M26.6027 42.2642C25.4523 42.2879 24.2562 42.0947 23.0692 41.8576C22.6346 41.7701 22.3333 41.8431 22.1324 42.2533C22.0831 42.3554 21.9991 42.4447 21.9151 42.525C21.6485 42.7839 21.2851 42.8057 21.0094 42.5578C20.8487 42.4137 20.7117 42.2351 20.5967 42.0527C20.0507 41.1903 19.5101 40.3243 18.9824 39.4528C18.8564 39.2431 18.7541 39.0115 18.6866 38.7763C18.6153 38.532 18.6336 38.2768 18.8582 38.0981C19.07 37.9303 19.3093 37.965 19.5193 38.0799C19.7859 38.2257 20.0397 38.4007 20.2844 38.5831C21.3654 39.3871 22.5542 39.9523 23.8855 40.1894C24.983 40.3845 26.0878 40.4428 27.1926 40.2404C27.6418 40.1584 28.0654 40.0016 28.4307 39.7208C29.2031 39.1264 29.2634 38.1783 28.5238 37.5456C28.186 37.2576 27.786 37.0078 27.3752 36.8437C26.3343 36.4262 25.2715 36.0633 24.2178 35.6841C23.4783 35.4179 22.7314 35.1699 21.9936 34.8946C21.3983 34.6722 20.8815 34.3203 20.4341 33.8681C19.2545 32.6757 19.2399 30.8251 20.4067 29.6163C21.0477 28.9508 21.8548 28.5971 22.7478 28.4294C23.7503 28.2397 24.7529 28.2999 25.7518 28.4713C25.8668 28.4913 25.9837 28.5041 26.0969 28.526C26.4822 28.6026 26.7671 28.5114 26.9606 28.1249C27.1378 27.7712 27.4245 27.7037 27.7678 27.8951C27.9559 27.9991 28.1367 28.1395 28.2773 28.2999C28.9621 29.0766 29.6341 29.8643 30.3024 30.6556C30.4211 30.7978 30.5197 30.9692 30.5818 31.1442C30.7535 31.6164 30.4175 32.0175 29.9262 31.91C29.7053 31.8625 29.4934 31.7404 29.2944 31.6237C28.8561 31.363 28.438 31.0676 27.9942 30.816C27.0885 30.3018 26.1225 29.9919 25.0688 30.0958C24.7255 30.1286 24.3803 30.2198 24.0553 30.3383C23.7266 30.4568 23.491 30.6957 23.4673 31.0822C23.4454 31.4724 23.6627 31.7203 23.9804 31.8753C24.3055 32.0339 24.6451 32.1743 24.9921 32.2782C26.0111 32.5827 27.041 32.8526 28.06 33.1552C28.9712 33.4269 29.8514 33.777 30.653 34.2966C31.4711 34.8272 32.1176 35.5036 32.417 36.4517C33.0708 38.5302 32.4061 40.6634 30.1326 41.6662C29.0278 42.153 27.8646 42.2952 26.6027 42.2661V42.2642Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M70.4329 42.2989C69.193 42.2533 67.9531 42.2351 66.715 42.153C65.455 42.0691 64.2333 41.7884 63.1084 41.1867C61.2549 40.1967 60.0515 38.6979 59.7685 36.5975C59.385 33.7533 60.393 31.4724 62.7815 29.8478C64.0032 29.0183 65.3856 28.6226 66.8519 28.5169C67.7011 28.4549 68.5429 28.5278 69.3829 28.6409C69.5272 28.6609 69.6733 28.6682 69.8175 28.6828C70.1006 28.712 70.3325 28.6208 70.5188 28.4057C70.5955 28.3181 70.674 28.2288 70.7671 28.1613C71.0374 27.9626 71.3332 28.0191 71.5176 28.2999C71.5816 28.3965 71.6309 28.5041 71.6747 28.6117C72.0636 29.5689 72.4526 30.5279 72.8343 31.4888C72.9146 31.6912 72.973 31.9045 73.0205 32.116C73.0717 32.3475 73.0023 32.5572 72.7996 32.6903C72.6023 32.8179 72.3997 32.7578 72.2298 32.6265C72.0454 32.4843 71.8847 32.3129 71.7039 32.1652C71.1871 31.7404 70.6959 31.2718 70.1371 30.9108C69.0816 30.2271 67.9129 30.0429 66.6985 30.4039C65.3016 30.8196 64.4305 31.8115 63.9776 33.1534C63.4718 34.6558 63.5193 36.1764 64.1183 37.6459C64.7848 39.2796 66.0667 40.1055 67.8015 40.2349C68.2325 40.2659 68.678 40.2313 69.1035 40.1511C69.5838 40.0599 69.7956 39.7682 69.8084 39.2814C69.8248 38.6688 69.812 38.0562 69.812 37.4435C69.812 37.0862 69.6532 36.8309 69.319 36.6924C69.2113 36.6468 69.1017 36.6048 68.9976 36.552C68.647 36.3769 68.5429 36.1946 68.5794 35.8208C68.6123 35.4872 68.7949 35.2793 69.1565 35.1991C69.3117 35.1645 69.4761 35.159 69.6349 35.159C70.8182 35.1553 71.9997 35.1553 73.1831 35.159C73.3565 35.159 73.5355 35.1718 73.7035 35.21C74.0212 35.2812 74.2038 35.489 74.2458 35.8172C74.286 36.1381 74.1637 36.3623 73.8532 36.5264C73.7765 36.5666 73.698 36.6085 73.614 36.634C73.1447 36.7744 72.9895 37.1172 72.9913 37.5693C72.9931 38.2986 72.9986 39.028 72.9913 39.7573C72.9858 40.2386 73.1776 40.5686 73.6487 40.7199C73.7455 40.7509 73.835 40.802 73.9281 40.8457C74.1929 40.9752 74.3079 41.1867 74.297 41.4821C74.286 41.7884 74.1673 42.0345 73.8788 42.1384C73.6651 42.2168 73.4259 42.2533 73.1977 42.2569C72.2773 42.2697 71.3588 42.2624 70.4384 42.2624C70.4384 42.2752 70.4384 42.2898 70.4384 42.3025L70.4329 42.2989Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M87.1582 42.2588C86.5008 42.2588 85.8453 42.2588 85.1879 42.2588C85.0272 42.2588 84.8647 42.2588 84.7076 42.2369C84.3661 42.1877 84.1853 42.0272 84.1196 41.7355C84.0484 41.4201 84.1671 41.1101 84.4392 40.9387C84.5378 40.8767 84.6492 40.8366 84.7533 40.7874C85.0491 40.6488 85.1093 40.5686 85.0655 40.2459C84.9961 39.7463 84.8062 39.2923 84.4647 38.9113C84.2365 38.656 83.9333 38.5284 83.6083 38.5266C82.5583 38.5193 81.5083 38.532 80.4601 38.5594C79.8575 38.5758 79.4557 38.9131 79.2238 39.4546C79.1161 39.708 79.0193 39.9688 78.9517 40.2368C78.8768 40.5413 78.9426 40.6488 79.2183 40.8056C79.3571 40.884 79.5087 40.9478 79.6383 41.039C79.8976 41.2232 79.9798 41.4729 79.9068 41.7665C79.8337 42.0619 79.6219 42.1949 79.3443 42.2442C79.2457 42.2624 79.1398 42.2588 79.0394 42.2606C78.0021 42.2606 76.9667 42.2606 75.9295 42.2606C75.8565 42.2606 75.7834 42.2606 75.7104 42.2551C75.3032 42.2223 75.0712 42.0272 75.0073 41.6626C74.9416 41.2924 75.0968 40.9096 75.462 40.8184C76.3075 40.6069 76.6746 39.9688 76.9941 39.2632C78.4915 35.9448 79.9981 32.6283 81.4754 29.3009C81.6726 28.8578 81.921 28.6718 82.3994 28.7028C82.8943 28.7357 83.3928 28.7247 83.8877 28.7065C84.2803 28.6919 84.5067 28.8469 84.64 29.2207C85.1769 30.7303 85.7321 32.2327 86.2781 33.7387C86.9629 35.6276 87.6422 37.5183 88.327 39.4072C88.4055 39.626 88.495 39.8429 88.5972 40.0508C88.7561 40.3753 89.0063 40.6142 89.3368 40.7673C89.4683 40.8275 89.6071 40.8804 89.7331 40.9515C90.0435 41.1247 90.1896 41.4748 90.1038 41.8066C90.0271 42.0983 89.8317 42.246 89.4354 42.2533C88.6757 42.2661 87.9179 42.2569 87.1582 42.2569C87.1582 42.2569 87.1582 42.2606 87.1582 42.2624V42.2588ZM82.3264 32.3348L82.1876 32.3275C82.0981 32.4843 81.9904 32.632 81.9228 32.7979C81.5137 33.7934 81.1138 34.7925 80.7139 35.7917C80.6646 35.912 80.619 36.0378 80.5934 36.1636C80.5185 36.5356 80.6135 36.6832 80.9878 36.7416C81.7457 36.8601 82.5017 36.82 83.2467 36.6522C83.7526 36.5374 83.8256 36.3952 83.6576 35.912C83.2851 34.8399 82.9034 33.7715 82.5218 32.7049C82.4743 32.5754 82.3939 32.4569 82.3282 32.3348H82.3264Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M52.0331 42.2588C50.8936 42.2588 49.7559 42.2642 48.6183 42.2533C48.3736 42.2515 48.1234 42.2168 47.8878 42.153C47.5646 42.0637 47.4349 41.7993 47.4222 41.4839C47.4112 41.1976 47.539 40.977 47.8075 40.853C47.9663 40.7801 48.1307 40.7181 48.2896 40.6488C48.5525 40.5358 48.715 40.348 48.7315 40.0526C48.7406 39.8776 48.7589 39.7044 48.7589 39.5293C48.7589 36.8473 48.7589 34.1635 48.7589 31.4815C48.7589 31.3794 48.7552 31.2773 48.757 31.1752C48.768 30.7084 48.5635 30.3966 48.1051 30.2617C47.9937 30.2289 47.8896 30.1724 47.7856 30.1213C47.5189 29.9901 47.4057 29.7622 47.4222 29.4777C47.4404 29.1805 47.5646 28.9289 47.8659 28.8378C48.0996 28.7667 48.3498 28.7174 48.5945 28.7156C49.8344 28.7028 51.0762 28.7065 52.3161 28.7138C52.5334 28.7138 52.7544 28.7448 52.9644 28.7977C53.2986 28.8833 53.483 29.1258 53.5068 29.4595C53.5305 29.7895 53.3826 30.0192 53.0867 30.1578C52.9808 30.207 52.8749 30.2544 52.7635 30.2927C52.3472 30.4349 52.1737 30.7303 52.1755 31.1606C52.181 32.0941 52.1755 33.0276 52.1755 33.9593C52.1755 35.7242 52.1755 37.4873 52.1755 39.2522C52.1755 40.1438 52.3545 40.3243 53.2584 40.3152C54.0454 40.3079 54.8343 40.3079 55.6196 40.2623C56.35 40.2185 57.0001 39.9159 57.6027 39.5148C57.9424 39.2887 58.2656 39.0352 58.6071 38.8146C58.7878 38.6979 58.9869 38.5885 59.1932 38.532C59.5219 38.4427 59.8287 38.6633 59.836 39.0006C59.8397 39.2085 59.7959 39.4473 59.6918 39.6223C59.1111 40.5996 58.5066 41.5623 57.9058 42.5286C57.8364 42.6398 57.7543 42.7456 57.6611 42.8349C57.4018 43.0811 57.1279 43.1266 56.8887 42.8696C56.3646 42.3062 55.7236 42.2314 55.0115 42.2533C54.0199 42.2843 53.0265 42.2606 52.0331 42.2606V42.2588Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M29.8514 66.5792C30.0614 66.9894 30.065 67.0933 29.8021 67.3158C29.1118 67.901 28.4197 68.4845 27.5943 68.8783C27.0757 69.1263 26.5352 69.2904 25.9526 69.2867C25.1674 69.2812 24.7711 68.9731 24.5849 68.2092C24.541 68.0287 24.5173 67.8427 24.4771 67.6148C24.3767 67.6768 24.2945 67.7224 24.2197 67.7771C23.7942 68.0852 23.3888 68.4225 22.945 68.6978C22.3022 69.0971 21.5882 69.3013 20.8231 69.2867C20.2442 69.2758 19.8863 69.0205 19.7329 68.4626C19.6489 68.1563 19.6197 67.8354 19.5576 67.4762C19.4626 67.5382 19.3732 67.5929 19.2855 67.6513C18.5952 68.1125 17.9123 68.5848 17.2129 69.0315C17.0211 69.1536 16.7874 69.2357 16.5628 69.274C16.1209 69.3487 15.8926 69.0807 16.0204 68.6504C16.0862 68.428 16.1793 68.2128 16.2779 68.0013C16.7399 67.0277 17.2092 66.0577 17.6694 65.0823C17.737 64.9364 17.7662 64.7742 17.8137 64.6192C17.7863 64.6028 17.7589 64.5864 17.7315 64.57C17.6055 64.6629 17.4777 64.7523 17.3535 64.8489C15.9182 65.9611 14.6764 67.2793 13.4255 68.5866C13.2648 68.7543 13.1005 68.9221 12.9288 69.0789C12.8448 69.1554 12.7426 69.2265 12.6367 69.2648C12.412 69.3414 12.2221 69.1846 12.2568 68.9494C12.2806 68.7926 12.3335 68.6376 12.3956 68.4918C12.58 68.0487 12.7773 67.6093 12.9672 67.1681C13.0165 67.0514 13.0548 66.9311 13.0384 66.767C12.8923 66.9001 12.7462 67.0295 12.602 67.1663C11.793 67.9357 10.8726 68.5501 9.89567 69.0825C9.72037 69.1773 9.51949 69.2575 9.3241 69.2812C8.93149 69.3287 8.7434 69.1135 8.84018 68.727C8.9187 68.4189 9.04105 68.1198 9.16523 67.8263C9.32775 67.4416 9.51036 67.066 9.63636 66.6539C9.32775 66.9256 9.01914 67.1973 8.7087 67.4726C8.49139 67.2957 8.4567 67.1316 8.58818 66.9475C8.68131 66.818 8.79088 66.6995 8.89679 66.5792C8.95523 66.5135 9.01549 66.4497 9.08305 66.3932C9.98515 65.6475 10.7448 64.7979 11.037 63.6127C11.205 63.6018 11.3328 63.5872 11.4625 63.5854C11.5775 63.5854 11.6926 63.5982 11.866 63.6091C11.1612 65.25 10.3869 66.8217 9.69663 68.4298C9.72219 68.4553 9.74958 68.4808 9.77515 68.5082C9.90663 68.4389 10.0472 68.3824 10.1696 68.3003C11.3547 67.52 12.4723 66.6558 13.4602 65.6329C13.7488 65.3357 13.9752 65.0057 14.1213 64.6137C14.2126 64.3694 14.3203 64.1269 14.4536 63.9026C14.6527 63.5745 14.8225 63.5362 15.2736 63.6911C15.0909 64.3639 14.7221 64.9565 14.4445 65.5873C14.1706 66.2091 13.8729 66.8198 13.6374 67.4744C13.7268 67.3905 13.8145 67.3085 13.904 67.2246C14.9284 66.2692 15.9474 65.3102 16.9791 64.3639C17.2257 64.1397 17.5105 63.9555 17.7881 63.7659C17.9305 63.6674 18.0894 63.589 18.2501 63.5198C18.4473 63.4341 18.6519 63.414 18.8199 63.5836C18.986 63.7513 18.9002 63.9373 18.8217 64.1105C18.241 65.3977 17.6566 66.6849 17.0759 67.974C17.0084 68.1235 16.9627 68.2839 16.8769 68.5228C17.065 68.4681 17.1709 68.4644 17.2403 68.4116C18.0109 67.8372 18.7779 67.2574 19.5393 66.6703C19.6233 66.6047 19.6653 66.4789 19.711 66.375C20.3191 65.0112 21.3728 64.1123 22.7186 63.5325C23.1203 63.3593 23.5458 63.3593 23.9585 63.5161C24.3931 63.6802 24.5684 64.0029 24.4388 64.4496C24.342 64.7833 24.2069 65.1078 24.0772 65.4305C24.0352 65.5363 23.9622 65.6347 23.8818 65.7186C23.765 65.8408 23.5203 65.8535 23.3979 65.7551C23.2628 65.6475 23.3176 65.5181 23.3742 65.3977C23.4892 65.1461 23.6207 64.9018 23.7284 64.6465C23.9092 64.2181 23.6956 63.9191 23.2299 63.9628C23.0747 63.9774 22.9158 64.0357 22.7752 64.1068C21.8421 64.5791 21.0915 65.25 20.5547 66.1525C20.2351 66.6886 20.1401 67.2665 20.2314 67.8792C20.3045 68.3678 20.5802 68.6522 21.0769 68.6577C21.3892 68.6613 21.7215 68.6048 22.0119 68.4936C22.9249 68.1417 23.6609 67.5127 24.3877 66.88C24.4662 66.8126 24.4881 66.6795 24.5337 66.5755C24.6597 66.2984 24.751 65.9994 24.9136 65.746C25.5089 64.8143 26.3215 64.1196 27.3204 63.6437C27.6801 63.4724 28.06 63.3775 28.4654 63.4231C29.0753 63.4924 29.4003 63.9045 29.3145 64.5134C29.2104 65.2628 28.8214 65.8444 28.2261 66.2929C27.5267 66.8199 26.7232 67.0514 25.8595 67.0897C25.6422 67.0988 25.4249 67.0897 25.1911 67.0897C25.0852 67.4799 25.1291 67.8318 25.2733 68.1709C25.4139 68.4991 25.6878 68.6486 26.0348 68.6705C26.4384 68.6978 26.8146 68.5902 27.1834 68.4389C27.8956 68.149 28.5037 67.7005 29.0917 67.2173C29.3382 67.0149 29.5793 66.8053 29.8495 66.5774L29.8514 66.5792ZM25.2843 66.4388C25.3811 66.4789 25.4194 66.5026 25.4596 66.5117C25.5308 66.5281 25.6038 66.5445 25.6751 66.5445C26.6995 66.5227 27.5961 66.1945 28.2444 65.374C28.427 65.1443 28.5475 64.8416 28.6224 64.5554C28.721 64.1725 28.4927 63.9227 28.0947 63.9683C27.8573 63.9956 27.6126 64.0868 27.4007 64.2035C26.6758 64.6028 26.0786 65.1534 25.6075 65.8335C25.4851 66.0103 25.403 66.2127 25.2824 66.4388H25.2843Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M102.704 64.1871C103.084 64.5116 103.106 64.559 102.855 64.8744C102.244 65.6475 101.48 66.1799 100.465 66.2419C99.5867 66.2948 98.9458 65.7241 98.9001 64.8416C98.8819 64.4824 98.9038 64.1068 98.9914 63.7604C99.3658 62.2745 100.222 61.1349 101.564 60.3838C102.2 60.0282 102.89 59.8623 103.628 59.9899C104.525 60.1431 105.036 60.7046 105.113 61.6181C105.165 62.2562 105.056 62.8743 104.802 63.4523C104.526 64.0759 104.24 64.7049 103.876 65.2792C102.509 67.4325 100.766 69.2393 98.681 70.7143C98.5513 70.8073 98.418 70.9094 98.2701 70.9586C98.1423 71.0024 97.9816 71.0152 97.8537 70.9787C97.6565 70.924 97.6255 70.7581 97.7752 70.6159C97.9122 70.4864 98.0729 70.3807 98.2244 70.2676C100.155 68.8181 101.8 67.0988 103.133 65.0859C103.65 64.3056 104.094 63.4815 104.278 62.5534C104.342 62.2289 104.351 61.8861 104.327 61.5561C104.294 61.1003 104.021 60.8232 103.58 60.6955C103.213 60.588 102.857 60.6445 102.503 60.7448C102.392 60.7758 102.28 60.8195 102.18 60.8742C100.755 61.6509 99.8826 62.8324 99.6653 64.4423C99.5283 65.4579 100.206 65.9137 101.146 65.4834C101.632 65.261 102.017 64.9036 102.382 64.5244C102.49 64.4113 102.598 64.2983 102.704 64.1852V64.1871Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M110.147 66.6667C109.784 67.5145 109.422 68.3532 109.061 69.1937C109.004 69.3268 108.951 69.4654 108.88 69.5894C108.83 69.6751 108.761 69.779 108.677 69.8045C108.566 69.841 108.412 69.8483 108.314 69.7954C108.241 69.7571 108.182 69.5948 108.199 69.5037C108.239 69.2922 108.312 69.0825 108.401 68.8838C108.65 68.3259 108.914 67.7734 109.168 67.2191C109.258 67.0241 109.336 66.8217 109.439 66.5774C109.135 66.5336 108.88 66.488 108.622 66.4607C108.158 66.4096 107.693 66.3786 107.231 66.3185C106.847 66.2674 106.55 66.3732 106.321 66.694C106.23 66.8235 106.11 66.9365 105.991 67.0423C105.697 67.3012 105.321 67.3559 105.169 67.1717C105.03 67.0022 105.102 66.6503 105.377 66.3932C105.587 66.1963 105.832 66.0286 106.08 65.8809C106.312 65.7441 106.497 65.5782 106.654 65.3594C107.592 64.0467 108.257 62.5899 108.878 61.1131C109.053 60.6974 109.225 60.2798 109.398 59.8641C109.462 59.711 109.543 59.5815 109.729 59.5523C110.076 59.4958 110.237 59.6636 110.116 59.9972C110.008 60.2981 109.88 60.5916 109.744 60.8815C109.013 62.4367 108.237 63.9701 107.34 65.4378C107.297 65.5108 107.26 65.5892 107.202 65.7004C107.99 65.8316 108.746 65.972 109.521 65.9702C109.687 65.9702 109.796 65.9046 109.87 65.7587C109.935 65.6293 110.006 65.5016 110.072 65.3722C110.755 64.054 111.44 62.7358 112.117 61.4139C112.203 61.2462 112.307 61.1131 112.49 61.0821C112.579 61.0675 112.711 61.0839 112.766 61.1422C112.817 61.1969 112.824 61.3318 112.799 61.4139C112.753 61.5652 112.671 61.7074 112.598 61.8497C111.968 63.0804 111.334 64.3092 110.704 65.5417C110.635 65.6785 110.576 65.8207 110.505 65.9757C111.104 66.2127 111.707 65.9502 112.262 66.1361C112.169 66.6102 112.017 66.7542 111.601 66.7433C111.296 66.736 110.991 66.6886 110.686 66.6703C110.512 66.6594 110.339 66.6685 110.143 66.6685L110.147 66.6667Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M109.428 28.6573C111.595 28.6573 113.341 30.393 113.332 32.539C113.323 34.6959 111.582 36.4298 109.424 36.428C107.26 36.4262 105.538 34.705 105.531 32.5372C105.523 30.3784 107.251 28.6573 109.426 28.6573H109.428ZM109.378 29.2535C107.388 29.3045 106.075 30.9746 106.146 32.6666C106.221 34.4406 107.729 35.8901 109.501 35.8263C111.382 35.7588 112.731 34.2948 112.709 32.4788C112.687 30.6574 111.168 29.2061 109.378 29.2535Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M119.946 60.8232C119.088 60.7356 118.292 60.6518 117.494 60.577C117.32 60.5606 117.145 60.577 116.969 60.577C116.447 60.5697 116.058 60.732 115.845 61.2717C115.737 61.5415 115.487 61.7603 115.28 61.9846C115.169 62.1049 115.005 62.1633 114.84 62.0703C114.663 61.97 114.619 61.7913 114.669 61.6145C114.714 61.4504 114.791 61.2863 114.888 61.1459C115.143 60.7758 115.412 60.4166 115.686 60.0592C115.83 59.8696 116.056 59.866 116.248 59.9188C116.513 59.9918 116.765 59.9316 117.022 59.9389C117.546 59.9516 118.069 60.01 118.593 60.0264C119.115 60.0428 119.639 60.0337 120.163 60.0355C120.423 60.0355 120.684 60.0355 120.947 60.0355C121.056 60.3017 120.983 60.515 120.852 60.7119C120.729 60.8924 120.592 61.0638 120.463 61.2407C119.55 62.4769 118.801 63.806 118.156 65.2008C117.546 66.5227 116.896 67.8263 116.257 69.1354C116.15 69.3578 116.02 69.573 115.876 69.7717C115.793 69.8848 115.673 69.985 115.547 70.0434C115.35 70.1345 115.047 70.0762 114.975 69.9559C114.871 69.779 115.01 69.6477 115.089 69.5219C115.963 68.1053 116.67 66.6011 117.404 65.1115C118.061 63.775 118.817 62.4969 119.659 61.268C119.749 61.1386 119.831 61.0037 119.948 60.825L119.946 60.8232Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M94.8662 62.537C94.3074 62.8798 93.8327 63.1697 93.3688 63.4541C93.0639 63.1205 93.0584 63.0348 93.325 62.8233C93.4492 62.7248 93.6026 62.661 93.7304 62.5662C94.2216 62.2015 94.7165 61.8442 95.1876 61.4558C95.3483 61.3227 95.4451 61.1076 95.562 60.9253C95.6953 60.7174 95.814 60.4986 95.9546 60.2962C96.0185 60.2033 96.1135 60.1212 96.2121 60.0647C96.391 59.9608 96.5937 59.8732 96.7818 60.03C96.9754 60.1923 96.9188 60.4129 96.8183 60.5898C96.685 60.8286 96.5371 61.0729 96.3454 61.2644C95.9984 61.6145 95.7738 62.0265 95.5729 62.4677C94.7348 64.2928 93.8948 66.1179 93.031 67.9302C92.7753 68.4681 92.432 68.9622 92.1417 69.4836C92.0084 69.7207 91.8459 69.8665 91.5537 69.8319C91.4277 69.8173 91.298 69.841 91.0862 69.8519C92.611 67.5309 93.6628 65.0458 94.8681 62.5316L94.8662 62.537Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M11.4369 62.0885C11.4552 61.722 11.5392 61.4941 11.7473 61.33C12.0213 61.1167 12.35 61.2279 12.4175 61.5652C12.4723 61.8369 12.3974 62.0867 12.2093 62.2927C12.0633 62.4532 11.7875 62.5352 11.656 62.4222C11.5373 62.3201 11.4753 62.1505 11.4369 62.0867V62.0885Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M110.12 32.7486C110.538 33.3977 110.941 34.0268 111.352 34.6667C110.907 34.8144 110.657 34.685 110.456 34.3203C110.156 33.7733 109.807 33.2537 109.492 32.7414H108.549V34.6922H107.985V30.3584C108.799 30.3584 109.585 30.3292 110.368 30.3675C110.989 30.3985 111.409 30.8634 111.438 31.4377C111.471 32.1069 111.175 32.5025 110.516 32.6702C110.405 32.6994 110.29 32.7158 110.12 32.7486ZM108.555 32.2728C109.015 32.2728 109.431 32.2819 109.849 32.2691C110.036 32.2637 110.224 32.229 110.403 32.1761C110.624 32.1123 110.768 31.961 110.832 31.7276C110.967 31.2262 110.715 30.8579 110.145 30.8051C109.714 30.7649 109.276 30.785 108.841 30.785C108.746 30.785 108.653 30.8142 108.555 30.8306V32.2728Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </li>
                            <li className="client-list__elem">
                                <div className="client-logo _mimac">
                                    <svg viewBox="0 0 171 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 35.8677V3.3694C2.08883 4.13262 4.12986 4.87371 6.16823 5.62391C9.65537 6.90551 13.1359 8.20794 16.6336 9.46088C17.1542 9.64713 17.291 9.89069 17.2737 10.3934C17.2365 11.4067 17.2631 12.4226 17.2631 13.5323C14.8675 13.0973 12.5423 12.6753 10.1626 12.2442V34.7659C16.554 35.2934 22.9519 35.8209 29.4083 36.3522V10.6448C26.4948 11.6021 23.6039 12.5516 20.6002 13.5375C20.6002 12.2833 20.5909 11.102 20.6134 9.92194C20.6161 9.79561 20.7834 9.62239 20.9189 9.55336C27.1641 6.37672 33.4147 3.2079 39.7396 0C39.7595 0.233136 39.7887 0.410267 39.7887 0.587398C39.7914 12.463 39.7887 24.3373 39.7993 36.2129C39.7993 36.6753 39.7011 36.8706 39.1845 36.9761C36.0785 37.6117 32.9911 38.3319 29.881 38.9467C29.2131 39.0795 28.4761 38.9311 27.7776 38.8581C23.8921 38.4492 20.0092 38.0181 16.1237 37.6065C12.6552 37.2392 9.18528 36.8875 5.71673 36.5268C3.98246 36.347 2.24818 36.1647 0.513908 35.9784C0.342606 35.9602 0.176614 35.9055 0 35.8664V35.8677Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M69.4427 18.7329H67.5517V31.1868H63.8163V27.5751H51.8928V8.5049H61.823V11.7011H55.6243V24.2891H63.7777V7.74818H67.5185V15.568H69.4201C69.4201 15.1421 69.4201 14.737 69.4201 14.3333C69.4201 12.3184 69.4321 10.3023 69.4121 8.28739C69.4082 7.83805 69.5436 7.67915 70.0124 7.69348C71.0468 7.72344 72.0826 7.7026 73.1675 7.7026V31.1803H69.4427V18.7329Z"
                                            fill="white"
                                        />
                                        <path d="M101.398 8.6117H113.661V27.6298H101.398V8.6117ZM109.881 24.405V11.8522H105.132V24.405H109.881Z" fill="white" />
                                        <path
                                            d="M126.303 18.5571C126.364 16.0603 126.429 14.0676 127.128 12.1673C128.755 7.74167 133.546 7.07352 136.392 9.10402C137.701 10.0392 138.5 11.3273 138.852 12.8407C139.666 16.3508 139.719 19.8804 138.763 23.3709C138.041 26.0109 136.064 27.7484 133.772 27.9568C130.195 28.2811 127.719 26.5592 126.853 23.1377C126.747 22.7197 126.637 22.2964 126.594 21.8692C126.465 20.6006 126.37 19.3281 126.305 18.5584L126.303 18.5571ZM129.94 17.9423C129.966 17.9462 129.992 17.9502 130.017 17.9541C130.067 18.9061 130.033 19.8699 130.187 20.8051C130.351 21.7962 130.539 22.833 130.987 23.7186C131.74 25.2099 133.835 25.2269 134.748 23.8176C135.024 23.3904 135.226 22.8799 135.323 22.3823C135.793 19.9377 135.761 17.4682 135.504 15.0093C135.414 14.1431 135.214 13.2392 134.829 12.463C134.02 10.8323 131.873 10.8089 130.927 12.3679C130.695 12.7508 130.5 13.1937 130.437 13.63C130.234 15.0627 130.1 16.5044 129.94 17.9436V17.9423Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M88.2727 21.3339C90.8688 21.2857 93.3348 21.7533 95.4276 23.3722C97.62 25.068 97.6877 27.9919 95.5856 29.7984C94.2537 30.9432 92.6655 31.5463 90.9179 31.7846C88.4812 32.1167 86.0511 32.1115 83.7166 31.3105C82.7007 30.9628 81.6902 30.4118 80.8748 29.7268C78.6864 27.8851 78.8697 24.8921 81.1789 23.1768C82.8415 21.9408 84.7816 21.4941 86.812 21.3391C87.2954 21.3026 87.784 21.3339 88.2701 21.3339H88.2727ZM88.1426 28.9127C88.1532 28.8606 88.1638 28.8072 88.1744 28.7551C89.5741 28.7747 90.9551 28.6822 92.2313 28.0414C92.8302 27.7405 93.4052 27.3954 93.4065 26.6178C93.4065 25.8286 92.793 25.5303 92.2074 25.2164C92.1118 25.1643 92.0082 25.124 91.9059 25.0862C89.4931 24.2227 87.063 24.2565 84.6461 25.0263C83.8746 25.2724 83.0553 25.6462 83.0593 26.6296C83.0632 27.579 83.8759 27.9724 84.6103 28.1912C85.7563 28.5311 86.9621 28.6822 88.1426 28.9127Z"
                                            fill="white"
                                        />
                                        <path d="M150.24 8.42284H160.12V20.4652H150.24V8.42284ZM156.581 17.2338V11.6307H153.694V17.2338H156.581Z" fill="white" />
                                        <path d="M120.969 7.69348V17.4201H124.73V20.5199H121.025V31.1542H117.322V7.69348H120.969Z" fill="white" />
                                        <path d="M167.355 20.9119V15.8975H165.464V20.4248H161.946V8.11677H165.432V12.7157H167.327V7.63096H170.857V20.9119H167.355Z" fill="white" />
                                        <path d="M143.044 7.69478H146.707V31.1699H143.044V7.69478Z" fill="white" />
                                        <path
                                            d="M83.8268 16.3729C82.5427 18.8879 80.6225 20.542 78.0397 21.4824C77.5165 21.6725 77.2602 21.5996 77.0438 21.0747C76.7224 20.2971 76.3121 19.5561 75.9163 18.7511C76.1341 18.643 76.3253 18.5467 76.5152 18.4516C79.92 16.7545 81.576 14.0116 81.5932 10.2905C81.5972 9.53642 81.5932 8.78232 81.5932 7.98523H85.4429C85.0751 12.6336 87.1347 15.9184 91.4664 17.8968C91.0003 18.7915 90.5727 19.6681 90.0787 20.5081C89.9897 20.6592 89.598 20.7608 89.3935 20.7087C87.1825 20.1356 85.4801 18.8658 84.2398 16.9903C84.1229 16.8131 84.0034 16.6373 83.8268 16.3742V16.3729Z"
                                            fill="white"
                                        />
                                        <path d="M167.311 31.1542V25.7426H151.831V22.5295H171V31.1542H167.311Z" fill="white" />
                                        <path d="M93.032 14.4232H88.5197V11.3481H93.0041V7.71302H96.7622V21.1164H93.032V14.4219V14.4232Z" fill="white" />
                                    </svg>
                                </div>
                            </li>
                            <li className="client-list__elem">
                                <div className="client-logo _milka">
                                    <svg viewBox="0 0 136 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M30.6859 24.789C31.9503 23.8186 32.952 22.8875 34.0963 22.202C36.6515 20.6679 38.5104 21.2914 39.8236 23.9776C39.9254 24.1882 40.0293 24.3988 40.1026 24.5516C41.3771 22.7285 42.5539 20.8372 43.9344 19.1132C46.4346 15.9934 49.3401 13.33 53.0294 11.6865C53.5832 11.4387 54.1736 11.255 54.7641 11.1187C57.588 10.4683 59.6159 12.3245 59.0743 15.2068C58.7527 16.9143 58.1602 18.5784 57.586 20.224C55.723 25.5612 53.6402 30.8262 51.9686 36.2233C50.4741 41.0526 49.6394 46.0575 50.2481 51.1655C50.4863 53.1724 50.977 55.1462 51.2885 57.1469C51.4718 58.33 51.6265 59.5317 51.6184 60.7251C51.6041 62.5915 50.6105 63.8902 48.9593 64.65C47.1778 65.4697 45.4472 65.3913 43.9059 64.0884C41.8169 62.3231 41.1145 59.8455 40.7052 57.2667C40.0883 53.3768 40.693 49.5757 41.8373 45.8778C43.0935 41.8186 44.5533 37.8235 45.8788 33.7849C46.2392 32.6844 46.51 31.5365 46.6647 30.3885C46.7278 29.9281 46.4977 29.1641 46.1638 28.9762C45.7607 28.7491 44.8791 28.7677 44.5961 29.063C43.6493 30.054 42.6598 31.1091 42.0734 32.3314C39.5712 37.5633 38.2477 43.171 37.2317 48.8675C36.7207 51.7354 36.23 54.6136 35.5154 57.4319C35.2161 58.6108 34.4953 59.7567 33.7257 60.7189C32.8074 61.8668 31.4514 62.2178 30.0344 61.7078C28.7048 61.2309 28.2956 60.0747 28.206 58.7615C28.0004 55.7409 28.9288 52.9246 29.7697 50.1001C30.7063 46.9473 31.7487 43.8235 32.6222 40.6521C32.9174 39.5826 32.9703 38.4016 32.9052 37.2846C32.8054 35.5874 31.3883 34.9164 30.1341 36.0375C29.281 36.7994 28.4788 37.8586 28.151 38.9405C27.2409 41.9487 26.4937 45.0189 25.8564 48.1015C24.9056 52.7037 24.2561 57.3906 22.3341 61.7161C21.6663 63.2192 20.6991 64.6294 19.6608 65.9095C18.7853 66.9893 17.4456 67.2392 16.116 66.7829C14.8048 66.3328 14.3101 65.2261 14.1492 63.9088C13.8805 61.7078 14.3223 59.5957 14.9453 57.5206C16.6902 51.7085 18.5511 45.9294 20.2023 40.0905C21.257 36.3637 22.0735 32.5564 21.7925 28.619C21.764 28.2123 21.6968 27.7994 21.5807 27.4091C21.0677 25.6831 19.8847 25.1607 18.2824 25.9577C16.6434 26.7732 15.5174 28.1669 14.5157 29.639C11.5553 33.9914 9.84299 38.9136 8.33429 43.9205C7.73162 45.9212 7.16968 47.9384 6.46724 49.904C6.15166 50.7877 5.61007 51.6239 5.03387 52.3692C4.37623 53.2178 3.46816 53.6824 2.33816 53.3768C1.17559 53.063 0.491477 52.2866 0.220685 51.1139C-0.276108 48.9604 0.143315 46.8606 0.713405 44.8125C2.52955 38.2859 5.44312 32.2447 8.90845 26.48C11.4209 22.297 14.3569 18.438 18.1541 15.3389C20.1026 13.7491 22.2119 12.4669 24.7651 12.151C26.9253 11.8826 28.4972 12.5764 29.279 14.6349C29.9753 16.4663 30.3561 18.4484 30.6472 20.3995C30.8549 21.7932 30.6879 23.2426 30.6879 24.7849L30.6859 24.789Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M94.9635 18.3926C96.3501 17.3644 97.6918 16.2619 99.1374 15.3245C100.699 14.3128 102.432 13.7264 104.331 13.8028C106.679 13.8957 107.949 15.2708 107.827 17.6535C107.729 19.5716 106.911 21.2233 105.818 22.745C104.02 25.2453 101.721 27.213 99.2698 29.0134C99.001 29.2116 98.7323 29.4119 98.4879 29.5936C98.9827 30.3575 99.4469 31.0657 99.903 31.7801C100.752 33.1056 101.972 33.4442 103.032 32.2859C104.303 30.8985 105.427 29.3025 106.296 27.628C107.491 25.3259 108.312 22.8276 109.43 20.48C111.227 16.7016 113.697 13.4807 117.329 11.3045C119.18 10.1958 121.184 9.61973 123.317 9.56192C126.182 9.48346 127.22 10.9287 126.347 13.6892C126.266 13.9473 126.178 14.2054 126.06 14.5647C126.312 14.5647 126.494 14.5688 126.677 14.5647C127.986 14.5234 128.815 15.1841 128.731 16.522C128.654 17.767 128.306 19.0058 127.974 20.2178C127.721 21.1387 127.237 21.9934 126.986 22.9164C126.661 24.1118 127.353 24.882 128.532 24.5392C129.588 24.2316 130.58 23.67 131.569 23.1579C132.471 22.6913 133.298 22.0574 134.226 21.6631C134.689 21.4669 135.53 21.4277 135.79 21.7085C136.065 22.0058 136.065 22.8998 135.819 23.3004C135.073 24.5103 134.267 25.7243 133.272 26.7216C131.166 28.8276 128.788 30.595 126.082 31.8606C125.836 31.9762 125.586 32.0815 125.331 32.1744C122.908 33.0643 121.693 32.5667 120.609 30.2151C119.811 31.0162 119.056 31.842 118.231 32.5895C116.397 34.2536 114.426 35.6886 111.924 36.1449C110.12 36.4752 108.473 36.3121 107.337 34.5406C105.586 36.6239 103.696 38.4532 101.271 39.5351C100.082 40.0657 98.7791 40.4456 97.4923 40.6191C95.6375 40.8689 94.5462 40.0595 93.9822 38.2323C93.7419 37.4559 93.6788 36.6218 93.5566 35.8104C93.4589 35.1662 93.4508 34.5034 93.292 33.8778C93.2105 33.5599 92.8868 33.0788 92.6669 33.0767C92.3432 33.0726 91.9421 33.3678 91.712 33.6507C91.4412 33.9831 91.2966 34.4312 91.1297 34.8441C90.1931 37.1628 89.3095 39.5062 88.3179 41.8001C87.9168 42.7292 87.3915 43.65 86.7359 44.4078C85.8034 45.4876 84.6164 45.2626 84.0972 43.9267C83.692 42.8861 83.5108 41.7546 83.0426 40.3465C82.9428 40.5881 82.8878 40.8606 82.7392 41.063C81.0391 43.3816 79.2881 45.6569 76.8693 47.2756C76.5598 47.4842 76.2361 47.6782 75.9042 47.8455C73.0639 49.2743 70.979 48.3947 69.9468 45.3472C69.9061 45.2275 69.8327 45.1222 69.7493 44.9632C68.5439 46.4807 67.4363 47.9879 66.2086 49.3878C64.3273 51.531 62.2546 53.4532 59.4938 54.3926C59.0173 54.5537 58.5083 54.659 58.0075 54.7023C56.6759 54.8138 55.8778 54.2873 55.4665 52.9948C55.271 52.3796 55.1285 51.725 55.102 51.0809C54.8516 45.0664 55.9205 39.2956 58.6061 33.9212C59.3655 32.4016 60.6563 31.1504 61.7375 29.8021C61.939 29.5502 62.277 29.3768 62.5845 29.2467C63.6167 28.8131 64.7162 28.5241 65.6752 29.2921C66.5792 30.0148 66.4448 31.1235 66.1374 32.0671C65.6202 33.659 64.932 35.193 64.3294 36.756C63.7267 38.321 63.0833 39.8737 62.5784 41.4697C62.4257 41.9508 62.6741 42.5619 62.7392 43.1132C63.3195 43.0389 63.9893 43.1297 64.4637 42.8634C66.2188 41.8765 67.247 40.1958 68.1734 38.4635C70.2094 34.6521 71.4351 30.5702 72.2088 26.3169C73.1515 21.1304 74.593 16.0864 76.9426 11.3582C77.9056 9.41945 79.0825 7.60871 81.0228 6.4752C83.5414 5.00307 85.777 6.28318 85.8258 9.25015C85.8686 11.7918 84.6571 13.9494 83.6656 16.1586C81.9818 19.906 80.1555 23.5874 78.5307 27.3616C77.5249 29.6989 76.9915 32.2013 76.9609 34.776C76.9487 35.7195 76.8102 36.851 77.924 37.2742C79.0031 37.6851 79.8154 36.9418 80.4771 36.1923C82.3869 34.0347 83.6045 31.4436 84.5737 28.7718C86.6769 22.9742 88.5561 17.0939 90.6879 11.3086C91.6407 8.71952 92.842 6.19646 94.2021 3.80142C94.9004 2.57292 96.0936 1.5509 97.248 0.689922C99.1395 -0.720265 101.072 0.107678 101.277 2.47795C101.395 3.8551 101.155 5.38917 100.636 6.66721C99.7645 8.81243 98.5327 10.8049 97.4658 12.8696C96.5313 14.6762 95.613 16.4931 94.6887 18.3059C94.7803 18.3369 94.874 18.3699 94.9656 18.4009L94.9635 18.3926ZM121.904 17.3107C121.422 17.4222 121.025 17.416 120.742 17.5956C118.92 18.756 116.989 19.7987 115.356 21.1944C113.931 22.4126 113.086 24.1717 112.852 26.1228C112.752 26.957 112.746 27.8407 113.561 28.3362C114.336 28.8069 115.126 28.5427 115.855 28.0884C117.568 27.023 118.386 25.299 119.166 23.5337C119.978 21.6941 120.831 19.8751 121.662 18.0457C121.742 17.8702 121.784 17.6782 121.902 17.3128L121.904 17.3107ZM93.1881 26.4883C95.6925 26.8599 99.4835 24.9047 100.685 22.7863C101.07 22.107 101.351 21.3678 100.811 20.6762C100.223 19.9226 99.4143 20.129 98.6732 20.4181C96.6636 21.1985 95.2466 22.6831 94.1451 24.4979C93.7847 25.0905 93.5363 25.7512 93.1881 26.4883Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M67.8354 28.714C67.0475 26.1146 65.2558 25.681 63.2075 25.5984C62.0307 25.5509 60.8396 25.2742 60.4568 23.9239C60.0761 22.5839 60.5525 21.4215 61.5522 20.4986C63.2889 18.8964 65.9765 18.8262 68.0125 20.3004C69.6841 21.5103 70.3031 23.893 69.4011 26.0279C69.0387 26.8847 68.4645 27.6507 67.8354 28.714Z"
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
                                <div className="client-logo _starbucks">
                                    {/* <svg viewBox="0 0 179 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M114.452 9.79723C114.452 15.1336 111.534 18 106.102 18C100.67 18 97.7425 15.0691 97.7425 9.84332V0.359447H103.749V9.54839C103.749 12.0922 104.423 13.2166 106.048 13.2166C107.673 13.2166 108.445 12.1935 108.445 9.28111V0.359447H114.452V9.79723Z"
                                            fill="white"
                                        />
                                        <path d="M28.3638 4.74654V17.659H22.2942V4.74654H17.2212V0.359447H33.4278V4.74654H28.3638Z" fill="white" />
                                        <path
                                            d="M43.6546 4.29493L42.1551 10.2304H45.19L43.6546 4.29493ZM47.5514 17.659L46.5457 14.4885H40.8532L39.7578 17.659H33.7151L39.8566 0.359447H47.5424L53.612 17.659H47.5514Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M133.909 16.3041L132.095 11.8157C131.018 12.6452 129.94 13.3825 128.171 13.3825C125.792 13.3825 124.212 11.3825 124.212 8.92166C124.212 6.46083 125.603 4.35945 128.082 4.35945C129.653 4.35945 131.009 5.17051 132.104 6.04608L133.9 1.6682C131.889 0.645161 129.886 0.00921659 127.121 0.00921659C122.021 0.00921659 118.151 3.59447 118.151 8.88479C118.151 14.47 121.913 18 127.291 18C130.254 18 132.338 17.2995 133.909 16.3041Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M147.539 17.659L143.749 11.3456V17.659H137.859V0.359447H143.749V6.70046L147.305 0.359447H153.886L148.356 8.88479L154.596 17.659H147.539Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M7.08422 18C10.9092 18 14.8688 16.6083 14.8688 12.1751C14.8688 8.18433 11.5646 7.09677 8.97873 6.52535C7.03035 6.09217 6.10554 5.89862 6.10554 5.09677C6.10554 4.03687 7.40745 3.95392 8.12575 3.95392C9.86763 3.95392 11.4928 4.69124 12.9024 5.5576L14.4737 1.62212C12.4086 0.718894 9.9215 0 7.58703 0C3.62741 0.00921659 0.529745 1.97235 0.529745 5.92627C0.529745 9.17051 2.91809 10.4147 5.55784 11.0876C7.3895 11.5484 8.56571 11.6866 8.56571 12.6267C8.56571 13.5668 7.65886 13.8249 6.78792 13.8249C4.87545 13.8249 3.03481 12.9677 1.89451 11.9631L0 15.7788C2.05613 17.1521 4.5612 18 7.08422 18Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M163.521 18C167.337 18 171.305 16.6083 171.305 12.1751C171.305 8.18433 168.001 7.09677 165.424 6.52535C163.476 6.09217 162.551 5.89862 162.551 5.09677C162.551 4.03687 163.853 3.95392 164.553 3.95392C166.304 3.95392 167.938 4.69124 169.339 5.5576L170.892 1.62212C168.845 0.718894 166.349 0 164.023 0C160.064 0 156.948 1.96313 156.948 5.91705C156.948 9.16129 159.355 10.4055 161.994 11.0783C163.826 11.5392 164.993 11.6774 164.993 12.6175C164.993 13.5576 164.095 13.8157 163.224 13.8157C161.312 13.8157 159.48 12.9585 158.331 11.9539L156.436 15.7696C158.493 17.1429 160.989 17.9908 163.521 17.9908"
                                            fill="white"
                                        />
                                        <path
                                            d="M173.963 2.60829V2.58986C173.963 1.18894 175.076 0.00921659 176.486 0.00921659C177.896 0.00921659 179 1.17051 179 2.57143V2.58986C179 3.99078 177.869 5.17051 176.468 5.17051C175.067 5.17051 173.963 4.00922 173.963 2.60829ZM178.641 2.58986V2.57143C178.641 1.34562 177.707 0.35023 176.486 0.35023C175.265 0.35023 174.313 1.36406 174.313 2.58986V2.60829C174.313 3.81567 175.238 4.82949 176.468 4.82949C177.698 4.82949 178.641 3.81567 178.641 2.58986ZM175.489 1.18894H176.639C176.962 1.18894 177.24 1.29954 177.402 1.46544C177.527 1.58525 177.608 1.76037 177.608 1.98157C177.608 2.42396 177.33 2.67281 176.953 2.77419L177.752 3.8341H177.285L176.549 2.82949H175.893V3.8341H175.507V1.18894H175.489ZM176.603 2.4977C176.962 2.4977 177.204 2.31336 177.204 2.02765V2.00922C177.204 1.74194 176.998 1.5576 176.621 1.5576H175.875V2.4977H176.603Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M69.5852 11.1889C71.6503 10.4147 72.7547 8.29493 72.7547 6.29493C72.7547 2.2212 70.0341 0.359447 66.1822 0.359447H57.0778V17.659H62.923V12.5253H64.3865L67.4303 17.659H73.7244L69.5762 11.1889H69.5852ZM66.8556 6.31336C66.8556 7.45622 66.1553 8.10138 64.997 8.10138H62.9319V4.48848H65.024C66.1373 4.48848 66.8556 5.07834 66.8556 6.25806V6.31336Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M90.0567 8.82028C92.2565 8.35023 93.3249 7.08756 93.3249 4.96774C93.3249 2.02765 91.188 0.368664 87.39 0.368664H77.7828V17.659H87.0129C91.4663 17.659 93.6841 16.0461 93.6841 12.7742C93.6841 10.5253 92.3014 8.99539 90.0567 8.81106M83.5651 4.10138H85.6751C86.8064 4.10138 87.5247 4.59908 87.5247 5.60369V5.65899C87.5247 6.62673 86.8243 7.18894 85.6571 7.18894H83.5651V4.10138ZM87.6145 12.2765C87.6145 13.2995 86.8962 13.8986 85.711 13.8986H83.574V10.6452H85.7379C86.8872 10.6452 87.6234 11.1613 87.6234 12.2396V12.2765H87.6145Z"
                                            fill="white"
                                        />
                                    </svg> */}
                                    <img src="/assets/starbucks_logo.svg"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="company_profile-block">
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
                            </div> */}
                    <div className="contact-block">
                        <div className="inner">
                            <div className="left">
                                <p className="small-title">Contact</p>
                            </div>
                            <div className="right">
                                <Link to="/contact">
                                    <span>프로젝트 문의하기</span>
                                    <svg viewBox="0 0 29 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 5.97348H27.375L22.4989 1" stroke="#404040" strokeLinecap="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-block">
                        <p className="small-title">Minivertising Project</p>
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
                            <button type="button" className="go-top" ref={goTopRef}>
                                Back to top
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                    <>{device === 'mobile' ? null : <Footer />}</>
                </div>
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default About;
