import styled from "styled-components";
import Logo from "./Logo";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;

    li:not(:first-child) {
      margin-left: 12px;
    }
  }
`;

const Navigation = ({ children, ...props }) => {
  return (
    <Nav>
      <Logo width="80px" />
    </Nav>
  );
};

export default Navigation;
