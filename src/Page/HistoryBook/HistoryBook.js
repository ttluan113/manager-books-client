import classNames from 'classnames/bind';
import styles from './HistoryBook.module.scss';
import Header from '../HomePage/Layouts/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import request from '../../config/Connect';
import { jwtDecode } from 'jwt-decode';
import ModalExtendBook from '../../Modal/ModalExtendBook';

const cx = classNames.bind(styles);

function HistoryBook() {
    const token = document.cookie;
    const [dataBooks, setDataBooks] = useState([]);
    const [masinhvien, setMasinhvien] = useState('');

    const [show, setShow] = useState(false);

    const handleShowModal = () => {
        setShow(!show);
    };

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setMasinhvien(decoded.masinhvien);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);

    useEffect(() => {
        async function fetchData() {
            if (token && masinhvien) {
                try {
                    const response = await request.get('/api/datareqbook', {
                        params: { masinhvien },
                    });
                    setDataBooks(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchData();
    }, [masinhvien, token]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>
            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên Sách</th>
                            <th scope="col">Ngày Mượn</th>
                            <th scope="col">Ngày Trả</th>
                            <th scope="col">Tình Trạng</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBooks.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.nameBook}</td>
                                <td>{item?.ngaymuon}</td>
                                <td>{item?.ngayhethan}</td>
                                <td>
                                    {item?.tinhtrang ? (
                                        <>
                                            <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                            <span style={{ paddingLeft: '10px' }}>Active</span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                                            <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Xử Lý</span>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <button onClick={handleShowModal} type="button" className="btn btn-primary">
                                        Gia Hạn Ngày Mượn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <ModalExtendBook show={show} setShow={setShow} masinhvien={masinhvien} />
        </div>
    );
}

export default HistoryBook;
