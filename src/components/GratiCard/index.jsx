import { useState } from 'react';
import { Card, Avatar } from '@nextui-org/react';
import { Delete } from 'react-iconly';
import { Emoji } from 'emoji-mart';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function GratiCard({ content, deleteFunction, reactedMessages }) {
    const [message, setMessage] = useState(content);
    const { user } = useAuth();

    useEffect(() => {
        if(!message) setMessage(content);
    }, []);
    
    function toggleReaction(id) {
        if(message.reactions[id] > 1) {
            setMessage({
                ...message,
                reactions: {
                    ...message.reactions,
                    [id]: message.reactions[id] - 1
                }
            })

            setReactions(reactions.filter(reaction => reaction.emoji !== id))
        } else {
            setMessage({
                ...message,
                reactions: {
                    ...message.reactions,
                    [id]: message.reactions[id] + 1
                }
            })
        }
    }

    return (
        <Card className={styles.gratiCardContainer} shadow={false}>
            <Card.Header className={styles.gratiCardHeader}>
                <div className={styles.userInfo}>
                    <Avatar.Group count={message.receivers.length > 3 && message.receivers.length - 3}>
                        {message.receivers.slice(0, 3).map(({ user }) => (
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
                                message.receivers.slice(0, 3).map(({ user }, currentIndex) => (<Link key={currentIndex} href={`/users/${user.id}`}>{`${user.name}${message.receivers[currentIndex + 1] !== undefined ? `, ` : ''}`}</Link>))
                            }
                            {
                                message.receivers.length > 3 && ` + ${message.receivers.length - 3}`
                            }
                            <span>{
                                    message.receivers.length === 1 ? message.receivers[0].responsibility : ''
                                }</span>
                        </p>
                        <p className={styles.gratiInfoText}>
                            foi gratificada por
                            <span>#proatividade</span>
                        </p>
                    </div>
                </div>
                <div className={styles.gratiInfo}>
                    <p>Há 4h por <Link href={`/users/${message.sender.user.id}`}>{message.sender.user.name}</Link></p>
                    <Avatar size="sm" src={message.sender.user.profile_picture} />
                    <Emoji emoji={{ id: message.emoji }} set='twitter' size={24} />
                    <div className={styles.divider}/>
                    {
                        message.sender.user.id === user?.id &&
                        <Delete onClick={() => deleteFunction(message.id)} />
                    }
                </div>
            </Card.Header>
            <Card.Body>
                <p>{message.message}</p>
            </Card.Body>
            <Card.Footer className={styles.gratiCardFooter}>
                <div className={styles.reactionsContainer}>
                    {
                        // ${reaction.reacted && styles.reacted}
                        Object.keys(message.reactions).map((reaction, index) => (
                            <span
                                className={`${styles.reaction} ${reactedMessages.filter(reacted => reacted.emoji === reaction) ? styles.reacted : ''} `}
                                onClick={() => toggleReaction(reaction)}
                                key={reaction}
                            >
                                <Emoji emoji={{ id: reaction }} set='twitter' size={16} />
                                {Object.values(message.reactions)[index]}
                            </span>
                        ))
                    }
                </div>
            </Card.Footer>
        </Card>
    )
}