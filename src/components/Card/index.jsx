import module from './.module.css';

// Form Scripts
import setInput from '../../scripts/form/setInput';

export default function Card({ name, setRunning }) {
    return (
        <button className={ module.card } onClick={() => { 
            setInput(name);
            setRunning(true);
        }}>
            <s>{ name }</s>
        </button>
    );
}