/* eslint-disable react/prop-types */
import styled from 'styled-components';

export const MainDiv = styled.div`
  border: solid 2px;
  width: 95vw;
  height: 60vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
`;

function MainLayout({ children, ...rest }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <MainDiv {...rest}>{children}</MainDiv>;
}

export default MainLayout;
