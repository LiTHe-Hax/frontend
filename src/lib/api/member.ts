import request from "./request";

function applyForMembership(
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
	return request("members/", "post", data);
}

export { applyForMembership };
