import schedule from "node-schedule";

export async function repeat(task: () => void | Promise<any>) {
  await task();

  schedule.scheduleJob("0 * * * * *", function() {
    task();
  });
}
