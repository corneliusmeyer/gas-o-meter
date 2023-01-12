import React from 'react';

type Props = {
    callback: Function,
}

const SaveButton = (props: Props) => {
    const {callback} = props;
    return (
        <button
            className="bg-gray-500 py-1 px-3 hover:bg-gray-600 w-auto w-fit text-center"
            onClick={() => callback()}
        >Speichern
        </button>
    );
};

export default SaveButton;