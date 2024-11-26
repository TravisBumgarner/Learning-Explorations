import { Reorder } from "framer-motion";
import { useState } from "react";
import "./styles.css";

import { useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

interface Props {
	item: string;
}

export const Item = ({ item }: Props) => {
	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item value={item} id={item} style={{ boxShadow, y }}>
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

export default function DragAndDrop() {
	const [items, setItems] = useState(initialItems);

	return (
		<Reorder.Group
			axis="y"
			onReorder={setItems}
			values={items}
			style={{ maxHeight: 300, overflow: "auto" }}
		>
			{items.map((item) => (
				<Item key={item} item={item} />
			))}
		</Reorder.Group>
	);
}
