import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'src/modules/algocloudhq/overview/overviewSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import settingsSelectors from 'src/modules/settings/settingsSelectors';
import { CHART_TYPES } from 'src/modules/algocloudhq/constants';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TradingViewChart from 'src/view/algocloudhq/components/TradingViewChart';
import PriceStickChart from 'src/view/algocloudhq/components/PriceStickChart';
import { formatPercent, formattedNum } from 'src/modules/algocloudhq/utils';
import { Link } from 'react-router-dom';
import { images } from 'src/images/images';
import {
  FlexContainer,
  ChartWindowWrapper,
} from 'src/view/algocloudhq/styled';
import AssetChart from 'src/view/algocloudhq/components/AssetChart';
import Spinner from 'src/view/shared/Spinner';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, CustomStyles, CustomClasses, ChannelHeaderProps, useChannelStateContext, Avatar } from 'stream-chat-react';
import config from 'src/config';

import 'stream-chat-react/dist/css/index.css';
import '@stream-io/stream-chat-css/dist/css/index.css';

const apiKey = config.STREAM_API_KEY;


function ShowcaseChart() {

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const selectTheme = useSelector(settingsSelectors.selectTheme);
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const loading = useSelector(selectors.selectLoading);
  const showcase = useSelector(selectors.selectShowcase);
  const dailyData = useSelector(selectors.selectDailyData);
  const priceData = useSelector(selectors.selectHourlyPrices);
  let image = showcase['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${showcase['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id === showcase['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  const userToConnect = { id: currentUser.id, name: currentUser.fullName, image: userAvatar };
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey, {
        enableInsights: true,
        enableWSFallback: true,
      });
      const userToken = client.devToken(userToConnect.id);
      // await client.disconnect();
      await client.connectUser(userToConnect, userToken);
      const channel = client.channel('messaging', 'AlgoCloudHQ', {
        image: image,
        name: 'AlgoCloudHQ',
      });
      await channel.watch();
      await channel.addMembers([userToConnect.id]);
      setChatClient(client);
      setChannel(channel);
    };
    setCount(count + 1);
    if (!loading) {
      setTimeout(() => {
        if (count === 2) {
          setCount(0);
          initChat();
        }
      }, 500);
    }

    return () => chatClient?.disconnectUser();
  }, [loading]);

  useEffect(() => {
    console.log('selectTheme: ', selectTheme);
    if (selectTheme === "dark" || selectTheme === null) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [selectTheme]);

  const customStyles: CustomStyles = {
    '--bg-gradient-end': '#ffffff',
    '--bg-gradient-start': '#070a0d',
    '--black': '#ffffff',
    '--blue-alice': '#00193d',
    '--border': '#141924',
    '--button-background': '#ffffff',
    '--button-text': '#005fff',
    '--grey': '#7a7a7a',
    '--grey-gainsboro': '#2d2f2f',
    '--grey-whisper': '#1c1e22',
    '--modal-shadow': '#000000',
    '--overlay': '#00000066',
    '--overlay-dark': '#ffffffcc',
    '--shadow-icon': '#00000080',
    '--targetedMessageBackground': '#302d22',
    '--transparent': 'transparent',
    '--white': '#101418',
    '--white-smoke': '#13151b',
    '--white-snow': '#070a0d',
  };

  const customClasses: CustomClasses = {
    chat: 'custom-chat',
    thread: 'custom-thread',
    // messageList: 'custom-message-list'
  };

  const CustomChannelHeader = (props: ChannelHeaderProps) => {
    const { title } = props;

    const { channel } = useChannelStateContext();
    const { name, image, member_count } = channel.data || {};

    return (
      <div className='d-flex align-items-center channel-header'>
        <Avatar image={image} name={name} shape='rounded' size={35} />
        <div>{title || name} {member_count} online</div>
      </div>
    );
  };

  return (
    <div className='row'>
      <div className="assets-mobile col-lg-8 col-sm-12 ">
        <AssetChart
          color='--var(algoucloud-primary)'
          data={showcase}
          assetData={dailyData}
          priceData={priceData}
        />
      </div>
      <div className="asset-m0 chat-section col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
        <ContentWrapper style={{ flex: 1, maxHeight: 525, padding: 0 }} className="assets-mobile-card card-hover-2 chat-mobile-card">
          {
            loading && <Spinner />
          }
          {
            !loading && chatClient &&
            <Chat client={chatClient}
              customClasses={customClasses}
              customStyles={customStyles}
              theme={`messaging ${theme}`}>
              <Channel channel={channel}>
                <Window>
                  <CustomChannelHeader />
                  <MessageList />
                  <MessageInput />
                  <Thread />
                </Window>
              </Channel>
            </Chat>
          }
        </ContentWrapper>
      </div>
    </div>
  )
}

export default ShowcaseChart;
