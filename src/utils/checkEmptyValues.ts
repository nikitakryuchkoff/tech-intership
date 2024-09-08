export default function (object: Record<string, FormDataEntryValue>) {
  for (const key in object) {
    if (object[key] === '') delete object[key];
  }

  return object;
}
