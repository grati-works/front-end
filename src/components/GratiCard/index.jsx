import { useState } from 'react';
import { Card, Avatar } from '@nextui-org/react';
import { Delete } from 'react-iconly';
import { Emoji } from 'emoji-mart';
import styles from './styles.module.scss';
import Link from 'next/link';

export function GratiCard({ deleteFunction }) {
    const [reactions, setReactions] = useState([
        {
            emoji: 'brain',
            reacted: true,
            amount: 7
        },
        {
            emoji: 'mage',
            reacted: false,
            amount: 2
        },
    ]);

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
                    <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/10.webp" size="lg" />
                    <div className={styles.texts}>
                        <p className={styles.userInfoText}>
                            Eduarda Camargo
                            <span>(Desenvolvedora Back-end)</span>
                        </p>
                        <p className={styles.gratiInfoText}>
                            foi gratificada por
                            <span>#proatividade</span>
                        </p>
                    </div>
                </div>
                <div className={styles.gratiInfo}>
                    <p>Há 4h por <Link href="#">Túlio N.</Link></p>
                    <Emoji emoji={{ id: 'mage' }} set='twitter' size={24} />
                    <div className={styles.divider}/>
                    <Delete onClick={() => deleteFunction(1)} />
                </div>
            </Card.Header>
            <Card.Body>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit eget aenean ipsum convallis laoreet ultricies. Fermentum, nibh quis in tellus amet arcu egestas massa. Amet et consectetur purus sagittis mauris, nunc est aliquam.</p>
            </Card.Body>
            <Card.Footer className={styles.gratiCardFooter}>
                <div className={styles.reactionsContainer}>
                    {
                        reactions.map(reaction => (
                            <span
                                className={`${styles.reaction} ${reaction.reacted && styles.reacted}`}
                                onClick={() => toggleReaction(reaction.emoji)}
                                key={reaction.emoji}
                            >
                                <Emoji emoji={{ id: reaction.emoji }} set='twitter' size={16} />
                                {reaction.amount}
                            </span>
                        ))
                    }
                </div>
            </Card.Footer>
        </Card>
    )
}