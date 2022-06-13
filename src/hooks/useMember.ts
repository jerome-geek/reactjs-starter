import { useTypedSelector } from 'state/reducers';
import { tokenStorage } from 'utils/storage';
import { authentication } from 'api/auth';

const useMember = () => {
    const { member } = useTypedSelector(({ member }) => ({
        member: member.data,
    }));

    const onLoginClick = () => {};

    const onLogOutClick = async () => {
        try {
            await authentication.deleteAccessToken();
        } catch (error) {
            // TODO: ERROR 처리 필요
        }
        tokenStorage.clear();
        window.location.href = '/';
    };

    return { member, onLoginClick, onLogOutClick };
};

export default useMember;
