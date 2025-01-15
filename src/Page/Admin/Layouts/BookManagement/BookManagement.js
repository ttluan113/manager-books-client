import classNames from 'classnames/bind';
import styles from './BookManagement.module.scss';
import { useEffect, useState } from 'react';
import ModalAddBook from '../../../../Modal/ModalAddBook';
import ModalEditBook from '../../../../Modal/ModalEditBook';
import ModalDeleteBook from '../../../../Modal/ModalDeleteBook';
import request from '../../../../config/Connect';
import useDebounce from '../../../../customHook/useDebounce';

const cx = classNames.bind(styles);

function BookManagement() {
    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const [showModalEditBook, setShowModalEditBook] = useState(false);
    const [showModalDeleteBook, setShowModalDeleteBook] = useState(false);
    const [idBook, setIdBook] = useState('');
    const [dataBooks, setDataBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        request.get('/api/books').then((res) => setDataBooks(res.data));
    }, [showModalAddBook, showModalEditBook, showModalDeleteBook]);

    useEffect(() => {
        try {
            if (searchValue === '') {
                return;
            }
            request.get('/api/search', { params: { nameBook: debounce } }).then((res) => setDataBooks(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [debounce, searchValue]);

    const handleShow = () => {
        setShowModalAddBook(!showModalAddBook);
    };

    const handleShow1 = (id) => {
        setShowModalEditBook(!showModalEditBook);
        setIdBook(id);
    };

    const handleShow2 = (id) => {
        setShowModalDeleteBook(!showModalDeleteBook);
        setIdBook(id);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h4>Quản Lý Sách</h4>
                <button onClick={handleShow} type="button" className="btn btn-primary">
                    Thêm Sách
                </button>
                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm tên sách"
                        aria-label="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã Sách</th>
                            <th scope="col">Tên Sách</th>
                            <th scope="col">Tác Giả</th>
                            <th scope="col">Nhà Xuất Bản</th>
                            <th scope="col">Phiên Bản</th>
                            <th scope="col">Danh Mục</th>
                            <th scope="col">Năm Xuất Bản</th>
                            <th scope="col">Mô Tả</th>
                            <th scope="col">Số Lượng</th>
                            <th scope="col">Ngày Cập Nhật</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBooks.map((item) => (
                            <tr key={item._id}>
                                <th scope="row">{item.masach}</th>
                                <td>{item.tensach}</td>
                                <td>{item.tacgia}</td>
                                <td>{item.nhaxuatban}</td>
                                <td>{item.phienban}</td>
                                <td>{item.danhmuc}</td>
                                <td>{item.namxb}</td>
                                <td>{item.mota}</td>
                                <td>{item.soluong}</td>
                                <td>{item.ngaycapnhat}</td>
                                <td style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button onClick={() => handleShow2(item._id)} type="button" class="btn btn-danger">
                                        Xóa Sách
                                    </button>
                                    <button onClick={() => handleShow1(item._id)} type="button" class="btn btn-warning">
                                        Cập Nhật Sách
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalAddBook showModalAddBook={showModalAddBook} setShowModalAddBook={setShowModalAddBook} />
            <ModalEditBook
                showModalEditBook={showModalEditBook}
                setShowModalEditBook={setShowModalEditBook}
                idBook={idBook}
            />
            <ModalDeleteBook
                showModalDeleteBook={showModalDeleteBook}
                setShowModalDeleteBook={setShowModalDeleteBook}
                idBook={idBook}
            />
        </div>
    );
}

export default BookManagement;
