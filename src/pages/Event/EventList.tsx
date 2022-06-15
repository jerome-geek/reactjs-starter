import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';

import paths from 'const/paths';
import { event } from 'api/display';
import SEOHelmet from 'components/shared/SEOHelmet';
import { getPlatform } from 'utils';
import { EventListResponse } from 'models/display';

const EventList = () => {
    const [eventList, setEventList] = useState<EventListResponse[]>([]);
    const navigate = useNavigate();

    const { data } = useQuery<AxiosResponse<EventListResponse[]>, AxiosError>(
        'eventList',
        async () => await event.getEvents({}),
        {
            onSuccess: (res) => {
                setEventList([...res.data]);
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    alert(error.message);
                    return;
                }
                alert('알수 없는 에러가 발생했습니다.');
            },
        },
    );

    const goEventDetailHandler = (eventNo: number) => {
        navigate(`${paths.EVENT_DETAIL}/${eventNo}`);
    };

    return (
        <>
            <SEOHelmet
                data={{
                    title: '기획전',
                }}
            />
            <div style={{ padding: '0 50px' }}>
                <div style={{ margin: '20px 0' }}>
                    <h2>기획전</h2>
                </div>
                <div
                    style={{
                        margin: '10px auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    {eventList?.length > 0 &&
                        eventList.map(
                            ({
                                endYmdt,
                                eventNo,
                                label,
                                mobileimageUrl,
                                pcImageUrl,
                                startYmdt,
                            }) => {
                                return (
                                    <div
                                        style={{ marginBottom: '20px' }}
                                        key={eventNo}
                                        onClick={() =>
                                            goEventDetailHandler(eventNo)
                                        }
                                    >
                                        <div>
                                            <img
                                                src={
                                                    getPlatform() === 'PC'
                                                        ? pcImageUrl
                                                        : mobileimageUrl
                                                }
                                                alt={label}
                                            />
                                        </div>
                                        <div>
                                            <p>{label}</p>
                                            <p>
                                                {`${dayjs(startYmdt).format(
                                                    'YY.MM.DD',
                                                )}`}{' '}
                                                -{' '}
                                                {`${dayjs(endYmdt).format(
                                                    'YY.MM.DD',
                                                )}`}
                                            </p>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                </div>
            </div>
        </>
    );
};

export default EventList;
