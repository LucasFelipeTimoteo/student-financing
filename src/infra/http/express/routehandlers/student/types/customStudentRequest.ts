import type { RawStudent } from "../../../../../../application/students/students";

export interface getStudentExpressRequest {
	body: {
		accessToken: string;
	};
}

export interface editStudentExpressRequest {
	body: {
		newData: Omit<RawStudent, "id">;
		accessToken: string;
	};
}
