import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';
configure({adapter:new Adapter()});

describe('BurgerBuilder',()=>{
    let wrapper;
beforeEach(()=>{
    wrapper= shallow(<BurgerBuilder onInitIngredient={()=>{}}/>);
});

it('should render buildcontrol when receive ingridients',()=>{
    wrapper.setProps({ings:{salad:0}});
    expect(wrapper.find(BuildControl))
});
});