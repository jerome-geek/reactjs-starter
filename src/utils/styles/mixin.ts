import { css } from 'styled-components';

const ellipsis = (line: number) =>
    line === 1
        ? css`
              width: 100%;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              white-space: nowrap;
          `
        : css`
              width: 100%;
              overflow: hidden;
              position: relative;
              display: -webkit-box;
              -webkit-line-clamp: ${line};
              -webkit-box-orient: vertical;
              word-wrap: break-word;
          `;

export { ellipsis };