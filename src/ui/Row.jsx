import styled, { css } from "styled-components";

const Row = styled.div.attrs((props) => ({
  type: props.type || "vertical",
}))`
  display: flex;
  align-items: center;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 6px;
      margin-top: 30px;
    `}
`;

export default Row;
