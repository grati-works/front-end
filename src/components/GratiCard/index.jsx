import { useState } from 'react';
import { Card, Avatar } from '@nextui-org/react';
import { Delete } from 'react-iconly';
import { Emoji } from 'emoji-mart';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';

export function GratiCard({ content, deleteFunction }) {
    useEffect(() => {
        console.log(content)
    }, [])
    const [reactions, setReactions] = useState({
        mage: 3,
        brain: 7
    });

    function toggleReaction(id) {
        const newReactions = reactions.map(reaction => {
            if (reaction.emoji === id) {
                return {
                    ...reaction,
                    reacted: !reaction.reacted,
                    amount: reaction.reacted ? reaction.amount - 1 : reaction.amount + 1
                }
            }
            return reaction;
        });

        setReactions(newReactions);
    }

    return (
        <Card className={styles.gratiCardContainer} shadow={false}>
            <Card.Header className={styles.gratiCardHeader}>
                <div className={styles.userInfo}>
                    <Avatar.Group count={content.receivers.length > 3 && content.receivers.length - 3}>
                        {content.receivers.slice(0, 3).map(({ user }) => (
                            <Avatar
                                key={user.id}
                                pointer
                                src={user.profile_picture}
                                text={user.name}
                                stacked
                                size="lg"
                            />
                        ))}
                    </Avatar.Group>
                    <div className={styles.texts}>
                        <p className={styles.userInfoText}>
                            {
                                content.receivers.slice(0, 3).map(({ user }, currentIndex) => (<Link href={`/users/${user.id}`}>{`${user.name}${content.receivers[currentIndex + 1] !== undefined ? `, ` : ''}`}</Link>))
                            }
                            {
                                content.receivers.length > 3 && ` + ${content.receivers.length - 3}`
                            }
                            <span>{
                                    content.receivers.length === 1 ? content.receivers[0].responsibility : ''
                                }</span>
                        </p>
                        <p className={styles.gratiInfoText}>
                            foi gratificada por
                            <span>#proatividade</span>
                        </p>
                    </div>
                </div>
                <div className={styles.gratiInfo}>
                    <p>Há 4h por <Link href={`/users/${content.sender.user.id}`}>{content.sender.user.name}</Link></p>
                    <Avatar size="sm" src={content.sender.user.profile_picture} />
                    <Emoji emoji={{ id: content.emoji }} set='twitter' size={24} />
                    <div className={styles.divider}/>
                    <Delete onClick={() => deleteFunction(1)} />
                </div>
            </Card.Header>
            <Card.Body>
                <p>{content.message}</p>
            </Card.Body>
            <Card.Footer className={styles.gratiCardFooter}>
                <div className={styles.reactionsContainer}>
                    {
                        // ${reaction.reacted && styles.reacted}
                        Object.keys(content.reactions).map((reaction, index) => (
                            <span
                                className={`${styles.reaction} `}
                                onClick={() => toggleReaction(reaction)}
                                key={reaction}
                            >
                                <Emoji emoji={{ id: reaction }} set='twitter' size={16} />
                                {Object.values(content.reactions)[index]}
                            </span>
                        ))
                    }
                </div>
            </Card.Footer>
        </Card>
    )
}