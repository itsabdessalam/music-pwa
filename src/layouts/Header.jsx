import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

const StyledHeader = styled.header`
  .network {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
    padding: 0 70px;

    .network__status {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
      text-align: center;
    }

    .network__message {
      font-size: 14px;
      text-align: center;
    }
  }
`;

const Header = ({ children, ...props }) => {
  const { isOffline } = useContext(AppContext);
  return (
    <StyledHeader {...props}>
      {isOffline && (
        <div className="network">
          <span className="network__status">No connection</span>
          <span className="network__message">
            Please check your internet connection and try again.
          </span>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
