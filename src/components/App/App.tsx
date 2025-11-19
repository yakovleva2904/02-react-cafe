import { useState } from 'react';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo.tsx';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import VoteStats from '../VoteStats/VoteStats.tsx';
import Notification from '../Notification/Notification.tsx';

import type { Votes } from '../../types/votes.ts';
import type { VoteType } from '../../types/votes.ts';

export default function App() {
    const initialParams = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    const [votes, setVotes] = useState<Votes>(initialParams);

    const totalVotes = votes.good + votes.neutral + votes.bad;

    const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

    const handleVote = (type: VoteType): void => {
        setVotes({
            ...votes, [type]: votes[type] + 1
        })
    }

    const resetVotes = (): void => {
        setVotes(initialParams)
    };

    return (
        <>
            <div className={css.app}>
                <CafeInfo />
                <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes ? true : false} />
                {totalVotes > 0 ? (<VoteStats
                votes={votes}
                totalVotes={totalVotes}
                positiveRate={positiveRate}
                /> ) : (
                <Notification />
                )}
            </div>;
        </>
        
    )
}

