import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

import { useState } from 'react';
import BookManagement from './Layouts/BookManagement/BookManagement';
import ManagementUser from './Layouts/ManagementUser/ManagementUser';
import RequestCart from './Layouts/RequestCart/RequestCart';
import HandleBook from './Layouts/HandleBook/HandleBook';
import BaoCaoThongKe from './Layouts/BaoCaoThongKe/BaoCaoThongKe';

const cx = classNames.bind(styles);
function AdminPage() {
    const [checkPage, setcheckPage] = useState('1');

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div>
                    <h4>Trang Quản Trị</h4>
                </div>

                <div>
                    <h4>HỆ THỐNG QUẢN LÝ THƯ VIỆN</h4>
                </div>
                <div>
                    <span>Xin Chào : Admin</span>
                </div>
            </header>

            <div className={cx('main-page')}>
                <div className={cx('slide-bar')}>
                    <ul>
                        <li onClick={() => setcheckPage('1')}>Quản Lý Sách</li>
                        <li onClick={() => setcheckPage('3')}>Quản Lý Thẻ</li>
                        <li onClick={() => setcheckPage('2')}>Quản Lý Người Dùng</li>
                        <li onClick={() => setcheckPage('4')}>Mượn Trả Sách</li>
                        <li onClick={() => setcheckPage('5')}>Báo Cáo - Thống Kê</li>
                    </ul>
                </div>
                <div className={cx('home-page')}>
                    {checkPage === '1' ? <BookManagement /> : <div></div>}
                    {checkPage === '2' ? <ManagementUser /> : <div></div>}
                    {checkPage === '3' ? <RequestCart /> : <div></div>}
                    {checkPage === '4' ? <HandleBook /> : <div></div>}
                    {checkPage === '5' ? <BaoCaoThongKe /> : <div></div>}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
