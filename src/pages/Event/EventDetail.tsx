import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { event } from 'api/display';
import SEOHelmet from 'components/shared/SEOHelmet';
import { getPlatform } from 'utils';
import { EventDetailResponse } from './eventType';
import useAxios from 'hooks/useAxios';
import Loader from 'components/shared/Loader';

const EventDetail = () => {
    const { eventNo } = useParams<{ eventNo: any }>();

    const [eventData, isLoading] = useAxios<EventDetailResponse>(
        eventNo,
        event.getEvent(eventNo, {}),
    );

    return (
        <>
            <SEOHelmet
                data={{
                    title: eventData?.data?.label,
                }}
            />
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <img
                        src={
                            getPlatform() === 'PC'
                                ? eventData?.data?.top.pc.url
                                : eventData?.data?.top.mobile.url
                        }
                        alt={eventData?.data?.label}
                    />
                    <p>{eventData?.data?.section[0].label}</p>
                </div>
            )}
        </>
    );
};

export default EventDetail;
