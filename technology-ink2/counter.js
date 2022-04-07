'use strict';
const React = require('react');
const { render, Color } = require('ink');


const HelloWorld = () => {
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        setInterval(() => {
            setCounter(prev => prev + 1)
        }, 1000)
    }, [])

    return (
        < Color green >
            We are counting, {counter}!
        </Color >
    )
}


render(<HelloWorld />);
