import module from './.module.css';

export default function Card({ name, setName }) {
    return (
        <button className={ module.card } onClick={() => { alert("Hello World") }}>
            <s>{ name }</s>
        </button>
    );
}