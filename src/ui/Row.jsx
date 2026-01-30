import styled, { css } from "styled-components";

const Row = styled.div`
  display: "flex";
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-around;
      align-items: center;
    `};
`;

export default Row;
