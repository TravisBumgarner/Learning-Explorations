const e = React.createElement

const ListItem = props => {
    return e(
        'li',
        { className: 'list-item' },
        props.title
    )
}

const Input = props => {
    return e(
        'input',
        { ...props, style: { color: "red", backgroundColor: "green" } },
        null
    )
}

const Button = props => {
    return e(
        'button',
        props,
        'Submit fruit'
    )
}


const List = props => {
    const [listItems, setListItems] = React.useState(['Apple', 'Banana'])
    const [value, setValue] = React.useState('')

    const handleOnClick = () => {
        setValue('')
        setListItems([...listItems, value])
    }

    const handleOnChange = (event) => {
        setValue(event.target.value)
    }

    return e(
        'div',
        null,
        [
            e(
                'ul',
                null,
                [...listItems.map(i => e(
                    ListItem,
                    { title: i }),
                    null
                ),
                e(
                    Input,
                    { onChange: handleOnChange, type: "text", value }
                ),
                e(
                    Button,
                    { onClick: handleOnClick }
                )
                ]
            )
        ]
    )
}

ReactDOM.render(e(
    List,
    null,
    null
), document.getElementById('app'))