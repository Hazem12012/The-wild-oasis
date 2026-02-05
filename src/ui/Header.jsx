import styled from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" && "font-size:32px; color: var(--color-grey-900);"};
  ${(props) =>
    props.as === "h2" && "font-size:32px; color: var(--color-grey-900);"};
  ${(props) =>
    props.as === "h3" && "font-size:32px; color: var(--color-grey-900);"};

  display: flex;
  align-items: center;
`;
export default Heading;
