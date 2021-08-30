import { Expand } from './interfaces/type-util';

type Without<T, K extends keyof T> = {
	[P in Exclude<keyof T, K>]: T[P];
};

/**
 *
 * @param obj The object that will be truncated
 * @param keys Array of keys which will be removed of obj.
 * @returns The object without keys in `keys` array param
 *
 * @example
 *
 * ```ts
 *
 * type TestType = {
 * 	prop1: number;
 * 	prop2: number;
 * };
 *
 * const toTransform: TestType = { prop1: 1, prop2: 2 };
 * const transformed = deleteProps(toTransform, ['prop1']);
 * ```
 * @author aml360 <aml360esp@gmail.com>
 *
 */
export function deleteProps<
	T,
	K extends keyof T,
	U extends Expand<Without<T, K>>
>(obj: T, keys: K[]): U {
	keys.forEach((key) => delete obj[key]);
	return obj as unknown as U;
}

export const getKeyValue =
	<T extends object, U extends keyof T>(key: U) =>
	(obj: T) =>
		obj[key];

/**
 *  TODO: Complete
 * @param objToggle objeto a eliminar o añadir
 * @param arrToPushRemove Donde se añade/elimina
 */
export function toggleInArray<T>(objToggle: T, arrToPushRemove: T[]) {
	const indx = arrToPushRemove.indexOf(objToggle);
	indx === -1
		? arrToPushRemove.push(objToggle)
		: arrToPushRemove.splice(indx, 1);
}

// https://is.gd/Suahrg
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
// https://rangle.io/blog/how-to-use-typescript-type-guards/
