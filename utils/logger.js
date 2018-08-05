import PrettyError from "pretty-error";
const pe = new PrettyError();

export function logError(error) {
  console.log(pe.render(error));
}
