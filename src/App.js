import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HeaderMenu from './components/HeaderMenu';
import Sort from './components/Sort';
import PathFinding from './components/PathFinding';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const { Header, Content } = Layout;

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Layout style={{height: '100vh'}}>
          <Header>
            <HeaderMenu />
          </Header>
          <Content style={{padding: '50px'}}>
            <div style={{backgroundColor: '#fff'}}>
              <Switch>
                <Route path="/sort" exact component={Sort} />
                <Route path="/path-finding" exact component={PathFinding} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
