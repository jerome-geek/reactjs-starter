import { useEffect, useRef } from 'react';
import { useScript } from 'usehooks-ts';

const KaKaoMap = () => {
    const container = useRef(null);
    const scriptStatus = useScript(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&autoload=false`,
    );

    useEffect(() => {
        if (scriptStatus === 'ready') {
            const kakao = window.kakao;
            kakao.maps.load(() => {
                const mapContainer = container.current;
                const mapOption = {
                    center: new kakao.maps.LatLng(37.4825, 127.0424),
                    level: 1,
                };
                const map = new kakao.maps.Map(mapContainer, mapOption);

                const markerPosition = new kakao.maps.LatLng(
                    37.482631,
                    127.0424,
                );

                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });

                const polygonPath = [
                    new kakao.maps.LatLng(37.482441, 127.0424808),
                    new kakao.maps.LatLng(37.482639, 127.042399),
                    new kakao.maps.LatLng(37.482632, 127.042243),
                    new kakao.maps.LatLng(37.482326, 127.042366),
                ];

                const polygon = new kakao.maps.Polygon({
                    path: polygonPath,
                    strokeWeight: 3,
                    strokeColor: '#E15F42',
                    strokeOpacity: 1,
                    strokeStyle: 'solid',
                    fillColor: '#E15F42',
                    fillOpacity: 0.5,
                });

                kakao.maps.event.addListener(map, 'click', () => {
                    window.open('http://kko.to/bZadVZhX1d');
                });

                marker.setMap(map);
                polygon.setMap(map);
            });
        }
    }, [scriptStatus]);

    return <div ref={container}></div>;
};

export default KaKaoMap;
