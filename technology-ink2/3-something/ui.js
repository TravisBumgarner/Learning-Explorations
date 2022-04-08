'use strict';
const React = require('react');
const { render, Box, Text, useInput, Newline, measureElement } = require('ink');

const H1 = ({ children }) => {
	return <Text bold={true} backgroundColor="green" color="gray" >     {children}     </Text>
}

const NewItemInput = ({ handleNewItem }) => {
	const [newItemText, setNewItemText] = React.useState('')
	useInput((input, key) => {
		if (key.delete) {
			setNewItemText(newItemText.slice(0, newItemText.length - 1))
		} else if (key.return) {
			handleNewItem(newItemText)
		}
		else if (input.length) {
			setNewItemText(newItemText + input)
		}
	})

	return <Text>Enter a new Item: {newItemText}</Text>
}

const MainMenu = () => {
	const [todoItems, setTodoItems] = React.useState([])
	const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(0)
	const [showNewItemInput, setShowNewItemInput] = React.useState(false)

	const handleNewItem = (newItem) => {
		setTodoItems([...todoItems, newItem])
		setShowNewItemInput(false)
	}

	const menuItems = todoItems.length + 1 // Accounting for add new item
	useInput((input, key) => {
		if (key.downArrow && selectedMenuIndex < menuItems - 1) {
			setSelectedMenuIndex(selectedMenuIndex + 1)
		}
		else if (key.upArrow && selectedMenuIndex > 0) {
			setSelectedMenuIndex(selectedMenuIndex - 1)
		}
		else if (key.return && selectedMenuIndex === menuItems - 1) {
			setShowNewItemInput(true)
		}
		else if (key.escape) {
			setShowNewItemInput(false)
		}

	});

	return <Box flexDirection='column' alignItems='left' padding={1} borderColor="green">
		<H1>Welcome to the todo list you never finish!</H1>
		<Newline />
		{
			todoItems.map((item, index) => {
				return <Text key={index} color={selectedMenuIndex === index ? "green" : "white"}>{item}</Text>
			})
		}
		<Text key='additem' color={selectedMenuIndex === todoItems.length ? "green" : "white"}>Add Item</Text>
		{showNewItemInput ? <NewItemInput handleNewItem={handleNewItem} /> : null}
		<Newline />
	</Box >

}

const TodoApp = () => {
	return <MainMenu />
}

module.exports = TodoApp