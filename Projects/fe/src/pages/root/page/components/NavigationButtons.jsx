import React from 'react'

const NavigationButtons = ({ onLeftClicked, onRightClicked }) => {
    return (
        <div className="flex justify-center gap-[60px] font-semibold text-3xl
        text-black">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onLeftClicked();
                }}
                className="dark:bg-indigo-700 dark:text-slate-300 bg-indigo-300 text-white
                py-0 px-5 rounded-2xl"
            >
                <svg className='fill-slate-300' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M220-240v-480h60v480h-60Zm520 0L394-480l346-240v480Z" /></svg>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault;
                    onRightClicked();
                }}
                className="dark:bg-indigo-700 dark:text-slate-300 bg-indigo-300 text-white
                py-0 px-5 rounded-2xl"
            >

                <svg className='fill-slate-300' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M680-240v-480h60v480h-60Zm-460 0v-480l346 240-346 240Z" /></svg>            </button>
        </div>)
}

export default NavigationButtons