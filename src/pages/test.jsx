import { GratiCard } from '../components/GratiCard'
import { TextEditor } from '../components/TextEditor'

export default function Test() {
    return (
        <div style={{
            padding: '4rem 32rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <TextEditor />
            <GratiCard />
        </div>
    )
}