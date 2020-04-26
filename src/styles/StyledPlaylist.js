import styled from 'styled-components';

const StyledPlaylist = styled.div`
  -web-box-flex: 1;
  -ms-flex: 1;
  flex: 1 1 450px;
  overflow: hidden;
  color: #fff;

  @media screen and (max-width: 1400px) {
    width: 100%;
    display: block;
  }
`;

export default StyledPlaylist;
