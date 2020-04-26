import styled from "styled-components";

const StyledNightmode = styled.div`
  color: ${props => props.theme.color};
  display: flex;
  font-family: "Hind", sans-serif;
  font-weight: 800;
  font-size: 1.6em;
  margin: 20px;
  padding: 0;
  /* CSS taken from https://www.w3schools.com/howto/howto_css_switch.asp */
  /* The switch - the box around the slider */

  input[type=checkbox]:checked + .lever {
    background-color: #3d5138 !important;
  }

  input[type=checkbox]:checked+.lever:after {
    background-color: #ffffff !important;
  }
`;

export default StyledNightmode;
