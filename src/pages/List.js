import React from 'react'
import '../styles/List.css'

export default function List(props) {
    const { history, elements, arg1, arg2, path, credentials } = props;
    return (
        <div className="elements-container">
            {elements.map(element =>
                <div className="element-container" key={element.id} onClick={() => history.push(`/${path}/${element.id}`, credentials)}>
                    <footer>
                        <span>{element[arg1]}</span>
                        {arg2 ? <span>{element[arg2]}</span> : ""}
                    </footer>
                </div>
            )}
        </div>
    )
}
