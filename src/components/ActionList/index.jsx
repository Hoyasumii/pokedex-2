// React Imports
import { useState, useEffect } from "react";

// CSS Imports
import "./dynamic.css";

// JS Scripts
import mySlug from "../../scripts/mySlug";
import setInput from "../../scripts/form/setInput";

export default function ActionList(array, action) {

    const autoCompleteList = Array.from(array);
    const [ filteredList, setFilteredList ] = useState([]);



    // return (<>H</>);
}