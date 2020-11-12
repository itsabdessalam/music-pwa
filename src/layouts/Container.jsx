import styled from "styled-components";

const Wrapper = styled.main`
  margin: 0 auto;
  padding: 15px;
  padding-bottom: 65px;
  min-height: calc(100vh - 65px);

  &.full {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding-bottom: 15px;
  }
`;

const Container = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
);

export default Container;
