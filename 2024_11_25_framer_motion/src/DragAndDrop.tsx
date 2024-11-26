import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { RouteWrapper } from "./styles";
import "./styles.css";

interface Props {
	data: { data: string };
	id: string;
}

export const Item = ({ data, id }: Props) => {
	return (
		<Reorder.Item value={id}>
			<span>{data.data}</span>
		</Reorder.Item>
	);
};

const API_RETURN = {
	"1e1d7f4e-1c3b-4c8e-9f1e-1d7f4e1c3b4c": { data: "🍅 Tomato" },
	"2e2d7f4e-2c3b-4c8e-9f1e-2d7f4e2c3b4c": { data: "🥒 Cucumber" },
	"3e3d7f4e-3c3b-4c8e-9f1e-3d7f4e3c3b4c": { data: "🧀 Cheese" },
	"4e4d7f4e-4c3b-4c8e-9f1e-4d7f4e4c3b4c": { data: "🥬 Lettuce" },
	"5e5d7f4e-5c3b-4c8e-9f1e-5d7f4e5c3b4c": { data: "🍞 Bread" },
	"6e6d7f4e-6c3b-4c8e-9f1e-6d7f4e6c3b4c": { data: "🥩 Steak" },
	"7e7d7f4e-7c3b-4c8e-9f1e-7d7f4e7c3b4c": { data: "🍇 Grapes" },
	"8e8d7f4e-8c3b-4c8e-9f1e-8d7f4e8c3b4c": { data: "🍊 Orange" },
	"9e9d7f4e-9c3b-4c8e-9f1e-9d7f4e9c3b4c": { data: "🍏 Apple" },
	"0e0d7f4e-0c3b-4c8e-9f1e-0d7f4e0c3b4c": { data: "🍌 Banana" },
};

export default function DragAndDrop() {
	const [keys, setKeys] = useState<string[]>([]);
	const [data, setData] = useState<Record<string, { data: string }>>({});

	useEffect(() => {
		const keys = Object.keys(API_RETURN);
		setKeys(keys);
		setData(API_RETURN);
	}, []);

	return (
		<RouteWrapper>
			<Reorder.Group axis="y" onReorder={setKeys} values={keys}>
				{keys.map((key) => (
					<Item key={key} id={key} data={data[key]} />
				))}
			</Reorder.Group>
		</RouteWrapper>
	);
}
