import { API } from "src/constants";

export type Question = {
	pub_date: string
    question_text: string
};

const formatUrl = (parts: string[]) => {
	return `${API}/${parts.join("/")}/`;
};

const postHeaders = () => {
    return new Headers({'content-type': 'application/json'})
}

const getData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    const json = await response.json()
    return json
}

const questions = {
	get: async () => getData<Question[]>(formatUrl(["questions"])),
	post: async () => {
		fetch(formatUrl(["questions"]), {
			method: "post",
            headers: postHeaders(),
			body: JSON.stringify({ pub_date: new Date(), question_text: "hello" }),
		});
	},
};

export default {
	questions,
};
