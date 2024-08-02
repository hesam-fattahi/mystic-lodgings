import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Colors */
 :root {
  &.dark {
    --color-bg-primary: #18181b; 
    --color-bg-secondary: #27272a; 
    --color-bg-tertiary: #3f3f46; 
    
    --color-text-primary: #fafafa;
    --color-text-secondary: #d4d4d8;
    --color-text-tertiary: #71717a;

    --shadow-sm: 0 1px 2px rgba(255, 255, 255, 0.1);
  --shadow-md: 0 2px 4px rgba(255, 255, 255, 0.15);
  --shadow-lg: 0 4px 8px rgba(255, 255, 255, 0.2);
  }

  &.light {
    --color-bg-primary: #f1f1f2;
    --color-bg-secondary: #fafafa; 
    --color-bg-tertiary: #fff;

    --color-text-primary: #18181b;
    --color-text-secondary: #27272a;
    --color-text-tertiary: #3f3f46;

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  --color-accent-green: #6FD685; 
  --color-accent-red: #F44336; 
  --color-accent-purple: #8382CC; 
  --color-accent-blue: #3b82f6; 
  
  --color-bg-accent-green: #6fd68540;
  --color-bg-accent-red: #f4433640;
  --color-bg-accent-purple: #8382cc40;
  --color-bg-accent-blue: #3b82f640; 
  
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  
  --transition-duration: 0.3s;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color var(--transition-duration), color var(--transition-duration);
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  min-height: 100vh;
  line-height: 1.5;
}

h1,h2,h3,h4,h5,h6 {
  font-weight: 600
}

h1 {
  font-size: clamp(1.375rem, 5vw, 2rem);
}

h2 {
  font-size: clamp(1.125rem, 4vw, 1.75rem);

}

h3 {
  font-size: clamp(1rem, 3.5vw, 1.75rem);

}

h4 {
  font-size: clamp(0.75rem, 3vw, 1.375rem);
}

p {
  font-size: clamp(0.625rem, 2.5vw, 1rem);
}


input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-highlight-purple);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}
`;

export default GlobalStyles;
