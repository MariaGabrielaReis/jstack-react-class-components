import styled from "styled-components";

export const Container = styled.footer`
  background: ${({ theme }) => theme.footerBackgroundColor};
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-radius: 10px;
  justify-content: space-between;

  position: fixed;
  bottom: 0;
  margin-bottom: 32px;
`;
