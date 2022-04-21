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
    background: #fff0;
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

  .pool-custom-chat {
    background: var(--algocloud-card-bg-color);
    height: 100%;
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  @media (max-width: 576px) {
    .custom-chat {
      height: 400px;
    }

    .pool-custom-chat {
      height: 400px;
    }
  }

  @media (min-width: 992px) {
    .custom-chat {
      // height: 650px;
    }

    .pool-custom-chat {
      // height: 600px;
    }
  }

  .channel-header {
      background: hsla(0,0%,100%,.9);
      box-shadow: 0 7px 9px rgb(0 0 0 / 3%), 0 1px 0 rgb(0 0 0 / 3%);
      -webkit-transform: matrix(1,0,0,1,0,0);
      transform: matrix(1,0,0,1,0,0);
      border-radius: 10px 10px 0 0;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      min-height: 60px;
  }

  .str-chat__date-separator-date {
    font-size: 14px;
    font-size: var(--md-font);
    font-weight: 700;
    font-weight: var(--font-weight-bold);
    color: #00000099;
    color: var(--algo-body);
  }

  time.str-chat__message-simple-timestamp {
    color: black;
}

.chat-mobile-card {
  padding: 0px !important;
}

.str-chat__message-actions-list {
  background: var(--button-secondary-bg);
}

  .str-chat__message-simple {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-family: var(--second-font);
    position: relative;
    display: flex;
    font-size: 14px;
    color: #0e1621;
    color: var(--text-high-emphasis);
    padding: 8px;
    background: #fff;
    background: var(--app-canvas);
    transition: background 0s;
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

  .chat-mobile-card {
    padding: 0px;
  }

  .d-flex.align-items-center.channel-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.str-chat__list .str-chat__reverse-infinite-scroll {
  padding-top: 0px;
}

.str-chat__message--me .str-chat__message-text-inner, .str-chat__message-simple--me .str-chat__message-text-inner {
  background: var(--button-secondary-bg);
}

.str-chat__reverse-infinite-scroll {
  max-height: 360px;
}

button.str-chat__send-button {
  display: block;
}

.str-chat-channel.messaging .str-chat__main-panel {
  padding: 0px;
  padding: 0px;
}

  .str-chat__avatar--rounded {
    border-radius: calc(16px / 4);
    border-radius: var(--border-radius-sm);
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;
    margin-left: 20px;
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
