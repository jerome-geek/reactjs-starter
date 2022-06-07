import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import StyledInput from 'components/Input/StyledInput';
import { setAccessToken } from 'state/slices/tokenSlice';
import { authentication } from 'api/auth';
import { useQueryString } from 'hooks';
import paths from 'const/paths';
import { event } from 'api/display';
import SEOHelmet from 'components/shared/SEOHelmet';
import { getPlatform } from 'utils';
import { AxiosError } from 'axios';

const EventList = () => {
    const [eventList, setEventList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getEventList = async () => {
            try {
                const events = await event.getEvents({});
                setEventList(events.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                    return;
                } else if (error instanceof Error) {
                    return;
                } else {
                    alert('알수 없는 에러가 발생했습니다.');
                    return;
                }
            }
        };
        getEventList();
    }, []);

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
                    {eventList.length > 0 &&
                        eventList.map(
                            ({
                                displayPeriodType,
                                endYmdt,
                                eventNo,
                                eventYn,
                                label,
                                mobileImageUrl,
                                pcImageUrl,
                                promotionText,
                                startYmdt,
                                tag,
                                url,
                                urlType,
                            }) => {
                                return (
                                    <div
                                        style={{ marginBottom: '20px' }}
                                        key={eventNo}
                                        onClick={() => {
                                            navigate(
                                                `${paths.EVENT_DETAIL}/${eventNo}`,
                                                {
                                                    state: { eventNo },
                                                },
                                            );
                                        }}
                                    >
                                        <div>
                                            <img
                                                src={
                                                    getPlatform() === 'PC'
                                                        ? pcImageUrl
                                                        : mobileImageUrl
                                                }
                                                alt={label}
                                            />
                                        </div>
                                        <div>
                                            <p>{label}</p>
                                            <p>
                                                {startYmdt} - {endYmdt}
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
