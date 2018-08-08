import schedule from "node-schedule";

export async function repeat(task: () => void | Promise<any>) {
  schedule.scheduleJob("0 * * * * *", function() {
    console.log(`Running the task`);
    task();
    console.log(`Task finished. It will repeat every minute.`);
    console.log(`------------`);
  });
}
