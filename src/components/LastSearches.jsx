// React Imports
import PropTypes from 'prop-types';

// Components
import Button from "./Button";
import Icon from "./Icon";
import Card from "./Card";
import Alert from "./Alert";

// JS Scripts
import mySlug from "../scripts/mySlug";
import unslugify from "../scripts/unslugify";
import size from '../scripts/localStorage/size';
import get from '../scripts/localStorage/get';

export default function LastSearches({ onclick }) {
    return (
    <>
        <div className="simple-flex mb-3">
            <h2>Últimas Buscas</h2>
            <Button onclick={ onclick }>
                <Icon name="bi bi-trash" />
            </Button>
        </div>

        {
            size() > 0 ? (
                <div className="simple-list">
                    { get().map((item) => {
                        return (
                            <Card key={ mySlug(item) } name={ unslugify(item) } />
                        )
                    }) }
                </div>
            ) :  (
                <Alert>Ainda não há buscas realizadas</Alert>
            )
        }
        
    </>
    )
}

LastSearches.propTypes = {
    onclick: PropTypes.func.isRequired
}