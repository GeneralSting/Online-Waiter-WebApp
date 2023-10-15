import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: ${({ theme }) => theme.mainContent};
  font-family: 'Poppins', sans-serif;
  font-size: 1.15em;
  margin: 0;
}

th, td, p, h2, h4{
  color: ${({ theme }) => theme.text} !important;
}

.errorText {
  color: ${({ theme }) => theme.textError} !important;
}

p {
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  line-height: 1.5;
}

img {
  max-width: 100%;
}

.alwaysBlack {
  color: black !important;
}
`

export default GlobalStyles;