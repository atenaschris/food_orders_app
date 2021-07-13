import React from 'react';
import mealsImage from '../../assets/asparagus.jpg'
import HeaderCartbutton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = props=>{
    return(
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
               <HeaderCartbutton onClick={props.onShowCartHander}/>
               
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </>
    );
};

export default Header;