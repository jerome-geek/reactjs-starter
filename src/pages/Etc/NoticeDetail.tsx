import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import Header from 'components/shared/Header';
import Loader from 'components/shared/Loader';
import { board } from 'api/manage';
import { BoardDetail, BoardDetailState } from 'models/manage';
import { BOARD_DETAIL } from 'const/queryKeys';

const NoticeDetail = () => {
    const [boardDetail, setBoardDetail] = useState<BoardDetail>();

    const location = useLocation();
    const { articleNo, boardNo } = location.state as BoardDetailState;

    const navigate = useNavigate();
    if (!boardNo) {
        navigate('/');
    }

    useQuery(
        [BOARD_DETAIL, articleNo],
        async () => await board.getArticleDetail(boardNo, articleNo),
        {
            onSuccess: (response) => {
                setBoardDetail(response.data);
            },
        },
    );

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1 style={{ fontWeight: 'bold' }}>공지사항</h1>
            </div>
            <div>
                {boardDetail ? (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: '1px solid #999',
                                padding: '20px',
                            }}
                        >
                            <p style={{ fontWeight: 'bold' }}>
                                {boardDetail.title}
                            </p>
                            <p>
                                {dayjs(boardDetail.registerYmdt).format(
                                    'YY-MM-DD',
                                )}
                            </p>
                        </div>

                        <div
                            style={{ padding: '20px' }}
                            dangerouslySetInnerHTML={{
                                __html: boardDetail.content,
                            }}
                        />
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
};

export default NoticeDetail;
