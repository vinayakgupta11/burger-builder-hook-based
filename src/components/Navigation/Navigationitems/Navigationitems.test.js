import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navigationitems from './Navigationitems';
import Navigationitem from './Navigationitem/Navigationitem'
configure({adapter:new Adapter()});
describe('Nvaigation',()=>{
    let wrapper;
beforeEach(()=>{
    wrapper= shallow(<Navigationitems/>);
});

it('should render 2 nav, if not auth',()=>{
  // wh have not pass isauth to test for auth==false;
    expect(wrapper.find(Navigationitem)).toHaveLength(2);
});
it('should render 3 nav, if  auth',()=>{
     wrapper.setProps({isAuthenticated:true});
    expect(wrapper.find(Navigationitem)).toHaveLength(3);
});
it('should render logout, if  auth',()=>{
    wrapper.setProps({isAuthenticated:true});
   expect(wrapper.contains(<Navigationitem link="/logout">Logout</Navigationitem>)).toEqual(true);
});
});