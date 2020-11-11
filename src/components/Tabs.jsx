import styled from "styled-components";

const StyledTabs = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
`;

const Tabs = ({ children, ...props }) => {
  return <StyledTabs>{children}</StyledTabs>;
};

export default Tabs;
