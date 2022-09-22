import styled from 'styled-components';
import { ReactComponent as Cross } from 'assets/icons/cross_gray.svg';
import { Dispatch, SetStateAction } from 'react';

const ImageUploadButton = styled.label`
    display: block;
    width: 96px;
    height: 96px;
    background: ${(props) => props.theme.bg2};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ImageUpload = ({
    setFile,
}: {
    setFile: Dispatch<SetStateAction<Array<Blob | MediaSource | null>>>;
}) => {
    return (
        <>
            <input
                id='imageUpload'
                type={'file'}
                style={{ display: 'none' }}
                accept='image/*'
                multiple={true}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile((prev) => {
                            return [
                                ...prev,
                                e.target.files && e.target.files[0],
                            ];
                        });
                    }
                    // console.log(file);
                }}
            />
            <ImageUploadButton htmlFor='imageUpload'>
                <Cross />
            </ImageUploadButton>
        </>
    );
};

export default ImageUpload;
