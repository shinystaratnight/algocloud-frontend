import styled from 'styled-components';

const Content = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  padding: 24px;
      background-color: var(--white);
      margin-left: auto;
      height: 100%;
      overflow: auto;
      position: relative;
      z-index: 2;
      box-shadow: var(--shadow);
      display: grid;
      align-items: center;
      padding: 40px 80px;
}

@media (min-width: 660px){
.content {
    flex-shrink: 0;
    flex-basis: 50vw;
    max-width: 50%;
    min-width: 660px;
}
}
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
  }

  h4 {
    font-size: 1.25em;
  }

  a,
  a:hover {
    color: white;
  }

  .btn-link,
  .btn-link:hover {
    color: white;
  }

  .invalid-feedback {
    display: block;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Content;
