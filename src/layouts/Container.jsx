import styled from "styled-components";

const Wrapper = styled.main`
  margin: 0 auto;
  padding: 15px;
  padding-bottom: 65px;
  min-height: calc(100vh - 65px);
`;

const Container = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
);

export default Container;
