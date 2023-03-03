/* eslint-disable react/prop-types */
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function Form({ children, ...rest }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <StyledForm {...rest}>{children}</StyledForm>;
}

export default Form;
