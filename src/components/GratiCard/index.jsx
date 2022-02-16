import { Card, Avatar, Divider } from '@nextui-org/react';
import { Delete, Bag } from 'react-iconly';
import styles from './styles.module.scss';

export function GratiCard() {
    return (
        <Card className={styles.gratiCardContainer} shadow={false}>
            <Card.Header>
                <div className={styles.userInfo}>
                    <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" size="lg" />
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
                    <Bag />
                    <div className={styles.divider} />
                    <Delete />
                </div>
            </Card.Header>
            <Card.Body>
                <p>Body</p>
            </Card.Body>
            <Card.Footer>
                <p>Footer</p>
            </Card.Footer>
        </Card>
    )
}