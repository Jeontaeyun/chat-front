import React from 'react';
import styles from './index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = () => {
    return(
        <>
            <div classNames={cx('button-icon')}>

            </div>
        </>
    );



};

export default Button;