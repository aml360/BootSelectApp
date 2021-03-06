export function Sealed(): ClassDecorator {
	return function (constructor: Function) {
		Object.seal(constructor);
		Object.seal(constructor.prototype);
	};
}
