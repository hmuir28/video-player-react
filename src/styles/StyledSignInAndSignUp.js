import styled from 'styled-components';

const StyledSigIn = styled.div`
  margin: auto;
  position: absolute;
  top: calc(100% - 65%);
  left: 0;
  bottom: 0;
  right: 0;

  button {
    width: 100%;
  }

  .signin__google-btn {
    background-color: #4285f4;
    border-radius: 2px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
    cursor: pointer;
    display: flex;
    height: 42px;
    margin-top: 10px;
    width: 100%;

    .signin__google-icon-wrapper {
      background-color: #ffffff;
      border-radius: 2px;
      height: 40px;
      margin-left: 1px;
      margin-top: 1px;
      width: 40px;
    }

    .signin__google-icon {
      height: 18px;
      position: absolute;
      margin-top: 11px;
      margin-left: 11px;
      width: 18px;
    }

    .signin__google-btn-text {
      color: #ffffff;
      font-size: 14px;
      letter-spacing: 0.2px;
      margin: 11px 11px 0 0;
      text-align: center;
      width: calc(100% - 60px);
    }

    &:hover {
      box-shadow: 0 0 6px #4285f4;
    }

    &:active {
      background: #1669F2;
    }
  }

  .signin__signup {
    font-size: 12px;
    text-align: center;
  }
`;

export default StyledSigIn;
