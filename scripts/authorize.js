import { Octokit, App } from "octokit";

const octokit = new Octokit({
    auth: ProcessingInstruction.env.TOKEN,
});

await octokit.request("GET /octocat", {})
