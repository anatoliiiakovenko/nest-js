import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function StartsWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `$property must start with "${prefix}"`;
        },
      },
    });
  };

  // return function (target: any, propertyKey: string) {
  //   let val = target[propertyKey];
  //
  //   const getter = () => val;
  //   const setter = (next: string) => {
  //     if (typeof next === 'string' && next.startsWith(value)) {
  //       val = next;
  //     } else {
  //       throw new Error(
  //         `${propertyKey} must start with "${value}". Current value: "${next}"`,
  //       );
  //     }
  //   };
  //
  //   Object.defineProperty(target, propertyKey, {
  //     get: getter,
  //     set: setter,
  //     enumerable: true,
  //     configurable: true,
  //   });
  // };
}
