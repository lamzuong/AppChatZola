import React from 'react';
import useWindowSize from './UseWindowSize';
import Confetti from 'react-confetti';

const Wellcome = () => {
    const { width, height } = useWindowSize();
    return <Confetti width={1519} height={700} numberOfPieces={500} recycle={false} />;
};

export default Wellcome;
