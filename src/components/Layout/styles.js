import styled from "styled-components";

export const Nav = styled.nav`
  margin-top: 24px;

  a {
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.headerBackgroundColor};

    & + a {
      margin-left: 16px;
    }
  }
`;
