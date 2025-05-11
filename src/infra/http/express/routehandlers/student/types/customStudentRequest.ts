import type { partialStudent } from "../../../../../../application/students/students";

export interface getStudentExpressRequest {
	body: {
		accessToken: string;
	};
}

export interface editStudentExpressRequest {
	body: {
		newData: partialStudent;
	};
}
