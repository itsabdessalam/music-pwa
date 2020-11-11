import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: block;
  margin: 0;
  padding: 10px 16px;
  border: 2px solid rgb(139 156 172 / 40%);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray.dark};
  background-color: #ffffff;
  font-family: inherit;
  outline: 0;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Input = ({ children, ...props }) => {
  return <StyledInput {...props}>{children}</StyledInput>;
};

export default Input;
