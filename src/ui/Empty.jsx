import styled from "styled-components";

const StyledEmpty = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 2rem 3.2rem;
  text-align: center;
  background-color: var(--color-grey-0);
`;

function Empty({ resourceName }) {
  return <StyledEmpty>No {resourceName} could be found.</StyledEmpty>;
}

export default Empty;
