// type csFData=Record<>
interface FData {
  //1.interface可以循环引用自己，type不可以
  [k: string]: string | number | null | undefined | FData;
}
type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp });
// 2.【| 或运算符】必须有一个属性是互斥的，才有效,比如这里的type
type Rules<T> = Rule<T>[];

export type { Rules, Rule, FData };

// 3.箭头函数加泛型 必须结合extends
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  rules.map((rule) => {
    const { key, type, message } = rule;
    const value = formData[key];
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case 'pattern':
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  });
  return errors;
};

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === '';
}

export function hasError(errors: Record<string, string[]>) {
  let result = false;
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true;
      break;
    }
  }
  return result;
}
