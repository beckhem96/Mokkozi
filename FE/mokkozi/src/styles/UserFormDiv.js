/* eslint-disable react/prop-types */
import styled from 'styled-components';

export const FormDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function UserFormDiv({ children, ...rest }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <FormDiv {...rest}>{children}</FormDiv>;
}

export default UserFormDiv;
