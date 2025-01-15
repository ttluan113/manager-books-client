import { useEffect, useState } from 'react';
import request from '../../../../config/Connect';
import classNames from 'classnames/bind';
import styles from './HandleBooks.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

const cx = classNames.bind(styles);

function HandleBook() {
    const [data, setData] = useState([]);
    const [overdueDays, setOverdueDays] = useState([]);

    useEffect(() => {
        request.get('/api/datacart').then((res) => setData(res.data));
    }, []);

    const handleSuccess = (id) => {
        request.post('/api/editdatacart', {
            id,
        });
        window.location.reload();
    };

    const deleteBook = (id) => {
        request.post('/api/deletebooks', { id });
        window.location.reload();
    };

    const handleBookUser = (email) => {
        request.post('/api/email', {
            email,
        });
    };

    useEffect(() => {
        const calculateOverdueDays = () => {
            const currentDate = new Date();

            const daysOverdue = data.map((item) => {
                const parseDate = (dateStr) => {
                    const [day, month, year] = dateStr.split('/').map(Number);
                    return new Date(year, month - 1, day);
                };

                const expiryDate = parseDate(item.ngayhethan);

                // Tính số ngày giữa ngày hết hạn và ngày hiện tại
                const timeDifference = currentDate - expiryDate;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                return daysDifference > 0 ? daysDifference : 0; // Chỉ tính số ngày quá hạn nếu lớn hơn 0
            });

            setOverdueDays(daysOverdue);
        };

        calculateOverdueDays();
    }, [data]);

    return (
        <>
            <div>
                <h4 style={{ textAlign: 'center' }}>Quản Lý Mượn Trả Sách</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Tên Sách</th>
                        <th scope="col">Ngày Mượn Sách</th>
                        <th scope="col">Ngày Hết Hạn</th>
                        <th scope="col">Tình Trạng</th>
                        <th scope="col">Số Ngày Quá Hạn</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.masinhvien}>
                            <th scope="row">{item.masinhvien}</th>
                            <td>{item.nameBook}</td>
                            <td>{item.ngaymuon}</td>
                            <td>{item.ngayhethan}</td>
                            <td>
                                {item?.tinhtrang ? (
                                    <>
                                        <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                        <span style={{ paddingLeft: '10px' }}>Active</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Xử Lý</span>
                                    </>
                                )}
                            </td>
                            <td style={{ color: overdueDays[index] > 0 ? 'red' : 'black' }}>
                                {overdueDays[index]} Ngày
                            </td>
                            <td style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button
                                    onClick={() => handleBookUser(item.masinhvien)}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Thông Báo Cho Người Dùng
                                </button>
                                <button
                                    onClick={() => handleSuccess(item._id)}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Duyệt
                                </button>
                                <button onClick={() => deleteBook(item._id)} type="button" className="btn btn-danger">
                                    Hủy
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default HandleBook;
