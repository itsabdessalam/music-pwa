import styled from "styled-components";

const StyledCard = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;
