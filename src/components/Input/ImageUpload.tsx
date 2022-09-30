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
    margin: 10px 0;
`;

const ImageUpload = ({
    onChange,
}: {
    onChange: (uploadedFileList: FileList | null) => void;
}) => {
    return (
        <>
            <input
                id='imageUpload'
                type={'file'}
                style={{ display: 'none' }}
                accept='.bmp, .tif, .tiff, .miff, .gif, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png'
                multiple={true}
                onChange={(e) => onChange(e.target.files)}
            />
            <ImageUploadButton htmlFor='imageUpload'>
                <Cross />
            </ImageUploadButton>
        </>
    );
};

export default ImageUpload;
