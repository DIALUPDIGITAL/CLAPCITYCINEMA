import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import TwitchStream from '../components/TwitchStream';

export default function NowShowing({ isLive }) {
  useEffect(() => {
    if (!isLive) {
      window.location.href = '/';
    }
  });

  return (
    <Layout theme="dark" nowShowing>
      <NowShowing.Container>
        <NowShowing.Stream>
          <TwitchStream />
        </NowShowing.Stream>
        <NowShowing.Chat>
          <Chat />
        </NowShowing.Chat>
      </NowShowing.Container>
    </Layout>
  );
}

NowShowing.propTypes = {
  isLive: PropTypes.bool,
};

NowShowing.defaultProps = {
  isLive: true,
};

NowShowing.Container = styled.div`
  display: flex;
  padding: 64px;
  height: 600px;
`;

NowShowing.Stream = styled.div`
  flex-grow: 3;
  margin-right: 10px;
`;

NowShowing.Chat = styled.div`
  flex-grow: 1;
`;

NowShowing.getInitialProps = async () => {
  let isStreamLive;

  console.log('reading: ', process.env.CONTENTFUL_ACCESS_TOKEN);

  const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  await client
    .getEntries({
      content_type: 'streamInfo',
    })
    .then((res) => {
      const { isLive } = [...res.items][0].fields;
      isStreamLive = isLive;
    });

  return { isLive: isStreamLive };
};
