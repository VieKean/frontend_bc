import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    <Text>
      <strong>React App</strong> by{' '}
      <Link href="https://www.facebook.com/Kean.G.381/" target="_blank">
        Lê Vĩ Khang
      </Link>
    </Text>
  </Footer>
);

export default AppFooter;
