import { useState, useEffect } from 'react';

import request from '../../../../config/Connect';

function BaoCaoThongKe() {
    const [datacart, setDataCart] = useState([]);

    useEffect(() => {
        request.get('/api/datacart').then((res) => setDataCart(res.data));
    }, []);

    return (
        <>
            <div>
                <h4 style={{ textAlign: 'center' }}>Báo cáo thống kê</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Tên Sách</th>
                        <th scope="col">Ngày Mượn</th>
                        <th scope="col">Ngày Trả</th>
                    </tr>
                </thead>
                <tbody>
                    {datacart.map((item) => (
                        <tr>
                            <th scope="row">{item.masinhvien}</th>
                            <td>{item.nameBook}</td>
                            <td>{item.ngaymuon}</td>
                            <td>{item.ngayhethan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BaoCaoThongKe;
