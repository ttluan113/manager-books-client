import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';

import { useState } from 'react';
import ModalRequestBook from './Modal/ModalRequestBook';

const cx = classNames.bind(styles);

function MainPage({ dataBooks }) {
    const [show, setShow] = useState(false);
    const [nameBook, setNameBook] = useState('');
    const [show1, setShow1] = useState(false);

    const handleShow1 = () => {
        setShow1(!show1);
    };

    const handleShow = (name) => {
        setShow(!show);
        setNameBook(name);
    };

    return (
        <div className={cx('wrapper')}>
            {dataBooks.map((item) => (
                <div key={item._id} className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.tensach}</h5>
                        <p className="card-text">
                            <ul className={cx('list-li')}>
                                <img src={item.img} className="card-img-top" alt="..." />
                                <li>Mã Sách : {item.masach} </li>
                                <li>Tác Giả : {item.tacgia}</li>
                                <li>Nhà xuất bản: {item.nhaxuatban} </li>
                                {show1 ? (
                                    <div>
                                        <li>Phiên Bản: {item.phienban}</li>
                                        <li>Danh Mục : {item.danhmuc} </li>
                                        <li>Năm xuất bản : {item.namxb}</li>
                                        <li>Số lượng Còn Lại : {item.soluong}</li>
                                        <li>Ngày Cập Nhật : {item.ngaycapnhat}</li>
                                        <li>Mô Tả : {item.mota}</li>
                                        <span style={{ color: 'blue' }} onClick={handleShow1}>
                                            Ẩn bớt
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span style={{ color: 'blue' }} onClick={handleShow1}>
                                            Xem Thêm
                                        </span>
                                    </div>
                                )}
                            </ul>
                        </p>
                        <button onClick={() => handleShow(item.tensach)} type="button" className="btn btn-primary">
                            Gửi Yêu Cầu Mượn Sách
                        </button>
                    </div>
                </div>
            ))}
            <ModalRequestBook show={show} setShow={setShow} nameBook={nameBook} />
        </div>
    );
}

export default MainPage;
