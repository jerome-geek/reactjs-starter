import { useLocation } from 'react-router-dom';
import qs from 'qs';

const useQueryString = () => {
    const { search } = useLocation();

    const query = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    return query;
};

export default useQueryString;
