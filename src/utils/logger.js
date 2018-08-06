import PrettyError from "pretty-error";
const pe = new PrettyError();

export function logError(error: any) {
  console.log(pe.render(error));
}
