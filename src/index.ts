import prompts from "prompts";
import { readdir } from "fs/promises";

(async () => {
  const { year } = await prompts([
    {
      type: "select",
      name: "year",
      message: "Select year",
      choices: [
        {
          title: "2022",
          value: "2022",
        },
      ],
    },
  ]);

  const dir = (await readdir(`./src/${year}`, { withFileTypes: true })).filter(
    (it) => it.isDirectory()
  );

  const { day } = await prompts([
    {
      type: "select",
      name: "day",
      message: "Select day",
      choices: dir.map((it) => ({ title: it.name, value: it.name })),
    },
  ]);

  const files = (await readdir(`./src/${year}/${day}`))
    .filter((it) => it.endsWith(".ts"))
    .filter((it) => it !== "common.ts");

  const { file } = await prompts([
    {
      type: "select",
      name: "file",
      message: "Select script",
      choices: files.map((it) => ({
        title: it.split(".")[0],
        value: it.replace(".ts", ".js"),
      })),
    },
  ]);

  const func = await import(`../dist/${year}/${day}/${file}`);
  const result = await func.default.default();

  console.log("The result is:", result);
})();
