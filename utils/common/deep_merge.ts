// deno-lint-ignore-file no-explicit-any
export function isObject(item: any) {
  return (item && typeof item === "object" && !Array.isArray(item));
}

// export function mergeDeep(
//   target: { [x: string]: any },
//   source: { [x: string]: any },
// ) {
//   const output = Object.assign({}, target);
//   if (isObject(target) && isObject(source)) {
//     Object.keys(source).forEach((key) => {
//       if (isObject(source[key])) {
//         if (!(key in target)) {
//           Object.assign(output, { [key]: source[key] });
//         } else {
//           output[key] = mergeDeep(target[key], source[key]);
//         }
//       } else {
//         Object.assign(output, { [key]: source[key] });
//       }
//     });
//   }
//   return output;
// }

