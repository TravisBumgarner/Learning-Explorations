import { Reorder } from "framer-motion";
import { useState } from "react";
import "./styles.css";

interface Props {
	item: string;
	id: number;
}

export const Item = ({ item, id }: Props) => {
	return (
		<Reorder.Item value={id}>
			<span>{item}</span>
		</Reorder.Item>
	);
};

const initialItems = [
	"🍅 Tomato",
	"🥒 Cucumber",
	"🧀 Cheese",
	"🥬 Lettuce",
	"🍞 Bread",
	"🥩 Steak",
	"🍇 Grapes",
	"🍊 Orange",
	"🍏 Apple",
	"🍌 Banana",
];

const STARTING_ARRAY = Array.from({ length: initialItems.length }, (_, i) => i);

export default function DragAndDrop() {
	const [keys, setKeys] = useState(STARTING_ARRAY);

	return (
		<Reorder.Group axis="y" onReorder={setKeys} values={keys}>
			{keys.map((key) => (
				<Item key={key} id={key} item={initialItems[key]} />
			))}
		</Reorder.Group>
	);
}
