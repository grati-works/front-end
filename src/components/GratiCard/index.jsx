import { Card, Avatar } from '@nextui-org/react';
import { Delete } from 'react-iconly';
import { Emoji } from 'emoji-mart'
import styles from './styles.module.scss';

export function GratiCard() {
    function handleDeleteGrati() {

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
                    <p>Há 4h por <a href="#">Túlio N.</a></p>
                    <Emoji emoji={{ id: 'mage' }} set='twitter' size={24} />
                    <div className={styles.divider}/>
                    <Delete onClick={handleDeleteGrati} />
                </div>
            </Card.Header>
            <Card.Body>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit eget aenean ipsum convallis laoreet ultricies. Fermentum, nibh quis in tellus amet arcu egestas massa. Amet et consectetur purus sagittis mauris, nunc est aliquam.</p>
            </Card.Body>
            <Card.Footer className={styles.gratiCardFooter}>
                <div className={styles.reactionsContainer}>
                    <span className={`${styles.reaction} ${styles.reacted}`}>
                        <Emoji emoji={{ id: 'brain' }} set='twitter' size={16} />
                        7
                    </span>
                    <span className={styles.reaction}>
                        <Emoji emoji={{ id: 'clap' }} set='twitter' size={16} />
                        2
                    </span>
                </div>
            </Card.Footer>
        </Card>
    )
}