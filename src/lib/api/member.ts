import requestApi from "./request";

async function createMember(
	firstName: string,
	lastName: string,
	email: string,
	isStudent: boolean,
) {
	const data = {
		first_name: firstName,
		last_name: lastName,
		email: email,
		is_student: isStudent,
	};
	return await requestApi("members/", "POST", data);
}

export { createMember };
