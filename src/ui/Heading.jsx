import styled, { css } from 'styled-components';


// const test1 = 'color :red;'; 
// const test = css`text-align :center;

// ${test1}
// `; 


const Heading = styled.h1`

${props => props.as === "h1"  && 
`font-size:3rem;
font-weight:bold;
color:var(--color-brand-0);
` }

${props => props.as === "h2"  && 
`font-size:2rem;
font-weight:bold;
color:var(--color-brand-0);
` }

${props => props.as === "h3"  && 
`font-size:1rem;
font-weight:500;
color:var(--color-brand-0);
` }

`;
export default Heading;