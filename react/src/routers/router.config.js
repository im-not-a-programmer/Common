import React from 'react'
import Bundle from './bundle'
import _ from 'underscore';
import { openTree } from 'util';

let routers = [
  {
    name: "主页",
    path: '/index/home',
    component: 'home'
  }
];

const initRouter = () => {
  const bundle = [];
  _.each(openTree(routers), item => {
    const components = item.component
    if (!components) return;
    item.props = {};
    item.component = function(props){
      return (
      <Bundle { ...props } load={() => import(`../containers/${components}`)}>
        {Comp => {
          return Comp ? <Comp {...props} { ...item.props } /> : <div>加载中...</div>
        }}
      </Bundle>
      )
    };
    bundle.push(item);
  });
  return bundle;
};
const initRouters = initRouter();
export { 
  initRouters,
  routers 
}