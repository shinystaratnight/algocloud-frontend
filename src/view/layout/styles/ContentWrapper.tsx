import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 16px;
  padding: 1.25rem;
  background: #1e2d58; 
  background: var(--algocloud-card-bg-color); 
  box-shadow: 0 0 0 1px var(--card-border);
  width: 100%;
  border-radius: 5px;

  .chat-mobile-card card-hover {
    padding: 0;
  }

  .chat-mobile-card.card-hover:hover {
    background: var(--algocloud-card-bg-color);
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  .chat-mobile-card {
    padding: 0;
    height: 100%;
  }

  .custom-chat {
    background: var(--algocloud-card-bg-color);
    height: 100%;
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  @media (min-width: 992px) {
    .custom-chat {
      height: 650px;
    }

    .pool-custom-chat {
      height: 600px;
    }
  }

  .channel-header {
    padding: 10px;
  }

  .custom-thread {
    background: var(--algocloud-card-bg-color);
    flex: 1 0 300px;
    min-width: 300px;
    max-width: 300px;
    overflow-y: hidden;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-family: var(--second-font);
    overflow: hidden;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;
    margin: 6px;
    border-radius: 5px;
    box-shadow: 0 0 0 1px var(--card-border)
  }

  .custom-message-list {
    overflow-x: hidden;
    overflow-y: auto
  }

  .str-chat__thread-header {
    background: var(--algocloud-card-bg-color); 
    box-shadow: 0 0 0 1px var(--card-border)
  }

  .str-chat__thread-start {
    background: var(--algocloud-card-bg-color);
  }

  .str-chat__input-flat {
    background: var(--algocloud-card-bg-color);
  }

  .str-chat__input-flat .str-chat__textarea>textarea {
    // color: var(--algocloud-input-color);
    background-color: var(--algocloud-input-bg);
    box-shadow: 0 0 0 1px var(--card-border)
  }

  .str-chat__input-flat-emojiselect svg {
    fill: var(--algocloud-input-color);
  }
  
  .str-chat__input-flat .rfu-file-upload-button svg {
    fill: var(--algocloud-input-color);
  }

  // .str-chat__message-simple__actions__action svg {
  //   fill: var(--algocloud-card-bg-color);
  // }

  .str-chat__small-message-input textarea {
    background-color: var(--algocloud-input-bg);
  }

  .emoji-mart emoji-mart-light {
    padding: 0;
  }
`;

export default ContentWrapper;
