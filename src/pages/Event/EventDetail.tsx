import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { event } from 'api/display';
import SEOHelmet from 'components/shared/SEOHelmet';
import { getPlatform } from 'utils';
import { EventDetailResponse } from 'models/display';
import Loader from 'components/shared/Loader';

const EventDetail = () => {
    const { eventNo } = useParams() as { eventNo: string };
    const [eventDetail, setEventDetail] = useState<EventDetailResponse>();

    const { isLoading } = useQuery<
        AxiosResponse<EventDetailResponse>,
        AxiosError
    >(['eventDetail', eventNo], async () => await event.getEvent(eventNo, {}), {
        onSuccess: (res) => {
            setEventDetail({ ...res.data });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
                return;
            }
            alert('알수 없는 에러가 발생했습니다.');
        },
    });

    return (
        <>
            <SEOHelmet
                data={{
                    title: eventDetail?.label,
                    meta: {
                        title: eventDetail?.label,
                        description: eventDetail?.promotionText,
                        image: eventDetail?.top.pc.url,
                    },
                    og: {
                        title: eventDetail?.label,
                        description: eventDetail?.promotionText,
                        image: eventDetail?.top.mobile.url,
                    },
                }}
            />
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <img
                        src={
                            getPlatform() === 'PC'
                                ? eventDetail?.top.pc.url
                                : eventDetail?.top.mobile.url
                        }
                        alt={eventDetail?.label}
                    />
                    <p>{eventDetail?.section[0].label}</p>
                </div>
            )}
        </>
    );
};

export default EventDetail;
