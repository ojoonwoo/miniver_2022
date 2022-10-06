import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { changeColor, setContactState } from './../store.js';
import PageTransition from '../components/PageTransition';
import ArrowRight from '../components/ArrowRight.js';

import 'react-datepicker/dist/react-datepicker.css';

function Contact(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    let contactState = useSelector((state) => {
        return state.contactState;
    });
    console.log(contactState);
    let dispatch = useDispatch();

    let device = useSelector((state) => {
        return state.currentDevice;
    });

    const [categoryData, setCategoryData] = useState([]);
    // console.log(categoryData);

    // * 컨텍트에서 선택된 값이 중복되지 않도록 Set을 사용하여 유일한 값만 저장

    // * step 1 카테고리 리스트 state
    const [checkedList, setCheckedList] = useState(new Set());
    // * step 2 내용 인풋 state
    const [description, setDescription] = useState('');
    // * step 3 일정 인풋 state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    // * step 4 브랜드 또는 회사명 인풋 state
    const [company, setCompany] = useState('');
    // * step 5 이름, 번호, 이메일 인풋 state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [active, setActive] = useState(contactState.step);

    useEffect(() => {
        console.log('컨텍트 마운트');
        dispatch(changeColor('white'));
        getCategoryData();
        return () => {
            console.log('컨텍트 언마운트');
            dispatch(
                setContactState({
                    step: 1,
                    category: null,
                    description: null,
                    schedule: null,
                    budget: null,
                    company: null,
                    name: null,
                    phone: null,
                    email: null,
                })
            );
        };
    }, []);

    useEffect(() => {
        setActive(contactState.step);
        if (contactState.step === 6) {
            insertContactData();
        }
        return () => {};
    }, [contactState.step]);

    const getCategoryData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getcategories',
        });

        setCategoryData(result.data.list);
        console.log(result.data.list);
    };

    const insertContactData = async () => {
        console.log(contactState);
        let category = contactState.category.toString().replace(/,/g, ', ');
        let phone = '';
        console.log(contactState.phone.length);
        // ! 앞의 두자리 01
        // ! 02, 070, 080, 1566
        // ! 9자리면 맨 뒤 부터 4 - 3 -
        // ! 10자리면 앞에 두번째를 확인
        // ! 1. 앞에 두번째가 1보다 크면 4 -
        switch (contactState.phone.length) {
            case 11:
                // * 전화번호 11자리 일때
                // * 010, 070, 080
                // * xxx - xxxx - xxxx로 변환
                phone = contactState.phone.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
                break;
            case 10:
                // * 전화번호 10자리 일때
                // * 두번째 숫자가 2라면
                // * x2 - xxxx - xxxx로 변환
                // * 두번째 숫자가 2보다 크다면
                // * xxx - xxx - xxxx로 변환
                console.log(contactState.phone.charAt(1));
                if (contactState.phone.charAt(1) === '2') {
                    phone = contactState.phone.replace(/^(\d{2})(\d{4})(\d{4})$/, `$1-$2-$3`);
                } else {
                    phone = contactState.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, `$1-$2-$3`);
                }
                break;
            case 9:
                // * 전화번호 9자리 일때
                // * xx - xxx - xxxx로 변환
                phone = contactState.phone.replace(/^(\d{2})(\d{3})(\d{4})$/, `$1-$2-$3`);
                break;
            default:
                break;
        }
        console.log(phone);
        const result = await axios({
            method: 'post',
            url: '/api/contact/insert',
            data: {
                category: category,
                description: contactState.description,
                schedule: contactState.schedule,
                budget: contactState.budget,
                company: contactState.company,
                name: contactState.name,
                phone: phone,
                email: contactState.email,
            },
        });
        console.log(result.data);
    };

    const inputHandler = ({ target }, idx) => {
        console.log(target);
        console.log(target.value);
        console.log(target.checked);
        switch (contactState.step) {
            case 1:
                // console.log(idx);
                if (target.checked === true) {
                    checkedList.add(idx);
                    setCheckedList(checkedList);
                } else {
                    checkedList.delete(idx);
                    setCheckedList(checkedList);
                }
                break;
            case 2:
                setDescription(target.value);
                break;
            case 3:
                setBudget(target.value);
                break;
            case 4:
                setCompany(target.value);
                break;
            case 5:
                console.log(target.id);
                switch (target.id) {
                    case 'nameInput':
                        // target.value = target.value.replace(/^?[a-zA-Zㄱ-힣|\s]/g, '');
                        setName(target.value);
                        break;
                    case 'phoneInput':
                        target.value = target.value.replace(/[^0-9.]/g, '').replace(/[~!@\#$%^&*\()\-=+_'\s\;<>\/.\`:\"\\,\[\]?|{}]/gi, '');
                        if (target.value.length > 11) {
                            return false;
                        }
                        setPhone(target.value);
                        break;
                    case 'emailInput':
                        setEmail(target.value);
                        break;
                    default:
                        break;
                }
                // setCompany(target.value);
                break;
            default:
                break;
        }
    };

    const contactStateHandler = () => {
        switch (contactState.step) {
            case 1:
                if (checkedList.size === 0) {
                    alert('문의하실 프로젝트를 선택해주세요');
                    return false;
                }
                break;
            case 2:
                if (!description) {
                    alert('프로젝트 내용을 입력해주세요');
                    return false;
                }
                break;
            case 3:
                if (!startDate || !endDate) {
                    alert('일정을 입력해주세요');
                    return false;
                }
                if (!budget) {
                    alert('예산을 입력해주세요');
                    return false;
                }
                break;
            case 4:
                if (!company) {
                    alert('브랜드 또는 회사명을 입력해주세요');
                    return false;
                }
                break;
            case 5:
                const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (!name) {
                    alert('성함을 입력해주세요');
                    return false;
                }
                if (!phone) {
                    alert('휴대폰 번호를 입력해주세요');
                    return false;
                }
                if (!email) {
                    alert('이메일 주소를 입력해주세요');
                    return false;
                }
                if (!regex.test(email)) {
                    alert('이메일 형식을 확인해주세요');
                    return false;
                }
                break;
            default:
                break;
        }
        console.log(contactState.step);
        // ! 중복되는 부분 수정해야함
        switch (contactState.step) {
            case 1:
                const categoryArr = [...checkedList];
                dispatch(
                    setContactState({
                        step: 2,
                        category: categoryArr.sort(),
                        description: contactState.description,
                        schedule: contactState.schedule,
                        budget: contactState.budget,
                        company: contactState.company,
                        name: contactState.name,
                        phone: contactState.phone,
                        email: contactState.email,
                    })
                );
                break;
            case 2:
                dispatch(
                    setContactState({
                        step: 3,
                        category: contactState.category,
                        description: description,
                        schedule: contactState.schedule,
                        budget: contactState.budget,
                        company: contactState.company,
                        name: contactState.name,
                        phone: contactState.phone,
                        email: contactState.email,
                    })
                );
                break;
            case 3:
                let sDate = JSON.stringify(startDate);
                sDate = sDate.substring(1, 11);
                let eDate = JSON.stringify(endDate);
                eDate = eDate.substring(1, 11);

                dispatch(
                    setContactState({
                        step: 4,
                        category: contactState.category,
                        description: contactState.description,
                        schedule: {
                            // startDate: startDate.getFullYear() + '년 ' + (startDate.getMonth() + 1) + '월 ' + startDate.getDate() + '일',
                            // endDate: endDate.getFullYear() + '년 ' + (endDate.getMonth() + 1) + '월 ' + endDate.getDate() + '일',
                            startDate: sDate,
                            endDate: eDate,
                        },
                        budget: budget,
                        company: contactState.company,
                        name: contactState.name,
                        phone: contactState.phone,
                        email: contactState.email,
                    })
                );
                break;
            case 4:
                dispatch(
                    setContactState({
                        step: 5,
                        category: contactState.category,
                        description: contactState.description,
                        schedule: contactState.schedule,
                        budget: contactState.budget,
                        company: company,
                        name: contactState.name,
                        phone: contactState.phone,
                        email: contactState.email,
                    })
                );
                break;
            case 5:
                dispatch(
                    setContactState({
                        step: 6,
                        category: contactState.category,
                        description: contactState.description,
                        schedule: contactState.schedule,
                        budget: contactState.budget,
                        company: contactState.company,
                        name: name,
                        phone: phone,
                        email: email,
                    })
                );
                // ! DB 통신
                break;
            default:
                break;
        }
        console.log(contactState.step);
    };

    const surveyVariants = {
        initial: {
            y: 10,
            opacity: 0,
            display: 'none',
        },
        visible: {
            opacity: 1,
            display: 'block',
            y: 0,
            transition: {
                duration: 1,
            },
        },
        hidden: {
            y: -10,
            opacity: 0,
            display: 'none',
        },
    };

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                {/* <Header></Header> */}
                <div className="inner">
                    <div className="surveys">
                        <AnimatePresence exitBeforeEnter>
                            <motion.div key="1" className={`survey-item`} data-idx="1" initial="initial" animate={active === 1 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h3 className="title-num">1.</h3>
                                    <h2 className="title">
                                        프로젝트를
                                        {device === 'mobile' ? <br /> : ' '}
                                        문의하고 싶으신가요?
                                    </h2>
                                    <p className="title-desc">* 중복 선택</p>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        {categoryData.map((item) => (
                                            <div className="input-box" key={item.idx}>
                                                <div className="inner">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={item.category_name}
                                                            onChange={(e) => {
                                                                inputHandler(e, item.idx);
                                                            }}
                                                        />
                                                        <div className="btn-checkbox">
                                                            <span>{item.category_name}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className="input-box">
                                            <div className="inner">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value="기타"
                                                        onChange={(e) => {
                                                            inputHandler(e, 999);
                                                        }}
                                                    />
                                                    <div className="btn-checkbox">
                                                        <span>기타</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <button className='btn-next' onClick={contactStateHandler}>
                                    <ArrowRight />
                                </button> */}
                            </motion.div>
                            <motion.div key="2" className={`survey-item`} data-idx="2" initial="initial" animate={active === 2 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h3 className="title-num">2.</h3>
                                    <h2 className="title">
                                        프로젝트의 구체적인 내용을
                                        {device === 'mobile' ? <br /> : ' '}
                                        넣어주세요.
                                    </h2>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        <div className="input-box">
                                            <div className="inner full-width">
                                                <textarea
                                                    placeholder="입력하기"
                                                    value={description}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                ></textarea>
                                                {/* <input
                                                    type="text"
                                                    placeholder="입력하기"
                                                    value={description}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button className="btn-next" onClick={contactStateHandler}>
                                    <ArrowRight />
                                </button> */}
                            </motion.div>
                            <motion.div key="3" className={`survey-item`} data-idx="3" initial="initial" animate={active === 3 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h3 className="title-num">3.</h3>
                                    <h2 className="title">일정과 예산을 입력해주세요</h2>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        <div className="input-box" id="dateInput">
                                            <div className="inner">
                                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="0000.00.00" dateFormat="yyyy.MM.dd" minDate={new Date()} />
                                                <span>-</span>
                                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="0000.00.00" dateFormat="yyyy.MM.dd" minDate={new Date()} />
                                            </div>
                                        </div>
                                        <div className="input-box" id="budgetInput">
                                            <div className="inner">
                                                <input
                                                    type="number"
                                                    value={budget}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                />
                                                <span>만원</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button className='btn-next' onClick={contactStateHandler}>
                                    <ArrowRight />
                                </button> */}
                            </motion.div>
                            <motion.div key="4" className={`survey-item`} data-idx="4" initial="initial" animate={active === 4 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h3 className="title-num">4.</h3>
                                    <h2 className="title">
                                        브랜드 또는 회사명을
                                        {device === 'mobile' ? <br /> : ' '}
                                        입력해주세요
                                    </h2>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        <div className="input-box">
                                            <div className="inner">
                                                <input
                                                    type="text"
                                                    placeholder="브랜드 또는 회사명"
                                                    value={company}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                />
                                            </div>
                                        </div>
                                        {/* <button className='btn-next' onClick={contactStateHandler}>
                                            <ArrowRight />
                                        </button> */}
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div key="5" className={`survey-item`} data-idx="5" initial="initial" animate={active === 5 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h3 className="title-num">5.</h3>
                                    <h2 className="title">
                                        담당자분의 성함과
                                        {device === 'mobile' ? <br /> : ' '}
                                        연락처를 입력해주세요
                                    </h2>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        <div className="input-box">
                                            <div className="inner">
                                                <input
                                                    id="nameInput"
                                                    type="text"
                                                    placeholder="성함"
                                                    value={name}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                />
                                                <input
                                                    id="phoneInput"
                                                    type="text"
                                                    placeholder="휴대폰 번호"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                />
                                                <input
                                                    id="emailInput"
                                                    type="text"
                                                    placeholder="이메일 주소"
                                                    value={email}
                                                    onChange={(e) => {
                                                        inputHandler(e);
                                                    }}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button className='btn-next' onClick={contactStateHandler}>
                                    <ArrowRight />
                                </button> */}
                            </motion.div>
                            <motion.div key="6" className={`survey-item`} data-idx="6" initial="initial" animate={active === 6 ? 'visible' : ''} exit="hidden" variants={surveyVariants}>
                                <div className="title-block">
                                    <h2 className="title">
                                        문의주신 내용에
                                        {device === 'mobile' ? <br /> : ' '}
                                        빠른 회신 드리겠습니다.
                                    </h2>
                                    <h2 className="title">감사합니다.</h2>
                                </div>
                                <div className="input-block">
                                    <div className="inner">
                                        <div className="btn-portfolio"></div>
                                        <div className="btn-company_profile"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <button className="btn-next" onClick={contactStateHandler}>
                        <ArrowRight />
                    </button>
                </div>
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default Contact;
