import React from 'react';

type Props = {
    progress: number;
}

const Progressbar = ({progress}: Props) => {
    console.log(progress);
    return (
        <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2">
            <div className="bg-blue-600 h-2" style={{width: `${progress}%`}} />
        </div>
    );
};

export default Progressbar;