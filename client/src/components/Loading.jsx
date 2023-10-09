import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
    `;

const Loader = styled.div`
    border: 8px solid ${({ theme }) => theme.text};
    border-top: 8px solid red;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;
function Loading() {
  return (
    <Container>
        <Loader></Loader>

    </Container>
  )
}

export default Loading