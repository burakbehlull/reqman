export {};

declare global {
	namespace ITypes {
	
		export interface FileGroup {
		  fieldName: string;
		  files: File[];
		}

		export interface FormState {
		  json: string;
		  uri: string;
		  method: string;
		  headers: Record<string, string>;
		  queries: Record<string, string>;
		  files: FileGroup[];
		}
	
	}
}