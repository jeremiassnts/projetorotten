import React from 'react'
import '../styles/List.css'

export default function List(props) {
    const { history, elements, arg1, arg2 = null, path, credentials, height = 100 } = props;
    return (
        <div className="elements-container" style={{ height: `${height}vh` }}>
            {elements.map(element =>
                <div className="element-container" key={element.id} onClick={() => history.push(`/${path}/${element.id}`, credentials)}>
                    <footer>
                        <span>{element[arg1]}</span>
                        <span>{arg2 ? element[arg2] : ""}</span>
                    </footer>
                </div>
            )}
        </div>
    )
}
