'use strict';
import React from 'react'
import { Box, Text, useInput, Newline } from 'ink'

const H1 = ({ children }: { children: string }) => {
	return <Text bold={true} backgroundColor="green" color="gray" >     {children}     </Text>
}

const NewItemInput = ({ handleNewItem }: { handleNewItem: (newItemText: string) => void }) => {
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
	const [todoItems, setTodoItems] = React.useState<string[]>([])
	const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(0)
	const [showNewItemInput, setShowNewItemInput] = React.useState(false)

	const isAddItemSelected = selectedMenuIndex === todoItems.length

	const handleNewItem = (newItem: string) => {
		setTodoItems([...todoItems, newItem])
		setShowNewItemInput(false)
	}

	const menuItems = todoItems.length + 1 // Accounting for add new item
	useInput((_input, key) => {
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

	return <Box flexDirection='column' padding={1} borderColor="green">
		<H1>What would you like todo?</H1>
		<Newline />
		{
			todoItems.map((item, index) => {
				return <Text key={index} color={selectedMenuIndex === index ? "green" : "white"}>{item}</Text>
			})
		}
		{isAddItemSelected && <Text> € </Text>}<Text key='additem' color={isAddItemSelected ? "green" : "white"}>Add Item</Text>
		{showNewItemInput ? <NewItemInput handleNewItem={handleNewItem} /> : null}
		<Newline />
	</Box >

}

const TodoApp = () => {
	return <MainMenu />
}

export default TodoApp