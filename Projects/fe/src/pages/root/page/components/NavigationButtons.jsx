import React from 'react'

const NavigationButtons = ({onLeftClicked, onRightClicked}) => {
    return (
        <div className="flex justify-center gap-10 font-semibold text-3xl
        text-black">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onLeftClicked();
                }}
                className="dark:bg-indigo-600 dark:text-slate-300 bg-indigo-300 text-white
                py-1 px-5 rounded-2xl"
            >
                &lt;
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault;
                    onRightClicked();
                }}
                className="dark:bg-indigo-600 dark:text-slate-300 bg-indigo-300 text-white
                py-1 px-5 rounded-2xl"
            >
                &gt;
            </button>
        </div>)
}

export default NavigationButtons